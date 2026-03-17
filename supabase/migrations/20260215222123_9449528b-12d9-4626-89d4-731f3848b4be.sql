
ALTER TABLE public.founder_applications
DROP COLUMN IF EXISTS cofounder_names,
ADD COLUMN IF NOT EXISTS cofounder_details jsonb NULL;
