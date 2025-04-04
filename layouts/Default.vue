<template>
  <header class="bg-zinc-100 dark:bg-zinc-900">
    <UContainer class="flex items-center justify-between py-4 px-7">
      <div class="flex items-center justify-start gap-x-4">
        <Sidebar :items="menuItems" />
        <UAvatar src="https://github.com/nuxt.png" size="3xl" />
        <span class="text-xl font-bold">سامانه افق</span>
      </div>

      <PageNavControl />
    </UContainer>
  </header>
  <NuxtPage />
</template>

<script setup lang="ts">
import axios from "axios";
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = ref<NavigationMenuItem[]>([]);

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/menuItems");
    menuItems.value = data as NavigationMenuItem[];
  } catch (error) {
    console.log("error fetching trending collections from api", error);
  }
});
</script>
