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
        class="w-full bg-surface-card"
      >
      </UNavigationMenu>
    </template>

    <template #footer>
      <UButton
        size="xl"
        color="primary"
        class="rounded-full"
        trailing-icon="i-prime-moon"
      />
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const props = defineProps<{
  items: NavigationMenuItem[];
}>();
</script>
