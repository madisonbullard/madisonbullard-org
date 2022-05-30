import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

/* eslint-disable import/no-default-export */
export default defineConfig({
  plugins: [eslint()],
});
