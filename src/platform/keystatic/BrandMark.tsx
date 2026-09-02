/**
 * Sidebar brand mark for the Keystatic admin. Just the ACM logo - Keystatic
 * renders the `name` ("ACM·VIT") right beside it, so keep this to the mark only
 * (rendering the wordmark here too duplicates it).
 */
export function BrandMark() {
  return (
    <img
      src="/logos/logos-acm-logo-black.webp"
      alt="ACM-VIT"
      width={24}
      height={24}
      style={{ borderRadius: 6, display: "block" }}
    />
  );
}
