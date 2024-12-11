import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import Vuetify from "vite-plugin-vuetify"

export default defineConfig({
  plugins: [
    vue(),
    Vuetify({
      autoImport: false,
      styles: {
        configFile: "/src/core/styles/settings.scss",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
});
