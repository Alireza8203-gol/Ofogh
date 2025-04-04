<template>
  <div class="flex items-center w-full">
    <UForm
      @submit="onSubmit"
      :state="newPostData"
      :schema="newPostSchema"
      class="space-y-4 w-full"
    >
      <UFormField label="شناسه" name="id">
        <UInput
          type="number"
          class="w-full"
          v-model="newPostData.id"
          placeholder="عدد شناسه پست خود را وارد نمایید..."
        />
      </UFormField>

      <UFormField label="عنوان" name="title">
        <UTextarea
          type="text"
          class="w-full"
          v-model="newPostData.title"
          placeholder="عنوان پست (حروف فارسی مورد قبول نمیباشند)..."
        />
      </UFormField>

      <UFormField label="بدنه متن" name="body">
        <UTextarea
          :rows="7"
          class="w-full"
          v-model="newPostData.body"
          placeholder="متن پست خود را وارد نمایید..."
        />
      </UFormField>

      <UButton type="submit" size="xl">ارسال پست</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types/Global";
import type { FormSubmitEvent } from "@nuxt/ui";
import { newPostSchema } from "~/schemas/newPostSchema";
import { submitNewPost } from "~/composables/submitNewPost";

const toast = useToast();
const newPostData = reactive<Post>({
  id: 0,
  body: "",
  title: "",
});

const onSubmit = async (event: FormSubmitEvent<Post>) => {
  try {
    await submitNewPost(event.data as Post);
    console.info("Post was sent successfully!");
    toast.add({
      color: "success",
      title: "موفقیت آمیز بود",
      description: "دست شما با موفقیت ارسال شد",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    toast.add({
      color: "error",
      title: "موفقیت آمیز نبود",
      description: "پست شما ارسال نشد",
    });
  }
};
</script>
