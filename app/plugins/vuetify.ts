// app/plugins/vuetify.ts
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#212121", // Negro/Gris muy oscuro
            background: "#f5f5f5", // Gris muy claro
            surface: "#FFFFFF", // Blanco puro
          },
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
