import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#212121",
            secondary: "#424242",
            error: "#B00020",
            true: "#4CAF50",
            border: "#E0E0E0",
            background: "#f5f5f5",
            surface: "#FFFFFF",
          },
          dark: false,
        },
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
