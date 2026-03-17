## One-Time Setup

Use project-local CLI via `npx` (do not install `supabase` globally with `npm i -g`).

1. Login to Supabase CLI once:
```bash
npx supabase login
```

2. Open `.env.publish` and set `SUPABASE_SERVICE_ROLE_KEY` once.
3. Keep the rest of values in `.env.publish` as your defaults (project ref, DeepSeek, URLs).

## Deploy Database + Functions

```bash
npm run supabase:deploy
```

No need to pass project ref every time if it is in `.env.publish`.

This will:
- link to your Supabase project
- push all migrations
- deploy all edge functions in `supabase/functions`

## Publish/Update an Article with EN/AR/RU

1. Copy and edit `scripts/article.template.json`.
2. Run:
```bash
npm run article:publish
```

What happens:
- Upserts base article in `articles` by `slug`.
- Writes English row in `article_translations`.
- Auto-generates Arabic + Russian translations and upserts them in `article_translations`.

Notes:
- If `DEEPSEEK_API_KEY` is present, the script defaults to DeepSeek.
- You can still use OpenAI by setting `OPENAI_API_KEY` and `TRANSLATION_PROVIDER=openai`.
- You can override endpoint with `TRANSLATION_API_URL`.
- You can still pass another file with `--file your-file.json`.

## Manual Translations (no auto-translate)

If you want to provide Arabic/Russian text yourself, add this shape inside your JSON:

```json
{
  "translations": {
    "ar": {
      "title": "...",
      "excerpt": "...",
      "content": [],
      "metadata": {}
    },
    "ru": {
      "title": "...",
      "excerpt": "...",
      "content": [],
      "metadata": {}
    }
  }
}
```

Then run:
```bash
npm run article:publish -- --file your-file.json --no-auto-translate
```

## Backfill Existing Articles to AR/RU

If old articles already exist and you want Arabic/Russian rows generated:

```bash
npm run article:translate-existing
```

Optional flags:
- `--langs=ar,ru` (default)
- `--public-only`
- `--force` (retranslate even if already present)
