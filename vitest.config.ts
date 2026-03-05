import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: required by vitest
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      reportsDirectory: "./coverage",
    },
  },
  resolve: {
    alias: {
      src: "/src",
      elements: "/src/elements",
      "@pkg": "/package.json",
    },
  },
});
