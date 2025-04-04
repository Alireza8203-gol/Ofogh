<template>
  <DesktopPageNav
    :go-back="goBack"
    :page-name="pageName"
    :go-forward="goForward"
    :can-move-in-history="canMoveInHistory"
  />

  <MobilePageNav
    :go-back="goBack"
    :page-icon="pageIcon"
    :go-forward="goForward"
    :can-move-in-history="canMoveInHistory"
  />
</template>

<script setup lang="ts">
import { process } from "std-env";

const route = useRoute();
const router = useRouter();
const pageName = ref<string>("");
const pageIcon = ref<string>("");
const canMoveInHistory = ref<boolean>(false);

if (process.client) {
  canMoveInHistory.value = window.history.length > 1;
}
const goBack = () => {
  window.history.length > 1 && router.back();
};
const goForward = () => {
  window.history.forward(); // Moves forward in the history stack
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
</script>
