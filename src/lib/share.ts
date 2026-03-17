const SITE_URL = "https://foundersksa.com";

export function getShareUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
