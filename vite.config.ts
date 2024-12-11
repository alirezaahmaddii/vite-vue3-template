import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Vuetify from "vite-plugin-vuetify"

export default defineConfig({
  plugins: [
    vue(),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/core/styles/settings.scss",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  },
});
