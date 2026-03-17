-- Ensure every article has an English translation row.
INSERT INTO public.article_translations (article_id, lang, title, excerpt, content, metadata)
SELECT
  a.id,
  'en',
  a.title,
  a.excerpt,
  a.content,
  COALESCE(a.metadata, '{}'::jsonb)
FROM public.articles a
ON CONFLICT (article_id, lang) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  metadata = EXCLUDED.metadata,
  updated_at = now();

