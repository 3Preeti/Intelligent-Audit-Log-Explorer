// Sample Log Data
const logData = {
  timestamp: "2024-12-09 14:35:22",
  level: "ERROR",
  pid: 2847,
  threadName: "WorkerThread-5",
  message: "Database connection timeout after 30 seconds",
  fullContent: `[2024-12-09 14:35:22] ERROR [WorkerThread-5] (2847) Database connection timeout after 30 seconds
Stack trace:
  at DatabasePool.connect (db/pool.js:245)
  at Service.initialize (services/base.js:89)
  at Application.start (app.js:156)
  
Context: Attempting to establish connection to primary database server.
Status: Retrying with secondary connection...`,
  logParameters: [
    { level: "ERROR", time: "2024-12-09 14:35:22", pid: 2847, thread: "WorkerThread-5", message: "Database connection timeout" },
    { level: "INFO", time: "2024-12-09 14:35:23", pid: 2847, thread: "WorkerThread-5", message: "Attempting reconnection..." },
    { level: "INFO", time: "2024-12-09 14:35:24", pid: 2847, thread: "WorkerThread-5", message: "Connected to secondary database" }
  ],
  tags: ["database", "connection", "error", "critical"],
  attributes: { service: "UserService", version: "2.1.0", env: "production" }
};

// Similar logs data
const similarLogs = [
  { timestamp: "2024-12-08 10:22:15", level: "ERROR", message: "Database connection timeout after 30 seconds" },
  { timestamp: "2024-12-07 16:45:30", level: "ERROR", message: "Database connection timeout after 45 seconds" },
  { timestamp: "2024-12-05 08:12:50", level: "WARN", message: "Slow database query detected (3.2s)" }
];

// AI Explanation
const aiExplanation = `This error indicates that the application failed to establish a connection to the primary database within the 30-second timeout window. This typically occurs due to:

1. Network connectivity issues between the application and database server
2. Database server is under heavy load or temporarily unavailable
3. Firewall or security group rules blocking the connection
4. DNS resolution issues

The system appropriately retried the connection and successfully connected to the secondary database server as a fallback. Monitor database server health and network latency to prevent future occurrences.`;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  populateLogDisplay();
  populateLogParameters();
  populateTags();
  populateSimilarLogs();
  populateAIExplanation();
  attachEventListeners();
});

// Populate Log Display
function populateLogDisplay() {
  const logDisplay = document.getElementById('logContent');
  logDisplay.textContent = logData.fullContent;
}

// Populate Log Parameters Table
function populateLogParameters() {
  const tbody = document.getElementById('paramsBody');
  tbody.innerHTML = '';
  
  logData.logParameters.forEach(param => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${param.level}</td>
      <td>${param.time}</td>
      <td>${param.pid}</td>
      <td>${param.thread}</td>
      <td>${param.message}</td>
    `;
    tbody.appendChild(row);
  });
}

// Populate Tags
function populateTags() {
  const container = document.getElementById('tagsContainer');
  container.innerHTML = '';
  
  // Add tags
  logData.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    container.appendChild(tagElement);
  });
  
  // Add attributes
  Object.entries(logData.attributes).forEach(([key, value]) => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag attribute';
    tagElement.textContent = `${key}: ${value}`;
    container.appendChild(tagElement);
  });
}

// Populate Similar Logs
function populateSimilarLogs() {
  const container = document.getElementById('similarLogs');
  container.innerHTML = '';
  
  similarLogs.forEach(log => {
    const logItem = document.createElement('div');
    logItem.className = 'similar-log-item';
    const levelClass = log.level === 'ERROR' ? 'error' : log.level === 'WARN' ? 'warn' : 'info';
    logItem.innerHTML = `
      <div class="log-level ${levelClass}">${log.level}</div>
      <div class="log-message">${log.message}</div>
      <div class="log-time">${log.timestamp}</div>
    `;
    container.appendChild(logItem);
  });
}

// Populate AI Explanation
function populateAIExplanation() {
  const container = document.getElementById('aiExplanation');
  container.innerHTML = `<p>${aiExplanation}</p>`;
}

// Attach Event Listeners
function attachEventListeners() {
  document.getElementById('closeBtn').addEventListener('click', closeWindow);
  document.getElementById('downloadBtn').addEventListener('click', downloadLog);
  document.getElementById('reportBtn').addEventListener('click', addToReport);
  document.getElementById('bookmarkBtn').addEventListener('click', bookmarkLog);
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
}

// Close Window
function closeWindow() {
  window.history.back();
}

// Download Log
function downloadLog() {
  const content = logData.fullContent;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `log-${logData.timestamp.replace(/[^0-9]/g, '')}.txt`;
  link.click();
  URL.revokeObjectURL(url);
  alert('Log downloaded successfully');
}

// Add to Report
function addToReport() {
  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  reports.push({
    timestamp: new Date().toISOString(),
    logData: logData
  });
  localStorage.setItem('reports', JSON.stringify(reports));
  alert('Log added to report');
}

// Bookmark Log
function bookmarkLog() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push({
    timestamp: logData.timestamp,
    message: logData.message,
    level: logData.level
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  alert('Log bookmarked');
}

// Copy to Clipboard
function copyToClipboard() {
  const content = logData.fullContent;
  navigator.clipboard.writeText(content).then(() => {
    alert('Log copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy log');
  });
}
const detailLevel = document.getElementById("detailLevel");
const detailPid = document.getElementById("detailPid");
const detailThread = document.getElementById("detailThread");
const detailTime = document.getElementById("detailTime");
const detailMessage = document.getElementById("detailMessage");
const detailExtra = document.getElementById("detailExtra");

// ---- render table ----
function renderTable(list) {
  logTableBody.innerHTML = "";

  list.forEach((log) => {
    const tr = document.createElement("tr");
    tr.dataset.id = log.id;

    if (log.id === selectedLogId) {
      tr.classList.add("selected");
    }

    const tdLevel = document.createElement("td");
    tdLevel.textContent = log.level;
    tdLevel.classList.add(`level-${log.level}`);

    const tdTime = document.createElement("td");
    tdTime.textContent = log.time;

    const tdPid = document.createElement("td");
    tdPid.textContent = log.pid;

    const tdThread = document.createElement("td");
    tdThread.textContent = log.thread;

    const tdMsg = document.createElement("td");
    tdMsg.textContent = log.message;

    tr.appendChild(tdLevel);
    tr.appendChild(tdTime);
    tr.appendChild(tdPid);
    tr.appendChild(tdThread);
    tr.appendChild(tdMsg);

    // click row to show details
    tr.addEventListener("click", () => {
      selectedLogId = log.id;
      updateDetails(log);
      // re-render to update highlight
      applyFilters();
    });

    logTableBody.appendChild(tr);
  });
}

// ---- update detail panel ----
function updateDetails(log) {
  if (!log) {
    detailLevel.textContent = "–";
    detailPid.textContent = "–";
    detailThread.textContent = "–";
    detailTime.textContent = "–";
    detailMessage.textContent = "–";
    detailExtra.textContent = "–";
    return;
  }

  detailLevel.textContent = log.level;
  detailPid.textContent = log.pid;
  detailThread.textContent = log.thread;
  detailTime.textContent = log.time;
  detailMessage.textContent = log.message;
  detailExtra.textContent = log.extra;
}

// ---- apply filters ----
function applyFilters() {
  const filtered = logs.filter((log) => {
    // level filter
    if (currentLevelFilter !== "ALL" && log.level !== currentLevelFilter) {
      return false;
    }

    // search in message
    if (currentSearchText) {
      const text = (log.message + " " + log.extra).toLowerCase();
      if (!text.includes(currentSearchText)) {
        return false;
      }
    }

    return true;
  });

  renderTable(filtered);

  // if nothing selected, show first item’s details
  if (!selectedLogId && filtered.length > 0) {
    selectedLogId = filtered[0].id;
    updateDetails(filtered[0]);
    renderTable(filtered);
  }
}

// ---- event: level buttons ----
levelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    levelButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentLevelFilter = btn.dataset.level;
    applyFilters();
  });
});

// ---- event: search ----
searchInput.addEventListener("input", () => {
  currentSearchText = searchInput.value.trim().toLowerCase();
  applyFilters();
});

// (optional) export + refresh just show alerts for now
document.getElementById("exportBtn").addEventListener("click", () => {
  alert("Export clicked (you can later make this download a file).");
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  alert("Refresh clicked (in real app this would reload logs).");
});

// ---- initial render ----
applyFilters();
updateDetails(null);
