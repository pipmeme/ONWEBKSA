import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: articles, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    let sql = `-- ══════════════════════════════════════\n`;
    sql += `-- Founders KSA — Articles Data Export\n`;
    sql += `-- Generated: ${new Date().toISOString()}\n`;
    sql += `-- Total articles: ${articles.length}\n`;
    sql += `-- ══════════════════════════════════════\n\n`;

    for (const a of articles) {
      sql += `INSERT INTO public.articles (id, title, slug, type, status, category, excerpt, content, metadata, country, created_at, updated_at)\nVALUES (\n`;
      sql += `  '${a.id}',\n`;
      sql += `  '${escapeSQL(a.title)}',\n`;
      sql += `  '${escapeSQL(a.slug)}',\n`;
      sql += `  '${a.type}',\n`;
      sql += `  '${a.status}',\n`;
      sql += `  ${a.category ? `'${escapeSQL(a.category)}'` : "NULL"},\n`;
      sql += `  ${a.excerpt ? `'${escapeSQL(a.excerpt)}'` : "NULL"},\n`;
      sql += `  '${escapeSQL(JSON.stringify(a.content))}'::jsonb,\n`;
      sql += `  '${escapeSQL(JSON.stringify(a.metadata))}'::jsonb,\n`;
      sql += `  ${a.country ? `'${escapeSQL(a.country)}'` : "NULL"},\n`;
      sql += `  '${a.created_at}',\n`;
      sql += `  '${a.updated_at}'\n`;
      sql += `) ON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  title = EXCLUDED.title,\n`;
      sql += `  slug = EXCLUDED.slug,\n`;
      sql += `  type = EXCLUDED.type,\n`;
      sql += `  status = EXCLUDED.status,\n`;
      sql += `  category = EXCLUDED.category,\n`;
      sql += `  excerpt = EXCLUDED.excerpt,\n`;
      sql += `  content = EXCLUDED.content,\n`;
      sql += `  metadata = EXCLUDED.metadata,\n`;
      sql += `  country = EXCLUDED.country,\n`;
      sql += `  updated_at = EXCLUDED.updated_at;\n\n`;
    }

    return new Response(sql, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": "attachment; filename=founders-ksa-articles.sql",
      },
    });
  } catch (e) {
    console.error("export error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
