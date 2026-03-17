import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const SUPPORTED_LANGS = new Set(["ar", "ru"]);

function parseArg(name) {
  const prefixed = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefixed));
  if (hit) return hit.slice(prefixed.length);
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0) return process.argv[index + 1];
  return undefined;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function parseEnvValue(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return "";
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    const value = parseEnvValue(match[2]);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv() {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.publish"));
  loadEnvFile(path.join(cwd, ".env.local"));
  loadEnvFile(path.join(cwd, ".env"));
}

function fail(message) {
  console.error(`\nError: ${message}`);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeContent(content, fallback = []) {
  const input = Array.isArray(content) ? content : fallback;
  return input.map((section) => {
    const heading =
      typeof section?.heading === "string" && section.heading.trim()
        ? section.heading.trim()
        : null;
    const pullQuote =
      typeof section?.pullQuote === "string" && section.pullQuote.trim()
        ? section.pullQuote.trim()
        : null;
    const paragraphs = Array.isArray(section?.paragraphs)
      ? section.paragraphs.filter((p) => typeof p === "string" && p.trim()).map((p) => p.trim())
      : [];

    return {
      ...(heading ? { heading } : {}),
      ...(pullQuote ? { pullQuote } : {}),
      paragraphs,
    };
  });
}

function normalizeMetadata(value, fallback = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
    return fallback;
  }
  return {};
}

function extractTextContent(messageContent) {
  if (typeof messageContent === "string") return messageContent;
  if (Array.isArray(messageContent)) {
    return messageContent
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && typeof item.text === "string") return item.text;
        return "";
      })
      .join("\n")
      .trim();
  }
  return "";
}

function extractJsonPayload(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return null;

  const withoutFence = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(withoutFence);
  } catch {
    const firstBrace = withoutFence.indexOf("{");
    const lastBrace = withoutFence.lastIndexOf("}");
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      try {
        return JSON.parse(withoutFence.slice(firstBrace, lastBrace + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function translateWithLlm(payload, langCode, options) {
  const { apiKey, model, endpoint } = options;
  const languageName = langCode === "ar" ? "Arabic" : "Russian";
  let lastError = null;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          messages: [
            {
              role: "system",
              content: `Translate English business content into ${languageName}. Preserve JSON structure, keys, arrays, URLs, and numbers. Translate all user-facing text, including string values inside metadata. Keep personal and company names in original form. Return only valid JSON.`,
            },
            {
              role: "user",
              content: JSON.stringify(payload),
            },
          ],
        }),
        signal: AbortSignal.timeout(180000),
      });

      const raw = await response.text();
      if (!response.ok) {
        throw new Error(`Translation API failed (${response.status}): ${raw}`);
      }

      const completion = JSON.parse(raw);
      const content = extractTextContent(completion.choices?.[0]?.message?.content);
      if (!content) {
        throw new Error("Translation API returned an empty response.");
      }

      const translated = extractJsonPayload(content);
      if (!translated || typeof translated !== "object" || Array.isArray(translated)) {
        throw new Error("Translation API response was not valid JSON.");
      }

      return {
        title: typeof translated.title === "string" && translated.title.trim()
          ? translated.title.trim()
          : payload.title,
        excerpt:
          typeof translated.excerpt === "string" || translated.excerpt === null
            ? translated.excerpt
            : payload.excerpt,
        content: normalizeContent(translated.content, payload.content),
        metadata: normalizeMetadata(translated.metadata, payload.metadata),
      };
    } catch (error) {
      lastError = error;
      if (attempt < 4) {
        await sleep(1200 * attempt);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Translation API failed after retries.");
}

loadLocalEnv();

const langs = (parseArg("langs") || "ar,ru")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
if (!langs.length) fail("No target languages provided.");
for (const lang of langs) {
  if (!SUPPORTED_LANGS.has(lang)) {
    fail(`Unsupported language "${lang}". Allowed: ar, ru`);
  }
}

const force = hasFlag("force");
const publicOnly = hasFlag("public-only");

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const providerFromEnv = (process.env.TRANSLATION_PROVIDER || "").toLowerCase();
const translationProvider = providerFromEnv || (process.env.DEEPSEEK_API_KEY ? "deepseek" : "openai");
if (!new Set(["openai", "deepseek"]).has(translationProvider)) {
  fail('TRANSLATION_PROVIDER must be "openai" or "deepseek".');
}
const translationApiKey =
  translationProvider === "deepseek"
    ? process.env.DEEPSEEK_API_KEY
    : process.env.OPENAI_API_KEY;
const translationModel =
  process.env.TRANSLATION_MODEL ||
  process.env.OPENAI_MODEL ||
  (translationProvider === "deepseek" ? "deepseek-chat" : "gpt-4o-mini");
const translationEndpoint =
  process.env.TRANSLATION_API_URL ||
  (translationProvider === "deepseek"
    ? "https://api.deepseek.com/chat/completions"
    : "https://api.openai.com/v1/chat/completions");

if (!supabaseUrl) fail("SUPABASE_URL (or VITE_SUPABASE_URL) is required.");
if (!serviceRoleKey) fail("SUPABASE_SERVICE_ROLE_KEY is required.");
if (!translationApiKey) fail("DEEPSEEK_API_KEY or OPENAI_API_KEY is required.");

const supabase = createClient(supabaseUrl, serviceRoleKey);

let query = supabase
  .from("articles")
  .select("id, slug, title, excerpt, content, metadata, status, created_at")
  .order("created_at", { ascending: true });

if (publicOnly) query = query.eq("status", "public");

const { data: articles, error: fetchError } = await query;
if (fetchError) fail(fetchError.message);
if (!articles?.length) {
  console.log("No articles found for translation.");
  process.exit(0);
}

const articleIds = articles.map((a) => a.id);
const { data: existingRows, error: existingError } = await supabase
  .from("article_translations")
  .select("article_id, lang")
  .in("article_id", articleIds)
  .in("lang", langs);
if (existingError) fail(existingError.message);

const existing = new Set((existingRows || []).map((row) => `${row.article_id}:${row.lang}`));

console.log(
  `Translating ${articles.length} article(s) to ${langs.join(", ")} via ${translationProvider} (${translationModel}).`
);

let done = 0;
let skipped = 0;
let failed = 0;
const failedItems = [];

for (const article of articles) {
  const basePayload = {
    title: article.title,
    excerpt: article.excerpt ?? null,
    content: normalizeContent(article.content, []),
    metadata: normalizeMetadata(article.metadata, {}),
  };

  for (const lang of langs) {
    const key = `${article.id}:${lang}`;
    if (!force && existing.has(key)) {
      skipped += 1;
      continue;
    }

    try {
      const translated = await translateWithLlm(basePayload, lang, {
        provider: translationProvider,
        apiKey: translationApiKey,
        model: translationModel,
        endpoint: translationEndpoint,
      });

      const { error: upsertError } = await supabase
        .from("article_translations")
        .upsert(
          {
            article_id: article.id,
            lang,
            title: translated.title,
            excerpt: translated.excerpt,
            content: translated.content,
            metadata: translated.metadata,
          },
          { onConflict: "article_id,lang" }
        );

      if (upsertError) throw new Error(upsertError.message);
      done += 1;
      console.log(`[${done}] ${article.slug} -> ${lang}`);
    } catch (error) {
      failed += 1;
      failedItems.push(`${article.slug}:${lang}`);
      console.error(`Failed ${article.slug} -> ${lang}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

console.log(`\nBackfill completed. Translations upserted: ${done}, skipped existing: ${skipped}, failed: ${failed}.`);
if (failedItems.length) {
  console.log(`Failed items: ${failedItems.join(", ")}`);
  process.exit(1);
}
