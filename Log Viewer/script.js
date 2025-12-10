// Sample Log Data
const allLogs = [
  { level: "ERROR", timestamp: "2024-12-09 14:35:22", pid: 2847, thread: "WorkerThread-5", message: "Database connection timeout after 30 seconds" },
  { level: "WARN", timestamp: "2024-12-09 14:35:23", pid: 2848, thread: "WorkerThread-6", message: "Slow query detected (2.3s execution time)" },
  { level: "INFO", timestamp: "2024-12-09 14:35:24", pid: 2849, thread: "WorkerThread-7", message: "Cache cleared successfully" },
  { level: "ERROR", timestamp: "2024-12-09 14:35:25", pid: 2850, thread: "MainThread", message: "Failed to process request from client IP 192.168.1.100" },
  { level: "DEBUG", timestamp: "2024-12-09 14:35:26", pid: 2851, thread: "WorkerThread-1", message: "Debugging mode enabled for module: UserService" },
  { level: "INFO", timestamp: "2024-12-09 14:35:27", pid: 2852, thread: "WorkerThread-2", message: "Application startup completed" },
  { level: "WARN", timestamp: "2024-12-09 14:35:28", pid: 2853, thread: "WorkerThread-3", message: "Memory usage exceeded 80% threshold" },
  { level: "ERROR", timestamp: "2024-12-09 14:35:29", pid: 2854, thread: "WorkerThread-4", message: "Configuration file not found at expected location" },
  { level: "INFO", timestamp: "2024-12-09 14:35:30", pid: 2855, thread: "WorkerThread-5", message: "User authentication successful" },
  { level: "DEBUG", timestamp: "2024-12-09 14:35:31", pid: 2856, thread: "WorkerThread-6", message: "Trace: Entering AuthenticationManager.validate()" }
];

let currentPage = 1;
const logsPerPage = 10;
let filteredLogs = [...allLogs];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  attachEventListeners();
  displayLogs();
});

// Attach Event Listeners
function attachEventListeners() {
  document.getElementById('searchInput').addEventListener('keyup', filterLogs);
  document.getElementById('levelSelect').addEventListener('change', filterLogs);
  document.getElementById('prevBtn').addEventListener('click', previousPage);
  document.getElementById('nextBtn').addEventListener('click', nextPage);
}

// Filter Logs
function filterLogs() {
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  const levelFilter = document.getElementById('levelSelect').value;

  filteredLogs = allLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchText) || 
                         log.timestamp.includes(searchText) ||
                         log.thread.toLowerCase().includes(searchText);
    const matchesLevel = levelFilter === '' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  currentPage = 1;
  displayLogs();
}

// Display Logs
function displayLogs() {
  const tbody = document.getElementById('logsTableBody');
  tbody.innerHTML = '';

  const startIdx = (currentPage - 1) * logsPerPage;
  const endIdx = startIdx + logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIdx, endIdx);

  paginatedLogs.forEach(log => {
    const row = document.createElement('tr');
    const levelClass = log.level.toLowerCase();
    row.innerHTML = `
      <td><span class="level-badge ${levelClass}">${log.level}</span></td>
      <td class="timestamp">${log.timestamp}</td>
      <td>${log.pid}</td>
      <td>${log.thread}</td>
      <td class="message">${log.message}</td>
    `;
    row.addEventListener('click', () => viewLogDetails(log));
    tbody.appendChild(row);
  });

  updateFooter();
  updatePaginationButtons();
}

// View Log Details
function viewLogDetails(log) {
  // Open log detail viewer (can be popup or navigate to detail page)
  console.log('Log details:', log);
  alert(`Log Details:\nLevel: ${log.level}\nTime: ${log.timestamp}\nPID: ${log.pid}\nThread: ${log.thread}\nMessage: ${log.message}`);
}

// Update Footer
function updateFooter() {
  const footerInfo = document.getElementById('footerInfo');
  footerInfo.textContent = `Total Logs: ${filteredLogs.length}`;
}

// Update Pagination Buttons
function updatePaginationButtons() {
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const pageInfo = document.getElementById('pageInfo');
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
}

// Previous Page
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayLogs();
    window.scrollTo(0, 0);
  }
}

// Next Page
function nextPage() {
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayLogs();
    window.scrollTo(0, 0);
  }
}
