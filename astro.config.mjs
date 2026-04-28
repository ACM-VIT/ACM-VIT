import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import keystatic from '@keystatic/astro';

const cdnUrl = process.env.PUBLIC_CDN_URL?.replace(/\/$/, "");

export default defineConfig({
    site: 'https://www.acmvit.in',
    output: 'server',
    adapter: vercel(),
    integrations: [react(), keystatic()],
    build: {
        assetsPrefix: cdnUrl,
    },
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ['@keystatic/astro'],
        },
    }
});
