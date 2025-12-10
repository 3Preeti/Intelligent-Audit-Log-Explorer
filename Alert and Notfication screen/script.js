// --------------------------
// 1. Sample data
// --------------------------

// We start with a couple of example alerts.
let alerts = [
  {
    id: 1,
    name: "High error rate",
    severity: "critical",
    conditionText: "More than 100 errors in 5 minutes",
    channels: ["Email", "On-screen alert"]
  },
  {
    id: 2,
    name: "Unauthorized access",
    severity: "warning",
    conditionText: "Multiple failed logins from same IP",
    channels: ["Email", "Slack / Webhook"]
  }
];

let nextId = 3;

// --------------------------
// 2. Get DOM elements
// --------------------------
const alertForm = document.getElementById("alertForm");
const alertNameInput = document.getElementById("alertName");
const severitySelect = document.getElementById("severitySelect");
const ruleTypeSelect = document.getElementById("ruleTypeSelect");

// condition inputs
const errorCountInput = document.getElementById("errorCountInput");
const errorWindowInput = document.getElementById("errorWindowInput");
const errorTextInput = document.getElementById("errorTextInput");
const accessPatternInput = document.getElementById("accessPatternInput");

// condition sections
const conditionTooMany = document.querySelector(".condition-tooManyErrors");
const conditionSpecific = document.querySelector(".condition-specificError");
const conditionUnauthorized = document.querySelector(
  ".condition-unauthorizedAccess"
);

// channel checkboxes
const emailCheckbox = document.getElementById("emailCheckbox");
const slackCheckbox = document.getElementById("slackCheckbox");
const onscreenCheckbox = document.getElementById("onscreenCheckbox");

const resetFormBtn = document.getElementById("resetFormBtn");
const alertsTableBody = document.getElementById("alertsTableBody");
const previewText = document.getElementById("previewText");

// --------------------------
// 3. Helpers
// --------------------------

// Show / hide condition fields depending on selected rule type
function updateConditionVisibility() {
  const type = ruleTypeSelect.value;

  conditionTooMany.classList.add("hidden");
  conditionSpecific.classList.add("hidden");
  conditionUnauthorized.classList.add("hidden");

  if (type === "tooManyErrors") {
    conditionTooMany.classList.remove("hidden");
  } else if (type === "specificError") {
    conditionSpecific.classList.remove("hidden");
  } else if (type === "unauthorizedAccess") {
    conditionUnauthorized.classList.remove("hidden");
  }
}

// Build a readable condition description string
function buildConditionText() {
  const type = ruleTypeSelect.value;

  if (type === "tooManyErrors") {
    const count = errorCountInput.value || 0;
    const window = errorWindowInput.value || 0;
    return `More than ${count} errors in ${window} minutes`;
  }

  if (type === "specificError") {
    const text = errorTextInput.value.trim() || "specific error message";
    return `When error message contains "${text}"`;
  }

  if (type === "unauthorizedAccess") {
    const pattern =
      accessPatternInput.value.trim() ||
      "repeated failed logins / suspicious access";
    return `Detected unauthorized access pattern: ${pattern}`;
  }

  return "";
}

// Turn severity string into CSS class and label
function getSeverityBadge(severity) {
  const span = document.createElement("span");
  span.classList.add("badge", severity);
  span.textContent =
    severity === "critical"
      ? "Critical"
      : severity === "warning"
      ? "Warning"
      : "Info";
  return span;
}

// Join channels into a readable string
function channelsToString(channels) {
  return channels.join(", ");
}

// --------------------------
// 4. Render alerts table
// --------------------------
function renderAlerts() {
  alertsTableBody.innerHTML = "";

  alerts.forEach((alert) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = alert.name;

    const conditionTd = document.createElement("td");
    conditionTd.textContent = alert.conditionText;

    const channelsTd = document.createElement("td");
    channelsTd.textContent = channelsToString(alert.channels);

    const severityTd = document.createElement("td");
    const badge = getSeverityBadge(alert.severity);
    severityTd.appendChild(badge);

    const actionsTd = document.createElement("td");

    // Preview button
    const previewBtn = document.createElement("button");
    previewBtn.textContent = "Preview";
    previewBtn.classList.add("btn", "btn-icon");
    previewBtn.addEventListener("click", () => {
      showPreview(alert);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-icon");
    deleteBtn.addEventListener("click", () => {
      deleteAlert(alert.id);
    });

    actionsTd.appendChild(previewBtn);
    actionsTd.appendChild(deleteBtn);

    tr.appendChild(nameTd);
    tr.appendChild(conditionTd);
    tr.appendChild(channelsTd);
    tr.appendChild(severityTd);
    tr.appendChild(actionsTd);

    alertsTableBody.appendChild(tr);
  });

  if (alerts.length === 0) {
    previewText.textContent = "No active alerts. Create one on the left.";
  }
}

// --------------------------
// 5. Preview notification
// --------------------------
function showPreview(alert) {
  const channelText = channelsToString(alert.channels);
  previewText.textContent =
    `[${alert.name}] would send a notification via ${channelText}. ` +
    `Condition: ${alert.conditionText}.`;
}

// --------------------------
// 6. CRUD actions
// --------------------------

// Add new alert from form
alertForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop page refresh

  const name = alertNameInput.value.trim();
  if (!name) {
    alert("Please give your alert a name.");
    return;
  }

  const severity = severitySelect.value;
  const conditionText = buildConditionText();

  const channels = [];
  if (emailCheckbox.checked) channels.push("Email");
  if (slackCheckbox.checked) channels.push("Slack / Webhook");
  if (onscreenCheckbox.checked) channels.push("On-screen alert");

  if (channels.length === 0) {
    alert("Select at least one notification channel.");
    return;
  }

  const newAlert = {
    id: nextId++,
    name,
    severity,
    conditionText,
    channels
  };

  alerts.push(newAlert);
  renderAlerts();
  showPreview(newAlert);
  alertForm.reset();
  // default some checkboxes again
  emailCheckbox.checked = true;
});

// Delete alert
function deleteAlert(id) {
  alerts = alerts.filter((a) => a.id !== id);
  renderAlerts();
}

// Clear form button
resetFormBtn.addEventListener("click", () => {
  alertForm.reset();
  emailCheckbox.checked = true;
  slackCheckbox.checked = false;
  onscreenCheckbox.checked = false;
});

// Update condition fields when type changes
ruleTypeSelect.addEventListener("change", updateConditionVisibility);

// --------------------------
// 7. Initial render
// --------------------------
updateConditionVisibility();
renderAlerts();
