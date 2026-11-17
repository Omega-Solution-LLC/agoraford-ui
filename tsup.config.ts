import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
  // Runs after every build, including watch rebuilds, so dist is always client-ready.
  onSuccess: "node scripts/add-use-client.mjs",
});
