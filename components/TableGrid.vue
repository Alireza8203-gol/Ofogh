<template>
  <div class="flex px-4 py-3.5 border-b border-(--ui-border-accented)">
    <UInput
      class="w-80"
      v-model="searchQuery"
      placeholder="در میان عنوان ها جست و جو کنید..."
    />
  </div>

  <UTable
    ref="table"
    class="flex-1"
    :columns="columns"
    @select="onSelect"
    :loading="isLoading"
    :data="filteredData"
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

  <UModal
    size="2xl"
    title="ویرایش پست"
    class="max-w-[80vw] max-h-[70vw] bg-surface-card"
    v-model:open="isEditModalOpen"
  >
    <template #body>
      <div class="flex items-center justify-center">
        <FormComp :edit-form-state="editFormState" />
      </div>
    </template>
  </UModal>

  <CommentModal
    v-model:open="isCommentModalOpen"
    :post-id="toRaw(selectedPost?.id) as number"
  />

  <DeleteModal
    v-model:open="isDeleteModalOpen"
    :post-id="toRaw(selectedPost?.id) as number"
  />
</template>

<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import type { EditPost, Post } from "~/types/Global";
import type { TableColumn, TableRow } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";

const props = defineProps<{
  tableData: Post[];
  isLoading: boolean;
  columnsConfig?: TableColumn<Post>[];
}>();

const table = useTemplateRef("table");
// reactive data
const isCommentModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const selectedPost = ref<Post | null>(null);
const rowSelection = ref({});
const searchQuery = ref("");
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});
const editFormState = reactive<EditPost>({
  id: undefined,
  body: undefined,
  title: undefined,
});

// resolving components for table's rows
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UDropdownMenu = resolveComponent("UDropdownMenu");

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
    header: "آی دی پست",
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "آی دی کاربر",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-prime-sort-amount-up-alt"
            : "i-prime-sort-amount-down-alt"
          : "i-prime-sort-alt",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        label: "عنوان پست",
        icon: isSorted
          ? isSorted === "asc"
            ? "i-prime-sort-amount-up-alt"
            : "i-prime-sort-amount-down-alt"
          : "i-prime-sort-alt",
        class: "-mx-2.5",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({ row }) => `#${row.getValue("title")}`,
  },
  {
    accessorKey: "body",
    header: "متن پست",
    cell: ({ row }) => {
      return h("p", { class: "truncate w-75" }, row.original.body);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-prime-ellipsis-v",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

// selects the row with click event
const onSelect = (row: TableRow<Post>) => {
  row.toggleSelected(!row.getIsSelected());
};
// filtering table's data based on the search query (globally)
const filteredData = computed(() => {
  if (!searchQuery.value) return props.tableData;
  return props.tableData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  );
});

// action configuration for rows
const getRowItems = (row: Row<Post>) => {
  return [
    {
      label: "ویرایش پست",
      icon: "i-prime-pen-to-square",
      onSelect() {
        isEditModalOpen.value = true; // Open the modal
        selectedPost.value = row.original; // Store the selected row data
        editFormState.id = selectedPost.value.id;
        editFormState.body = selectedPost.value.body;
        editFormState.title = selectedPost.value.title;
      },
    },
    {
      label: "نمایش نظرات",
      icon: "i-prime-comment",
      onSelect() {
        isCommentModalOpen.value = true;
        selectedPost.value = row.original;
      },
    },
    {
      label: "حذف پست",
      icon: "i-prime-trash",
      onSelect() {
        isDeleteModalOpen.value = true;
        selectedPost.value = row.original;
        console.log(isDeleteModalOpen.value);
      },
    },
  ];
};
</script>
