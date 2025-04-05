<template>
  <UModal
    :open="open"
    :close="false"
    title="آیا مطمئن هستید که پست حذف شود؟"
    class="items-center py-8 bg-zinc-100 dark:bg-zinc-900 text-xl"
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
          variant="outline"
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

const toast = useToast();
const emit = defineEmits(["update:open"]);
const deleteModalProps = defineProps<{
  open: boolean;
  postId: number | undefined;
}>();

const onNoClick = () => {
  emit("update:open", false);
};
const onYesClick = async () => {
  try {
    await deletePost(deleteModalProps.postId as number); // returns the status code if needed
    toast.add({
      title: "موفقیت آمیز بود",
      color: "success",
      description: "با موفقیت حذف شد",
    });
    onNoClick();
  } catch (e) {
    console.error("Error while deleting the post: ", e);
    toast.add({
      title: "موفقیت آمیز بود",
      color: "error",
      description: "حذف پست با مشکل روبرو شده است",
    });
  }
};
</script>
