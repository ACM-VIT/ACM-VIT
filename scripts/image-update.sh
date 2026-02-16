#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Run from parent folder of this script (repo root)
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

# Defaults
TARGET_DIR="${1:-.}"        # optional first arg: directory to scan (default repo root)
QUALITY="${2:-60}"         # optional second arg: quality (used by ImageMagick)
FORCE=false
# accept --force anywhere after positional args
for arg in "${@:3}"; do
  if [ "$arg" = "--force" ] || [ "$arg" = "-f" ]; then
    FORCE=true
  fi
done

# Detect converters
if command -v magick >/dev/null 2>&1; then
  IM_CMD="magick"
elif command -v convert >/dev/null 2>&1; then
  IM_CMD="convert"
else
  IM_CMD=""
fi

if command -v ffmpeg >/dev/null 2>&1; then
  FFMPEG=1
else
  FFMPEG=0
fi

if command -v rsvg-convert >/dev/null 2>&1; then
  RSVG=1
else
  RSVG=0
fi

if [ -z "$IM_CMD" ] && [ $FFMPEG -eq 0 ]; then
  echo "Needs ImageMagick (magick/convert) or ffmpeg installed. Aborting."
  exit 2
fi

echo "Target dir: $TARGET_DIR"
echo "Quality: $QUALITY"
echo "Force overwrite: $FORCE"
echo "Using ImageMagick: ${IM_CMD:-none}, ffmpeg: $FFMPEG, rsvg-convert: $RSVG"

convert_with_im() {
  src="$1"
  dst="$2"
  # Use magick/convert directly; set background transparent for SVG
  if [ "${IM_CMD}" = "magick" ]; then
    magick "$src" -quality "$QUALITY" "$dst"
  else
    convert "$src" -quality "$QUALITY" "$dst"
  fi
}

convert_with_ffmpeg() {
  src="$1"
  dst="$2"
  # ffmpeg: use libaom-av1 if available; fall back to default encoding
  # Use CRF ~30 as a reasonable default mapping for quality ~60
  crf=30
  ffmpeg -y -loglevel error -i "$src" -c:v libaom-av1 -crf "$crf" -b:v 0 "$dst"
}

# Process files
find "$TARGET_DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.webp' -o -iname '*.gif' -o -iname '*.tif' -o -iname '*.tiff' \) -print0 |
while IFS= read -r -d '' file; do
  dst="${file%.*}.avif"
  if [ -e "$dst" ] && [ "$dst" -nt "$file" ] && [ "$FORCE" = false ]; then
    printf 'Skipping (up-to-date): %s\n' "$file"
    continue
  fi

  printf 'Converting: %s -> %s\n' "$file" "$dst"

  ext="${file##*.}"
  ext_lc="${ext,,}"

  # If SVG and no ImageMagick, render to PNG first (using rsvg-convert if available)
  if [ "$ext_lc" = "svg" ] && [ -z "$IM_CMD" ]; then
    if [ $RSVG -eq 1 ]; then
      tmp_png="$(mktemp --suffix=.png)"
      rsvg-convert -a -o "$tmp_png" "$file"
      if [ $FFMPEG -eq 1 ]; then
        convert_with_ffmpeg "$tmp_png" "$dst" || { rm -f "$tmp_png"; echo "Failed: $file"; continue; }
      else
        convert_with_im "$tmp_png" "$dst" || { rm -f "$tmp_png"; echo "Failed: $file"; continue; }
      fi
      rm -f "$tmp_png"
      continue
    else
      # If no rsvg-convert, but ImageMagick exists this branch isn't reached.
      echo "Can't render SVG $file (no ImageMagick and no rsvg-convert). Skipping."
      continue
    fi
  fi

  # For other images: prefer ImageMagick, else ffmpeg
  if [ -n "$IM_CMD" ]; then
    if ! convert_with_im "$file" "$dst"; then
      echo "ImageMagick conversion failed for $file, trying ffmpeg..."
      if [ $FFMPEG -eq 1 ]; then
        convert_with_ffmpeg "$file" "$dst" || { echo "Failed with ffmpeg too: $file"; continue; }
      else
        echo "No fallback available for $file"
        continue
      fi
    fi
  else
    # no ImageMagick, use ffmpeg
    if ! convert_with_ffmpeg "$file" "$dst"; then
      echo "ffmpeg conversion failed for $file"
      continue
    fi
  fi

done

echo "Done."
