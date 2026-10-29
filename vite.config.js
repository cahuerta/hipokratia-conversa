import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Dos páginas: index.html (HypokratIA) e ica.html (Instituto de Cirugía Articular).
// En Vercel, conoce.icarticular.cl sirve ica.html (ver vercel.json).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ica: resolve(__dirname, "ica.html"),
      },
    },
  },
});
