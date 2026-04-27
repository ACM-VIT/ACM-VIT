export function getAssetUrl(path: string | null | undefined): string {
  if (typeof path !== "string" || path.length === 0) {
    return "";
  }

  const cdnUrl = import.meta.env.PUBLIC_CDN_URL;
  if (cdnUrl && path.startsWith("/")) {
    const cleanCdnUrl = cdnUrl.replace(/\/$/, "");
    return `${cleanCdnUrl}${path}`;
  }
  return path;
}
