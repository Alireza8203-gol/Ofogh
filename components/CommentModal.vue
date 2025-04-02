<template>
  <UModal
    size="2xl"
    title="نظرات"
    class="bg-surface-card"
    :open="open"
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

        <div class="h-8" v-else></div>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Post } from "~/types/Global";
import { getPostComments } from "~/composables/getPostComments";

const commentsData = reactive({});
const isLoadingComments = ref<boolean>(true);
const commentModalProps = defineProps<{
  open: boolean;
  selectedPost: Post;
}>();
const emit = defineEmits(["update:open"]);

onMounted(async () => {
  if (commentModalProps.open) {
    try {
      const res = await getPostComments(
        toRaw(commentModalProps.selectedPost.id),
      );
      console.log(res);
      isLoadingComments.value = false;
    } catch (error) {
      console.log("Error while getting post's comment: ", error);
    }
  }
});
</script>
