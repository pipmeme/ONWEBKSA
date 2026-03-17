import type { Json } from "@/integrations/supabase/types";

export type ContentLanguage = "en" | "ar" | "ru";

interface ArticleTranslationLike {
  lang: string;
  title: string;
  excerpt: string | null;
  content?: Json | null;
  metadata?: Json | null;
}

interface BaseArticleLike {
  title: string;
  excerpt?: string | null;
  content?: Json | null;
  metadata?: Json | null;
  article_translations?: ArticleTranslationLike[] | null;
}

export function resolveContentLanguage(language?: string): ContentLanguage {
  const normalized = String(language || "en")
    .toLowerCase()
    .split("-")[0];
  return normalized === "ar" || normalized === "ru" ? normalized : "en";
}

export function contentLanguageToLocale(language: ContentLanguage): string {
  if (language === "ar") return "ar-SA";
  if (language === "ru") return "ru-RU";
  return "en-US";
}

function pickTranslation(
  translations: ArticleTranslationLike[] | null | undefined,
  language: ContentLanguage
): ArticleTranslationLike | null {
  if (language === "en") return null;
  if (!translations?.length) return null;
  return translations.find((item) => item.lang === language) || null;
}

export function resolveTranslatedArticleFields(
  article: BaseArticleLike,
  language: ContentLanguage
) {
  const translation = pickTranslation(article.article_translations, language);

  return {
    title: translation?.title ?? article.title,
    excerpt: translation?.excerpt ?? article.excerpt ?? null,
    content: translation?.content ?? article.content ?? null,
    metadata: translation?.metadata ?? article.metadata ?? null,
  };
}

export function toRecord(value: Json | null | undefined): Record<string, any> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, any>;
}
