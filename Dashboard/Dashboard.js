// This file creates 3 charts using Chart.js.
// For now we use simple dummy data so you can understand the structure.

// ===== LINE CHART: activity over time =====
const lineCtx = document.getElementById("lineChart").getContext("2d");

new Chart(lineCtx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Logins",
        data: [120, 180, 150, 200, 240, 220, 260],
        tension: 0.3, // curved line
        borderWidth: 2
      },
      {
        label: "Total logs",
        data: [400, 520, 480, 600, 750, 700, 820],
        tension: 0.3,
        borderWidth: 2
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "#000000" // text color
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#1f2937" }
      }
    }
  }
});

// ===== BAR CHART: logs by category =====
const barCtx = document.getElementById("barChart").getContext("2d");

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Authentication", "Access", "System", "Application"],
    datasets: [
      {
        label: "Number of logs",
        data: [3200, 2100, 1400, 900],
        borderWidth: 1
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        labels: { color: "#000000" }
      }
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#1f2937" }
      }
    }
  }
});

// ===== PIE CHART: severity distribution =====
const pieCtx = document.getElementById("pieChart").getContext("2d");

new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["Info", "Warning", "Critical"],
    datasets: [
      {
        data: [70, 20, 10] // percentages
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#000000" }
      }
    }
  }
});
