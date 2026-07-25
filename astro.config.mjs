import 'dotenv/config';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import keystatic from '@keystatic/astro';

// assetsPrefix routes the hashed _astro JS/CSS bundles to a CDN. It is kept
// separate from PUBLIC_CDN_URL (which getAssetUrl uses for selected public/
// folders) because _astro lives in dist/, not the R2 bucket, and rehashes every
// build. Opt in only after the bundles are being uploaded to that host.
const assetsPrefix = process.env.PUBLIC_ASSETS_PREFIX?.replace(/\/$/, "");

// The Keystatic GitHub App slug is public (used client-side to build the App's
// install URL), so a committed default is fine and keeps prod builds working
// without a build-env var. Override via PUBLIC_KEYSTATIC_GITHUB_APP_SLUG if the
// App changes.
process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ||= 'acm-vit-website-content-platform-2';

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL || 'https://www.acmvit.in',
    output: 'server',
    adapter: cloudflare(),
    integrations: [react(), keystatic()],
    build: {
        ...(assetsPrefix ? { assetsPrefix } : {}),
    },
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ['@keystatic/astro'],
            include: ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
        },
        resolve: {
            dedupe: ['react', 'react-dom'],
        },
    }
});
