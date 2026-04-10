import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  // ESTO ES LO QUE FALTA:
  css: [
    "vuetify/lib/styles/main.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
