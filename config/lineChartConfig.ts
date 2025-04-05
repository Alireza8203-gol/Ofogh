export const data = {
  labels: [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ],
  datasets: [
    {
      label: "اینستاگرام",
      borderColor: "green",
      backgroundColor: "green",
      pointBackgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
    {
      fill: false,
      label: "سایت",
      borderDash: [5, 5],
      borderColor: "purple",
      backgroundColor: "purple",
      pointBackgroundColor: "#8acf20",
      data: [72, 20, 52, 60, 56, 110, 69],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "آمار بازدید بر اساس روز های هفته",
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
