import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: works at artsrun.github.io/speedy and any fork/rename.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
