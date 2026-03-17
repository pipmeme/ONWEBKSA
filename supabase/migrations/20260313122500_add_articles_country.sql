-- Compatibility for legacy export import: older datasets include articles.country.
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Saudi Arabia';

