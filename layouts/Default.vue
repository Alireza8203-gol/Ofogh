<template>
  <header class="bg-surface-card">
    <UContainer class="flex items-center justify-between py-4 px-7">
      <div class="flex items-center justify-start gap-x-4">
        <Sidebar :items="menuItems" />
        <UAvatar src="https://github.com/nuxt.png" size="3xl" />
        <span class="text-xl font-bold">سامانه افق</span>
      </div>
      <div class="flex items-center justify-start gap-x-10">
        <UButton
          size="lg"
          label="بعدی"
          color="primary"
          variant="outline"
          @click="goForward"
          class="cursor-pointer"
          icon="i-prime-angle-right"
          :disabled="canMoveInHistory"
        />
        <p>{{ pageName }}</p>
        <UButton
          size="lg"
          label="قبلی"
          color="primary"
          variant="outline"
          @click="goBack"
          icon="i-prime-angle-left"
          :disabled="canMoveInHistory"
          class="flex-row-reverse cursor-pointer"
        />
      </div>
    </UContainer>
  </header>
  <NuxtPage />
</template>

<script setup lang="ts">
import axios from "axios";
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();
const pageName = ref<string>("");
const menuItems = ref<NavigationMenuItem[]>([]);
const canMoveInHistory = ref<boolean>(false);

const goBack = () => {
  window.history.length > 1 && router.back();
};
const goForward = () => {
  console.log("goForward");
  window.history.forward(); // Moves forward in the history stack
};

switch (route.path) {
  case "/":
    pageName.value = "صفحه اصلی";
    break;
  case "/posts":
    pageName.value = "پست ها";
    break;
  case "/new-post":
    pageName.value = "افزودن پست جدید";
    break;
  case "/statistics":
    pageName.value = "آمار بازدید";
    break;
}

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/menuItems");
    menuItems.value = data as NavigationMenuItem[];
  } catch (error) {
    console.log("error fetching trending collections from api", error);
  }
});
</script>
