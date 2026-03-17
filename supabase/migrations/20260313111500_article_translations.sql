-- Store per-language article content for fast multilingual reads.
CREATE TABLE IF NOT EXISTS public.article_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  lang TEXT NOT NULL CHECK (lang IN ('en', 'ar', 'ru')),
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (article_id, lang)
);

CREATE INDEX IF NOT EXISTS idx_article_translations_article_lang
  ON public.article_translations(article_id, lang);

CREATE INDEX IF NOT EXISTS idx_article_translations_lang
  ON public.article_translations(lang);

ALTER TABLE public.article_translations ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS update_article_translations_updated_at
  ON public.article_translations;

CREATE TRIGGER update_article_translations_updated_at
  BEFORE UPDATE ON public.article_translations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'article_translations'
      AND policyname = 'Public can read article translations'
  ) THEN
    CREATE POLICY "Public can read article translations"
      ON public.article_translations
      FOR SELECT
      TO public
      USING (
        EXISTS (
          SELECT 1
          FROM public.articles a
          WHERE a.id = article_id
            AND (
              a.status = 'public'::public.article_status
              OR public.is_admin(auth.uid())
            )
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'article_translations'
      AND policyname = 'Admins can insert article translations'
  ) THEN
    CREATE POLICY "Admins can insert article translations"
      ON public.article_translations
      FOR INSERT
      TO authenticated
      WITH CHECK (public.is_admin(auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'article_translations'
      AND policyname = 'Admins can update article translations'
  ) THEN
    CREATE POLICY "Admins can update article translations"
      ON public.article_translations
      FOR UPDATE
      TO authenticated
      USING (public.is_admin(auth.uid()))
      WITH CHECK (public.is_admin(auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'article_translations'
      AND policyname = 'Admins can delete article translations'
  ) THEN
    CREATE POLICY "Admins can delete article translations"
      ON public.article_translations
      FOR DELETE
      TO authenticated
      USING (public.is_admin(auth.uid()));
  END IF;
END;
$$;

-- Seed english records for existing articles.
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
