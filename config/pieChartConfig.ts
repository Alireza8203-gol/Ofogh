export const data = {
  labels: ["ایران", "عراق", "کره جنوبی", "مالدیو"],
  datasets: [
    {
      data: [40, 20, 80, 10],
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "آمار بازدید بر اساس کشور ها",
      font: {
        size: 18,
      },
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  },
};
