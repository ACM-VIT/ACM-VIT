import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

const cdnUrl = process.env.PUBLIC_CDN_URL?.replace(/\/$/, "");

export default defineConfig({
    output: 'static',
    adapter: vercel(),
    build: {
        assetsPrefix: cdnUrl,
    },
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            noExternal: []
        }
    }
});
