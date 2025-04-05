<template>
  <div class="hidden sm:flex items-center justify-start gap-x-10">
    <UButton
      size="lg"
      label="بعدی"
      color="primary"
      variant="outline"
      @click="goForward"
      class="cursor-pointer"
      icon="i-prime-angle-right"
      :disabled="!isHydrated || !canMoveInHistory"
    />
    <!--      :disabled="!canMoveInHistory"-->

    <p class="font-bold">{{ pageName }}</p>

    <UButton
      size="lg"
      label="قبلی"
      color="primary"
      variant="outline"
      @click="goBack"
      icon="i-prime-angle-left"
      :disabled="!isHydrated || !canMoveInHistory"
      class="flex-row-reverse cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pageName: string;
  goBack: () => void;
  isHydrated: boolean;
  goForward: () => void;
  canMoveInHistory: boolean;
}>();

onMounted(() => {
  console.log(props.goBack);
  console.log(props.canMoveInHistory);
});
</script>
