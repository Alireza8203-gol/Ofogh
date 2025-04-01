<script setup lang="ts">
import axios from "axios";
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";

type Post = {
  id: number;
  userId: string;
  title: string;
  body: string;
};

// const data = await useFetch<Post[]>(
//   "https://jsonplaceholder.typicode.com/posts",
// );

const postsArr = ref<Post[]>([]);
const isLoading = ref<boolean>(true);
const table = useTemplateRef("table");

const UCheckbox = resolveComponent("UCheckbox");
const rowSelection = ref({ 1: true });

const columns: TableColumn<Post>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
  },
  {
    accessorKey: "id",
    header: "Post ID",
  },
  {
    accessorKey: "userId",
    header: "User Posted",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Post Body",
    cell: ({ row }) => {
      return h("p", { class: "truncate w-[200px]" }, row.original.body);
    },
  },
];

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

onMounted(async () => {
  try {
    const { status, data } = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
    );
    console.log(data);
    postsArr.value = data;
    status === 200 ? (isLoading.value = false) : true;
  } catch (error) {
    console.log("error during the fetch: ", error);
  }
});
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      class="flex-1"
      :data="postsArr"
      :columns="columns"
      :loading="isLoading"
      loading-color="primary"
      loading-animation="carousel"
      v-model:pagination="pagination"
      v-model:row-selection="rowSelection"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    />

    <div class="flex justify-center border-t border-(--ui-border) pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
    <div
      class="px-4 py-3.5 border-t border-(--ui-border-accented) text-sm text-(--ui-text-muted)"
    >
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s)
      selected.
    </div>
  </div>
</template>
