import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Tres páginas: index.html (HypokratIA), ica.html (Instituto de Cirugía Articular) y planes.html (planes de Gestión).
// En Vercel, conoce.icarticular.cl sirve ica.html y planes.hipokratia.health sirve planes.html (ver vercel.json).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ica: resolve(__dirname, "ica.html"),
        planes: resolve(__dirname, "planes.html"),
      },
    },
  },
});
