export function getAssetUrl(path: string): string {
  const cdnUrl = import.meta.env.PUBLIC_CDN_URL;
  if (cdnUrl && path.startsWith('/')) {
    // Remove leading slash to avoid double slashes if cdnUrl has trailing slash
    // But usually cdnUrl shouldn't have trailing slash. Let's handle both.
    const cleanCdnUrl = cdnUrl.replace(/\/$/, '');
    return `${cleanCdnUrl}${path}`;
  }
  return path;
}
