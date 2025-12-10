// --- 1. Sample log data (small & simple) ---
const logs = [
  {
    id: 1,
    timestamp: "2025-12-08 09:15:00",
    level: "ERROR",
    module: "AuthService",
    message: "Login failed for user-101",
    tags: ["auth", "login", "security"],
    details: "Invalid password. IP: 10.0.0.12"
  },
  {
    id: 2,
    timestamp: "2025-12-08 09:16:10",
    level: "INFO",
    module: "AuthService",
    message: "User user-102 logged in",
    tags: ["auth", "login"],
    details: "New session created."
  },
  {
    id: 3,
    timestamp: "2025-12-08 09:20:30",
    level: "WARN",
    module: "PaymentService",
    message: "Payment gateway timeout",
    tags: ["payment", "timeout"],
    details: "Stripe did not respond within 3s."
  },
  {
    id: 4,
    timestamp: "2025-12-08 09:21:00",
    level: "ERROR",
    module: "PaymentService",
    message: "Charge failed for order #4321",
    tags: ["payment", "failure"],
    details: "User: user-201, Amount: 29.99"
  },
  {
    id: 5,
    timestamp: "2025-12-08 09:25:45",
    level: "INFO",
    module: "NotificationService",
    message: "Welcome email sent",
    tags: ["notification", "email"],
    details: "Template: welcome_v2"
  },
  {
    id: 6,
    timestamp: "2025-12-08 09:26:15",
    level: "DEBUG",
    module: "AuthService",
    message: "Refreshing access token",
    tags: ["auth", "token"],
    details: "Refresh token used for user-101"
  }
];

// --- 2. Get DOM elements ---
const logsTableBody = document.getElementById("logsTableBody");
const resultsInfo = document.getElementById("resultsInfo");

const levelFilter = document.getElementById("levelFilter");
const moduleFilter = document.getElementById("moduleFilter");
const searchFilter = document.getElementById("searchFilter");
const resetBtn = document.getElementById("resetBtn");

const summaryText = document.getElementById("summaryText");
const levelStats = document.getElementById("levelStats");
const moduleStats = document.getElementById("moduleStats");

// --- 3. Render logs into the table ---
function renderLogs(logList) {
  logsTableBody.innerHTML = "";

  logList.forEach((log) => {
    const tr = document.createElement("tr");
    tr.classList.add("log-row");

    const tdTime = document.createElement("td");
    tdTime.textContent = log.timestamp;

    const tdLevel = document.createElement("td");
    const levelSpan = document.createElement("span");
    levelSpan.textContent = log.level;
    levelSpan.classList.add("level-badge", `level-${log.level}`);
    tdLevel.appendChild(levelSpan);

    const tdModule = document.createElement("td");
    tdModule.textContent = log.module;

    const tdMessage = document.createElement("td");
    tdMessage.textContent = log.message;

    const tdTags = document.createElement("td");
    log.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.classList.add("tag-pill");
      tagSpan.textContent = tag;
      tdTags.appendChild(tagSpan);
    });

    // When you click a row, show details in an alert (simple)
    tr.addEventListener("click", () => {
      alert(
        `Details for log #${log.id}\n\n` +
        `Time: ${log.timestamp}\n` +
        `Level: ${log.level}\n` +
        `Module: ${log.module}\n\n` +
        `${log.details}`
      );
    });

    tr.appendChild(tdTime);
    tr.appendChild(tdLevel);
    tr.appendChild(tdModule);
    tr.appendChild(tdMessage);
    tr.appendChild(tdTags);

    logsTableBody.appendChild(tr);
  });

  resultsInfo.textContent = `Showing ${logList.length} log(s)`;
}

// --- 4. Apply filters ---
function applyFilters() {
  const levelValue = levelFilter.value;
  const moduleValue = moduleFilter.value;
  const searchText = searchFilter.value.trim().toLowerCase();

  const filtered = logs.filter((log) => {
    // level
    if (levelValue !== "ALL" && log.level !== levelValue) {
      return false;
    }

    // module
    if (moduleValue !== "ALL" && log.module !== moduleValue) {
      return false;
    }

    // search
    if (searchText) {
      const combined =
        (log.message + " " + log.tags.join(" ")).toLowerCase();
      if (!combined.includes(searchText)) {
        return false;
      }
    }

    return true;
  });

  renderLogs(filtered);
  updateInsights(filtered);
}

// --- 5. Simple "AI" / insights panel ---
function updateInsights(list) {
  if (list.length === 0) {
    summaryText.textContent = "No logs for current filters.";
    levelStats.innerHTML = "";
    moduleStats.innerHTML = "";
    return;
  }

  const total = list.length;

  const levelCount = {};
  const moduleCount = {};

  list.forEach((log) => {
    levelCount[log.level] = (levelCount[log.level] || 0) + 1;
    moduleCount[log.module] = (moduleCount[log.module] || 0) + 1;
  });

  const errors = levelCount["ERROR"] || 0;
  const warns = levelCount["WARN"] || 0;

  let summary = `Analyzing ${total} log(s). `;
  if (errors > 0) {
    summary += `There are ${errors} error(s). `;
  }
  if (warns > 0) {
    summary += `And ${warns} warning(s). `;
  }
  if (errors === 0 && warns === 0) {
    summary += "No major issues detected.";
  }
  summaryText.textContent = summary;

  levelStats.innerHTML = "";
  Object.keys(levelCount).forEach((level) => {
    const pill = document.createElement("span");
    pill.classList.add("stat-pill");
    pill.textContent = `${level}: ${levelCount[level]}`;
    levelStats.appendChild(pill);
  });

  moduleStats.innerHTML = "";
  Object.keys(moduleCount).forEach((module) => {
    const pill = document.createElement("span");
    pill.classList.add("stat-pill");
    pill.textContent = `${module}: ${moduleCount[module]}`;
    moduleStats.appendChild(pill);
  });
}

// --- 6. Hook up events ---
[levelFilter, moduleFilter, searchFilter].forEach((el) => {
  el.addEventListener("input", applyFilters);
});

resetBtn.addEventListener("click", () => {
  levelFilter.value = "ALL";
  moduleFilter.value = "ALL";
  searchFilter.value = "";
  applyFilters();
});

// --- 7. Initial load ---
renderLogs(logs);
updateInsights(logs);
