<template>
  <div class="flex flex-col justify-start gap-y-5">
    <UCard
      variant="subtle"
      :key="comment.id"
      v-for="comment in commentsArray"
      class="flex flex-nowrap items-center gap-4 bg-surface-card"
    >
      <div class="flex flex-col items-start justify-between gap-y-4">
        <div class="flex items-center gap-x-4">
          <UAvatar
            size="3xl"
            class="size-12 rounded-full"
            src="https://github.com/nuxt.png"
          />
          <span>{{ comment.email }}</span>
        </div>
        <div class="flex flex-col gap-y-2">
          <h5>{{ comment.name }}</h5>
          <p class="text-wrap">{{ comment.body }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from "~/types/Global";

const commentCardProps = defineProps<{
  commentsArray: Comment[] | [];
}>();
</script>
