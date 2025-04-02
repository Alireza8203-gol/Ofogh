// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/image"],
  compatibilityDate: "2024-11-01",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  colorMode: {
    preference: "dark",
  },
  app: {
    head: {
      title: "سامانه افق",
    },
  },
});
