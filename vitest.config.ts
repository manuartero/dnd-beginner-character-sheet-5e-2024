import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: required by vitest
export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			src: "/src",
		},
	},
});
