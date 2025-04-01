export default defineEventHandler(() => {
  return [
    {
      label: "صفحه اصلی",
      icon: "i-prime-palette",
      to: "/",
    },
    {
      label: "پست ها",
      icon: "i-prime-palette",
      to: "/posts",
    },
    {
      label: "پست جدید",
      icon: "i-prime-plus-circle",
      to: "/new-post",
    },
    {
      label: "آمار بازدید",
      icon: "i-prime-chart-bar",
      to: "/statistics",
    },
  ];
});
