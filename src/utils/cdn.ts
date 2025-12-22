export function getAssetUrl(path: string): string {
  const cdnUrl = import.meta.env.PUBLIC_CDN_URL;
  // if (cdnUrl && path.startsWith('/')) {
  //   const cleanCdnUrl = cdnUrl.replace(/\/$/, '');
  //   return `${cleanCdnUrl}${path}`;
  // }
  return path;
}
