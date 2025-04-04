<template>
  <USlideover :overlay="false" :close="false">
    <UButton
      icon="i-prime-bars"
      class="flex items-center justify-center size-10 rounded-full cursor-pointer"
    />
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="w-full bg-zinc-100 dark:bg-zinc-900"
      >
      </UNavigationMenu>
    </template>

    <template #footer>
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          color="neutral"
          variant="ghost"
          @click="isDark = !isDark"
          :icon="isDark ? 'i-prime-moon' : 'i-prime-sun'"
        />
      </ClientOnly>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();
const props = defineProps<{
  items: NavigationMenuItem[];
}>();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
