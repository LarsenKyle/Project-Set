<template>
  <div id="Chart">
    <div class="routeChart">
      <canvas id="routeChart" width="600" height="300"></canvas>
    </div>
    <div class="routeChart">
      <canvas id="boulderChart" width="600" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { fireDb } from "../../plugins/firebase";

export default {
  data() {
    return {
      routes: []
    };
  },
  methods: {
    routes() {
      let grades = [];
      this.$store.state.sections.routes.forEach(route => {
        grades.push(route.grade);
      });
      console.log(grades);
      let chart = document.getElementById("routeChart");
      let routeChart = new Chart(chart, {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
              label: "Roped Routes",
              data: [],
              backgroundColor: []
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Roped Routes"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      //Get the labes 1 of each grade
      let unique = [...new Set(grades)];
      unique.sort();
      unique.sort(function(a, b) {
        return a.length - b.length;
      });
      grades.sort();
      grades.sort(function(a, b) {
        return a.length - b.length;
      });
      //Get the data for the chart
      let count = {};
      grades.forEach(i => {
        count[i] = (count[i] || 0) + 1;
      });
      const keys = Object.values(count);
      unique.forEach(grade => {
        routeChart.data.labels.push(grade);
      });
      keys.forEach(key => {
        routeChart.data.datasets.forEach(dataset => {
          dataset.data.push(key);
          dataset.backgroundColor.push("#8e5ea2");
        });
      });
      routeChart.update();
    }
  },
  mounted() {
    this.routes();
  }
};
</script>

<style></style>
