<template>
  <DesktopPageNav
    :go-back="goBack"
    :page-name="pageName"
    :go-forward="goForward"
    :is-hydrated="isHydrated"
    :can-move-in-history="canMoveInHistory"
  />

  <MobilePageNav
    :go-back="goBack"
    :page-icon="pageIcon"
    :go-forward="goForward"
    :is-hydrated="isHydrated"
    :can-move-in-history="canMoveInHistory"
  />
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const isHydrated = ref<boolean>(false);
const pageName = ref<string>("");
const pageIcon = ref<string>("");
const canMoveInHistory = ref<boolean>(false);

const goBack = () => {
  window.history.length > 1 && router.back();
};
const goForward = () => {
  window.history.forward();
};

watch(
  () => route.path,
  (newPath) => {
    switch (newPath) {
      case "/":
        pageName.value = "صفحه اصلی";
        pageIcon.value = "i-prime-home";
        break;
      case "/posts":
        pageName.value = "پست ها";
        pageIcon.value = "i-prime-palette";
        break;
      case "/new-post":
        pageName.value = "افزودن پست جدید";
        pageIcon.value = "i-prime-plus-circle";
        break;
      case "/statistics":
        pageName.value = "آمار بازدید";
        pageIcon.value = "i-prime-chart-bar";
        break;
      default:
        pageName.value = "";
    }
  },
  { immediate: true }, // 🔥 runs once on the first load too
);
watch(
  () => route.fullPath,
  () => {
    if (import.meta.client) {
      canMoveInHistory.value = window.history.length > 1;
    }
  },
  { immediate: true },
);
onMounted(() => {
  isHydrated.value = true;
  canMoveInHistory.value = window.history.length > 1;
});
</script>
