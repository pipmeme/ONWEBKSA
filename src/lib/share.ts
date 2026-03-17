const SITE_URL = "https://foundersksa.com";
const OG_PROXY = "https://wrktxzjwptfvfikxshqi.supabase.co/functions/v1/og-share";

// Dynamic pages — proxy through Supabase so WhatsApp/Telegram see the correct
// story title & description. Real users are redirected instantly via meta-refresh.
const DYNAMIC_ROUTES = [/^\/stories\//, /^\/insights\//];

/**
 * Returns a shareable URL.
 * - Story/insight pages: Supabase OG proxy (correct preview + instant redirect to real page).
 * - All other pages: direct foundersksa.com URL.
 */
export function getShareUrl(path: string): string {
  if (DYNAMIC_ROUTES.some((re) => re.test(path))) {
    return `${OG_PROXY}?path=${encodeURIComponent(path)}`;
  }
  return `${SITE_URL}${path}`;
}
