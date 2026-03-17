-- Seed Arabic and Russian placeholder translation rows from English content.
-- These rows ensure articles always render content when Arabic or Russian is
-- selected.  Run the backfill script (scripts/backfill-article-translations.mjs)
-- with a valid OPENAI_API_KEY or DEEPSEEK_API_KEY to replace these placeholders
-- with properly translated text.

INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
SELECT
  at_en.article_id,
  'ar',
  at_en.title,
  at_en.excerpt,
  at_en.content,
  COALESCE(at_en.metadata, '{}'::jsonb)
FROM public.article_translations at_en
WHERE at_en.lang = 'en'
ON CONFLICT (article_id, lang) DO NOTHING;

INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
SELECT
  at_en.article_id,
  'ru',
  at_en.title,
  at_en.excerpt,
  at_en.content,
  COALESCE(at_en.metadata, '{}'::jsonb)
FROM public.article_translations at_en
WHERE at_en.lang = 'en'
ON CONFLICT (article_id, lang) DO NOTHING;

-- Trigger 1: When a new English translation row is inserted, auto-create ar/ru placeholders.
-- This fires when the article-sync trigger below creates an English row.
CREATE OR REPLACE FUNCTION public.propagate_translation_placeholders()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.lang = 'en' THEN
    INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
    VALUES (NEW.article_id, 'ar', NEW.title, NEW.excerpt, NEW.content, COALESCE(NEW.metadata, '{}'::jsonb))
    ON CONFLICT (article_id, lang) DO NOTHING;

    INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
    VALUES (NEW.article_id, 'ru', NEW.title, NEW.excerpt, NEW.content, COALESCE(NEW.metadata, '{}'::jsonb))
    ON CONFLICT (article_id, lang) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_propagate_translation_placeholders ON public.article_translations;

CREATE TRIGGER trg_propagate_translation_placeholders
  AFTER INSERT ON public.article_translations
  FOR EACH ROW
  EXECUTE FUNCTION public.propagate_translation_placeholders();

-- Trigger 2: When an article is inserted/updated via the admin panel, sync the English
-- translation row so all three language rows stay up to date automatically.
CREATE OR REPLACE FUNCTION public.sync_en_translation_on_article_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
  VALUES (
    NEW.id,
    'en',
    NEW.title,
    NEW.excerpt,
    NEW.content,
    COALESCE(NEW.metadata, '{}'::jsonb)
  )
  ON CONFLICT (article_id, lang) DO UPDATE SET
    title    = EXCLUDED.title,
    excerpt  = EXCLUDED.excerpt,
    content  = EXCLUDED.content,
    metadata = EXCLUDED.metadata,
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_en_translation ON public.articles;

CREATE TRIGGER trg_sync_en_translation
  AFTER INSERT OR UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_en_translation_on_article_change();
