const SOCIAL_BOT_REGEX =
  /whatsapp|telegram|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|googlebot|bingbot/i;

const OG_PROXY =
  "https://wrktxzjwptfvfikxshqi.supabase.co/functions/v1/og-share";

export const config = {
  matcher: ["/stories/:path*", "/insights/:path*"],
};

export default async function middleware(
  request: Request
): Promise<Response | undefined> {
  const ua = request.headers.get("user-agent") || "";
  if (SOCIAL_BOT_REGEX.test(ua)) {
    const url = new URL(request.url);
    const proxyUrl = `${OG_PROXY}?path=${encodeURIComponent(url.pathname)}`;
    try {
      const res = await fetch(proxyUrl);
      const html = await res.text();
      return new Response(html, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    } catch {
      // fall through to normal SPA serving
    }
  }
  return undefined;
}
