<template>
  <UContainer class="w-full space-y-4 mt-10 px-7 bg-surface-card">
    <TableGrid :table-data="postsArr" :is-loading="isLoading" />
  </UContainer>
</template>

<script setup lang="ts">
import axios from "axios";
import type { Post } from "~/types/Global";

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
