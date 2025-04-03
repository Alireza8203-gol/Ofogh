<template>
  <UModal
    :open="open"
    :close="false"
    title="آیا مطمئن هستید که پست حذف شود؟"
    class="items-center py-8 bg-surface-card text-xl"
    @update:open="emit('update:open', $event)"
    :ui="{
      overlay: 'bg-(--ui-bg-elevated)/75',
    }"
  >
    <!--    max-w-[80vw] max-h-[70vw]-->
    <template #body>
      <div class="flex items-center gap-x-20">
        <UButton
          label="خیر"
          color="success"
          variant="subtle"
          class="py-3 px-10 text-lg"
          @click="onNoClick"
        />
        <UButton
          label="بله"
          color="error"
          variant="outline"
          class="py-3 px-10 text-lg"
          @click="onYesClick"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { deletePost } from "~/composables/deletePost";

const emit = defineEmits(["update:open"]);
const deleteModalProps = defineProps<{
  open: boolean;
  postId: number;
}>();

const onYesClick = async () => {
  // try {
  //   const res = await deletePost(deleteModalProps.postId as number);
  //   console.log(res);
  // } catch (e) {
  //   console.error("Error while deleting the post: ", e);
  // }
  console.info(deleteModalProps.postId);
};

const onNoClick = async () => {
  console.info(deleteModalProps.postId);
};
</script>
