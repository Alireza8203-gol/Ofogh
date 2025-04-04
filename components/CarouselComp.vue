<template>
  <div class="pb-5">
    <UCarousel
      loop
      arrows
      :items="items"
      v-slot="{ item }"
      :autoplay="{ delay: 5000 }"
      next-icon="i-prime-chevron-left"
      prev-icon="i-prime-chevron-right"
      :prev="{ color: 'neutral', variant: 'outline', size: 'xl' }"
      :next="{ color: 'neutral', variant: 'outline', size: 'xl' }"
      :ui="{
        container: 'flex-row pb-10',
        prev: 'start-0 top-full -translate-y-1/2',
        next: 'end-0 top-full -translate-y-1/2',
      }"
    >
      <!--      class="w-full h-full"-->
      <NuxtImg
        :src="item"
        class="w-full h-fit aspect-3/4 md:aspect-8/5 object-cover rounded-lg"
      />
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
const items = [
  "https://picsum.photos/640/640?random=1",
  "https://picsum.photos/640/640?random=2",
  "https://picsum.photos/640/640?random=3",
  "https://picsum.photos/640/640?random=4",
  "https://picsum.photos/640/640?random=5",
  "https://picsum.photos/640/640?random=6",
];
</script>
