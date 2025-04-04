<template>
  <div class="flex flex-col items-center justify-between sm:hidden">
    <div class="flex items-center gap-x-4">
      <UButton
        size="lg"
        color="primary"
        variant="outline"
        @click="goForward"
        class="cursor-pointer rounded-full"
        icon="i-prime-angle-right"
        :disabled="!canMoveInHistory"
      />

      <UIcon
        :name="pageIcon"
        class="flex-row-reverse size-8 cursor-pointer rounded-full"
      />

      <UButton
        size="lg"
        color="primary"
        @click="goBack"
        variant="outline"
        icon="i-prime-angle-left"
        :disabled="!canMoveInHistory"
        class="flex-row-reverse cursor-pointer rounded-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pageIcon: string;
  goBack: () => void;
  goForward: () => void;
  canMoveInHistory: boolean;
}>();
</script>
