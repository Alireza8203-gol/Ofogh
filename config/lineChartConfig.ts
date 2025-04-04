export const data = {
  labels: ["فروردین", "اردیبشهت", "خرداد", "تیر", "مرداد", "شهریور", "مهر"],
  datasets: [
    {
      label: "فروش",
      borderColor: "green",
      backgroundColor: "green",
      pointBackgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
    {
      fill: false,
      label: "سود",
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
};
