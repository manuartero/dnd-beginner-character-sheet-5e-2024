// @ts-check
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// biome-ignore lint/style/noDefaultExport: required by astro
export default defineConfig({
  integrations: [react()],
});
