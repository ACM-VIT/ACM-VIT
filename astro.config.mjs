import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
    output: 'static',
    adapter: vercel(),
    build: {
    },
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            noExternal: []
        }
    }
});
