import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, stat } from "fs/promises";
import { join, relative, sep } from "path";
import mime from "mime-types";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || process.env.R2_TOKEN;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_MEDIA_BUCKET_NAME || process.env.R2_BUCKET_NAME;

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ Missing R2 credentials.");
  console.error("Required: R2_ENDPOINT, R2_ACCESS_KEY_ID (or R2_TOKEN), R2_SECRET_ACCESS_KEY, R2_MEDIA_BUCKET_NAME (or R2_BUCKET_NAME)");
  process.exit(1);
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

// Heavy media lives in public/. Object keys mirror the runtime paths that
// getMediaUrl() builds (e.g. "/audio/x.mp3" -> key "audio/x.mp3"), so the
// bucket is served at PUBLIC_MEDIA_CDN_URL with no path rewriting.
const PUBLIC_DIR = join(__dirname, "..", "public");
const MEDIA_DIRS = ["audio", "videos"];
const LONG_CACHE_CONTROL = "public, max-age=31556926, immutable";
const SKIP_FILES = new Set([".DS_Store"]);

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      if (SKIP_FILES.has(dirent.name)) return [];
      const res = join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    })
  );
  return files.flat();
}

async function uploadFile(filePath) {
  const fileContent = await readFile(filePath);
  const key = relative(PUBLIC_DIR, filePath).split(sep).join("/");
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  try {
    const { ContentLength } = await s3Client.send(
      new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key })
    );
    if (ContentLength === fileContent.length) {
      console.log(`⏭️  Skipping ${key} (already up to date)`);
      return;
    }
  } catch (error) {
    if (error.name !== "NotFound" && error.$metadata?.httpStatusCode !== 404) {
      // fall through and attempt upload
    }
  }

  console.log(`⬆️  Uploading ${key} (${contentType})...`);
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: contentType,
        CacheControl: LONG_CACHE_CONTROL,
      })
    );
    console.log(`✅ Uploaded: ${key}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${key}:`, err.message);
    process.exitCode = 1;
  }
}

async function main() {
  console.log("🚀 Uploading heavy media to R2...");
  console.log(`Target bucket: ${R2_BUCKET_NAME}`);

  const files = [];
  for (const sub of MEDIA_DIRS) {
    const dir = join(PUBLIC_DIR, sub);
    try {
      await stat(dir);
    } catch {
      console.warn(`⚠️  Skipping missing dir: public/${sub}`);
      continue;
    }
    files.push(...(await getFiles(dir)));
  }

  console.log(`Found ${files.length} media files.`);

  const CHUNK_SIZE = 5;
  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    await Promise.all(files.slice(i, i + CHUNK_SIZE).map(uploadFile));
  }

  console.log("✨ Media upload complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
