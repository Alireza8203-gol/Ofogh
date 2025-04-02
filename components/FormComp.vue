<template>
  <div class="flex items-center w-full">
    <UForm
      @submit="onSubmit"
      :state="editFormState"
      :schema="editPostSchema"
      class="space-y-4 w-full"
    >
      <UFormField label="آی دی" name="id">
        <UInput v-model="editFormState.id" class="w-full" disabled />
      </UFormField>

      <UFormField label="عنوان" name="title">
        <UTextarea v-model="editFormState.title" type="text" class="w-full" />
      </UFormField>

      <UFormField label="بدنه متن" name="body">
        <UTextarea class="w-full" v-model="editFormState.body" />
      </UFormField>

      <UButton type="submit">تایید</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { Reactive } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { submitPost } from "~/composables/submitForm";
import { editPostSchema } from "~/schemas/editPostSchema";
import type { EditPost, EditPostForm } from "~/types/Global";

const toast = useToast();
const formCompProps = defineProps<{
  editFormState: Reactive<EditPost>;
}>();

const onSubmit = async (event: FormSubmitEvent<EditPostForm>) => {
  try {
    await submitPost(event.data as EditPost);
    console.log("Post updated successfully!");
    toast.add({
      title: "موفقیت آمیز بود",
      color: "success",
      description: "با موفقیت آپدیت شد",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    toast.add({
      title: "موفقیت آمیز نبود",
      color: "error",
      description: "پست شما آپدیت نشد",
    });
  }
};
</script>
