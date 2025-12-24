import { defineConfig } from "tsdown";

export default defineConfig({
	entry: "./src/index.ts",
	format: "esm",
	outDir: "./dist",
	clean: true,
	// Bundle all dependencies into a single file for Docker deployment
	noExternal: [/.*/],
});
