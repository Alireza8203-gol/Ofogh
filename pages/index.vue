<template>
  <h1>this is the home and main page!</h1>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Guide",
    icon: "i-prime-palette",
    // to: "/getting-started",
  },
]);
</script>
