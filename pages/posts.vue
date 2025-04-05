<template>
  <UContainer class="w-full space-y-4 mt-10 px-7">
    <UCard class="bg-zinc-100 dark:bg-zinc-900">
      <TableGrid :table-data="postsArr" :is-loading="isLoading" />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import axios from "axios";
import type { Post } from "~/types/Global";
useHead({
  title: "سامانه افق | پست ها",
});

const postsArr = ref<Post[]>([]);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const { status, data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    postsArr.value = data;
    status === 200 ? (isLoading.value = false) : true;
  } catch (error) {
    console.log("error during the fetch: ", error);
  }
});
</script>
