import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import keystatic from '@keystatic/astro';

const cdnUrl = process.env.PUBLIC_CDN_URL?.replace(/\/$/, "");

export default defineConfig({
    site: 'https://acmvit.juxtaryct.com',
    output: 'server',
    adapter: cloudflare(),
    integrations: [react(), keystatic()],
    build: {
        assetsPrefix: cdnUrl,
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
