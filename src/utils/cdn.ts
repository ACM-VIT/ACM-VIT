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

// Heavy media (audio + video) is offloaded to a dedicated CDN bucket (R2).
// When PUBLIC_MEDIA_CDN_URL is unset, paths resolve locally and are served
// straight from the origin, so behaviour is unchanged in dev / previews.
export function getMediaUrl(path: string | null | undefined): string {
  if (typeof path !== "string" || path.length === 0) {
    return "";
  }

  const mediaUrl = import.meta.env.PUBLIC_MEDIA_CDN_URL;
  if (mediaUrl && path.startsWith("/")) {
    const cleanMediaUrl = mediaUrl.replace(/\/$/, "");
    return `${cleanMediaUrl}${path}`;
  }
  return path;
}

// Team/board photos are offloaded to a dedicated CDN bucket (R2), same
// pattern as getMediaUrl(). When PUBLIC_IMAGE_CDN_URL is unset, paths
// resolve locally from public/board and public/team.
export function getImageUrl(path: string | null | undefined): string {
  if (typeof path !== "string" || path.length === 0) {
    return "";
  }

  const imageUrl = import.meta.env.PUBLIC_IMAGE_CDN_URL;
  if (imageUrl && path.startsWith("/")) {
    const cleanImageUrl = imageUrl.replace(/\/$/, "");
    return `${cleanImageUrl}${path}`;
  }
  return path;
}
