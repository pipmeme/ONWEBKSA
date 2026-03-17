import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const ARTICLE_TYPES = new Set(["founder_story", "insight", "rising_founder"]);
const ARTICLE_STATUS = new Set(["public", "private", "draft"]);
const SUPPORTED_LANGUAGES = ["en", "ar", "ru"];
const AUTO_TRANSLATE_LANGUAGES = ["ar", "ru"];

const TRANSLATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    excerpt: { type: ["string", "null"] },
    content: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          heading: { type: ["string", "null"] },
          pullQuote: { type: ["string", "null"] },
          paragraphs: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["paragraphs"],
      },
    },
    metadata: {
      type: "object",
      additionalProperties: true,
    },
  },
  required: ["title", "excerpt", "content", "metadata"],
};

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

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fail(message) {
  console.error(`\nError: ${message}`);
  process.exit(1);
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

function normalizeTranslationInput(input, fallback) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const hasManualFields = Boolean(
    (typeof input.title === "string" && input.title.trim()) ||
      (typeof input.excerpt === "string" && input.excerpt.trim()) ||
      (Array.isArray(input.content) && input.content.length > 0) ||
      (input.metadata &&
        typeof input.metadata === "object" &&
        !Array.isArray(input.metadata) &&
        Object.keys(input.metadata).length > 0)
  );

  if (!hasManualFields) return null;

  return {
    title: typeof input.title === "string" && input.title.trim() ? input.title.trim() : fallback.title,
    excerpt:
      typeof input.excerpt === "string"
        ? input.excerpt.trim()
        : fallback.excerpt,
    content: normalizeContent(input.content, fallback.content),
    metadata: normalizeMetadata(input.metadata, fallback.metadata),
  };
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
  const { apiKey, model, endpoint, provider } = options;
  const languageName = langCode === "ar" ? "Arabic" : "Russian";
  const requestBody = {
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
  };

  if (provider === "openai") {
    requestBody.response_format = {
      type: "json_schema",
      json_schema: {
        name: "article_translation",
        strict: true,
        schema: TRANSLATION_SCHEMA,
      },
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const raw = await response.text();
  if (!response.ok) {
    fail(`Translation API failed (${response.status}): ${raw}`);
  }

  let completion;
  try {
    completion = JSON.parse(raw);
  } catch {
    fail("Failed to parse translation API response.");
  }

  const content = extractTextContent(completion.choices?.[0]?.message?.content);
  if (!content) {
    fail("Translation API returned an empty response.");
  }

  const translated = extractJsonPayload(content);
  if (!translated || typeof translated !== "object" || Array.isArray(translated)) {
    fail("Translation API response was not valid JSON.");
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
}

const fileArg = parseArg("file");
loadLocalEnv();

const resolvedFileArg = fileArg || process.env.ARTICLE_FILE || "scripts/article.template.json";
const fullPath = path.isAbsolute(resolvedFileArg)
  ? resolvedFileArg
  : path.join(process.cwd(), resolvedFileArg);
if (!fs.existsSync(fullPath)) {
  fail(`File not found: ${fullPath}. Use --file <path> if needed.`);
}

let source;
try {
  source = JSON.parse(fs.readFileSync(fullPath, "utf8"));
} catch {
  fail("Invalid JSON file.");
}

const title = source.title?.trim();
if (!title) fail("Article JSON must include a non-empty title.");

const type = source.type || "insight";
if (!ARTICLE_TYPES.has(type)) {
  fail(`Invalid article type "${type}". Allowed: ${Array.from(ARTICLE_TYPES).join(", ")}`);
}

const status = source.status || "draft";
if (!ARTICLE_STATUS.has(status)) {
  fail(`Invalid status "${status}". Allowed: ${Array.from(ARTICLE_STATUS).join(", ")}`);
}

const payload = {
  title,
  slug: source.slug?.trim() || slugify(title),
  type,
  category: source.category?.trim() || null,
  country: source.country?.trim() || null,
  status,
  excerpt: source.excerpt?.trim() || null,
  content: normalizeContent(source.content, []),
  metadata: normalizeMetadata(source.metadata, {}),
};

if (!payload.slug) fail("Unable to generate slug. Please set slug manually in JSON.");

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
const disableAutoTranslate = hasFlag("no-auto-translate");
const fileAutoTranslate = source.autoTranslate !== false;
const shouldAutoTranslate = !disableAutoTranslate && fileAutoTranslate;
const fileTranslations =
  source.translations && typeof source.translations === "object" && !Array.isArray(source.translations)
    ? source.translations
    : {};

if (!supabaseUrl) fail("SUPABASE_URL (or VITE_SUPABASE_URL) is required in environment.");
if (!serviceRoleKey) fail("SUPABASE_SERVICE_ROLE_KEY is required in environment.");
if (shouldAutoTranslate && !translationApiKey) {
  fail("Set DEEPSEEK_API_KEY or OPENAI_API_KEY for automatic Arabic/Russian translation, or use --no-auto-translate with manual translations.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const { data: article, error: articleError } = await supabase
  .from("articles")
  .upsert(payload, { onConflict: "slug" })
  .select("id, slug, type, status, title")
  .single();

if (articleError || !article) {
  fail(articleError?.message || "Failed to upsert article.");
}

const translationRows = [
  {
    article_id: article.id,
    lang: "en",
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
    metadata: payload.metadata,
  },
];

for (const lang of AUTO_TRANSLATE_LANGUAGES) {
  const manual = normalizeTranslationInput(fileTranslations[lang], payload);
  if (manual) {
    translationRows.push({
      article_id: article.id,
      lang,
      ...manual,
    });
    continue;
  }

  if (!shouldAutoTranslate) {
    fail(
      `Missing translation for "${lang}". Add source.translations.${lang} in JSON or enable auto-translation.`
    );
  }

  const translated = await translateWithLlm(payload, lang, {
    provider: translationProvider,
    apiKey: translationApiKey,
    model: translationModel,
    endpoint: translationEndpoint,
  });
  translationRows.push({
    article_id: article.id,
    lang,
    ...translated,
  });
}

const { data: translationData, error: translationError } = await supabase
  .from("article_translations")
  .upsert(translationRows, { onConflict: "article_id,lang" })
  .select("lang, title");

if (translationError) {
  fail(translationError.message);
}

const savedLanguages = new Set((translationData || []).map((row) => row.lang));
for (const lang of SUPPORTED_LANGUAGES) {
  if (!savedLanguages.has(lang)) {
    fail(`Missing saved translation row for language "${lang}".`);
  }
}

console.log("\nArticle published successfully.");
if (shouldAutoTranslate) {
  console.log(`Translation provider: ${translationProvider} (${translationModel})`);
}
console.log(JSON.stringify(article, null, 2));
console.log("\nSaved translations:");
console.log(
  JSON.stringify(
    (translationData || []).map((row) => ({ lang: row.lang, title: row.title })),
    null,
    2
  )
);
