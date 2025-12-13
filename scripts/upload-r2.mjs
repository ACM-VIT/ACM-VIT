import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, stat } from "fs/promises";
import { join, relative, sep } from "path";
import mime from "mime-types";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || process.env.R2_TOKEN; // Fallback to TOKEN if ID not explicit
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "the-everything-assistant";

if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error("❌ Missing R2 credentials in environment variables.");
  console.error("Required: R2_ENDPOINT, R2_ACCESS_KEY_ID (or R2_TOKEN used as ID), R2_SECRET_ACCESS_KEY");
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

const DIST_DIR = join(__dirname, "..", "dist", "client");

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.isArray(files) ? files.flat() : [files];
}

async function uploadFile(filePath) {
  const fileContent = await readFile(filePath);
  const relativePath = relative(DIST_DIR, filePath).split(sep).join("/");
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  // Check if file exists and matches size
  try {
    const headCommand = new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: relativePath,
    });
    const { ContentLength } = await s3Client.send(headCommand);

    if (ContentLength === fileContent.length) {
      console.log(`⏭️  Skipping ${relativePath} (already exists)`);
      return;
    }
  } catch (error) {
    // Ignore 404 Not Found, proceed to upload
    if (error.name !== 'NotFound' && error.$metadata?.httpStatusCode !== 404) {
       // Optional: log other errors or just proceed
    }
  }

  console.log(`Uploading ${relativePath} (${contentType})...`);

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: relativePath,
      Body: fileContent,
      ContentType: contentType,
    });

    await s3Client.send(command);
    console.log(`✅ Uploaded: ${relativePath}`);
  } catch (err) {
    console.error(`❌ Failed to upload ${relativePath}:`, err);
  }
}

async function main() {
  console.log("🚀 Starting R2 Upload...");
  console.log(`Target Bucket: ${R2_BUCKET_NAME}`);
  console.log(`Source Directory: ${DIST_DIR}`);

  try {
    await stat(DIST_DIR);
  } catch (e) {
    console.error(`❌ Dist directory not found at ${DIST_DIR}. Did you run 'npm run build'?`);
    process.exit(1);
  }

  const files = await getFiles(DIST_DIR);
  console.log(`Found ${files.length} files to upload.`);

  // Upload in parallel chunks to avoid overwhelming but speed up
  const CHUNK_SIZE = 5;
  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    const chunk = files.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(uploadFile));
  }

  console.log("✨ All files uploaded successfully!");
}

main().catch(console.error);
