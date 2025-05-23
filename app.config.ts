export default defineAppConfig({
  ui: {
    container: {
      base: "w-full max-w-(--ui-container) mx-auto px-6",
    },
    carousel: {
      slots: {
        prev: "absolute",
        next: "absolute",
      },
    },
  },
});
