import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        react: "react.html"
      }
    }
  },
  server: {
    port: 5173
  }
});
