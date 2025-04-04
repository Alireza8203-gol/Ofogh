import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Post, RowItem } from "~/types/Global";

export const getTableColumnsConfig = (
  buttonComp: Component,
  checkBoxComp: Component,
  dropdownMenuComp: Component,
  getRowItems: (row: Row<Post>) => RowItem[],
) => {
  const columns: TableColumn<Post>[] = [
    {
      id: "select",
      header: ({ table }) =>
        h(checkBoxComp, {
          modelValue: table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : table.getIsAllPageRowsSelected(),
          "onUpdate:modelValue": (value: boolean | "indeterminate") =>
            table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all",
        }),
      cell: ({ row }) =>
        h(checkBoxComp, {
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

        return h(buttonComp, {
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

        return h(buttonComp, {
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
            dropdownMenuComp,
            {
              content: {
                align: "end",
              },
              items: getRowItems(row),
              "aria-label": "Actions dropdown",
            },
            () =>
              h(buttonComp, {
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
  return columns;
};
