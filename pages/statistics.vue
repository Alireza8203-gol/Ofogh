<template>
  <UContainer class="w-full space-y-4 mt-10 px-7">
    <div class="flex flex-col justify-center gap-y-10">
      <UCard class="bg-zinc-100 dark:bg-zinc-900">
        <LineChartComp />
      </UCard>
      <UCard class="bg-zinc-100 dark:bg-zinc-900">
        <PieChartComp />
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts"></script>
