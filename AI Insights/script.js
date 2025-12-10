// Chart data
const chartData = {
  timeline: {
    labels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
    data: [2, 1, 3, 4, 8, 12, 18, 30, 16, 10, 7, 3]
  },
  distribution: {
    labels: ["DB Timeouts", "Auth Failures", "Payment Gateway", "API Rate Limit"],
    data: [34, 21, 17, 9]
  }
};

// Initialize charts on page load
document.addEventListener('DOMContentLoaded', function() {
  initTimelineChart();
  initDistributionChart();
});

// Timeline Chart
function initTimelineChart() {
  const canvas = document.getElementById('timelineChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.timeline.labels,
      datasets: [{
        label: 'Errors per hour',
        data: chartData.timeline.data,
        borderColor: '#0b74ff',
        backgroundColor: 'rgba(11, 116, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#0b74ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 35,
          grid: {
            color: '#e2e8f0',
            drawBorder: false
          },
          ticks: {
            color: '#6e7380',
            font: { size: 11 }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6e7380',
            font: { size: 11 }
          }
        }
      }
    }
  });
}

// Distribution Chart
function initDistributionChart() {
  const canvas = document.getElementById('distributionChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.distribution.labels,
      datasets: [{
        label: 'Count',
        data: chartData.distribution.data,
        backgroundColor: [
          '#0b74ff',
          '#fbbf24',
          '#f87171',
          '#60a5fa'
        ],
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 40,
          grid: {
            color: '#e2e8f0',
            drawBorder: false
          },
          ticks: {
            color: '#6e7380',
            font: { size: 11 }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6e7380',
            font: { size: 11 }
          }
        }
      }
    }
  });
}
