<template>
  <Pie :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import * as chartConfig from "~/config/pieChartConfig";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = ref(chartConfig.data);
const options = ref(chartConfig.options);
</script>
