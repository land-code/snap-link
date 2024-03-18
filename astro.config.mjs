import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://snap-link.vercel.app',
  integrations: [db(), tailwind(), sitemap()],
  output: "server",
  adapter: vercel()
});