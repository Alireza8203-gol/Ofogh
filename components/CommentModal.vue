<template>
  <UModal
    :open="open"
    title="نظرات"
    class="max-w-[80vw] max-h-[70vw] bg-zinc-100 dark:bg-zinc-900"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <UCard variant="subtle">
        <div
          v-if="isLoadingComments"
          class="flex flex-col justify-center gap-y-5"
        >
          <div v-for="n in 5" :key="n" class="flex items-center gap-4">
            <USkeleton class="h-12 w-12 rounded-full" variant="subtle" />

            <div class="grid gap-2">
              <USkeleton class="h-4 w-[250px]" />
              <USkeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <CommentCard v-else :comments-array="commentsData" />
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Comment } from "~/types/Global";
import { getPostComments } from "~/composables/getPostComments";

const emit = defineEmits(["update:open"]);
const isLoadingComments = ref<boolean>(true);
const commentsData = ref<Comment[] | []>([]);
const commentModalProps = defineProps<{
  open: boolean;
  postId: number | undefined;
}>();

watch(
  () => commentModalProps.postId,
  async (postId) => {
    if (!postId) return; // Prevent making a request if postId is null/undefined

    isLoadingComments.value = true;
    try {
      commentsData.value = await getPostComments(postId);
    } catch (error) {
      console.error("Error while getting post's comments:", error);
    } finally {
      isLoadingComments.value = false;
    }
  },
  { immediate: true }, // Run the watcher immediately if postId already has a value
);
</script>
