export function preventTrailingSlashes(url: string): string {
  url.endsWith('/') && (url = url.slice(0, -1));
  return url.toString();
}