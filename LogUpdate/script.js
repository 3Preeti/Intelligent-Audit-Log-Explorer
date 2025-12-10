// ===== SIMPLE JAVASCRIPT LOGIC =====

const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("file-input");
const selectedFiles = document.getElementById("selected-files");
const rawText = document.getElementById("raw-text");
const uploadButton = document.getElementById("upload-button");
const message = document.getElementById("message");
const history = document.getElementById("history");

let filesToUpload = []; // store selected files

function updateSelectedFilesText() {
  if (filesToUpload.length === 0) {
    selectedFiles.textContent = "No files selected yet.";
    return;
  }
  const names = filesToUpload.map((f) => f.name).join(", ");
  selectedFiles.innerHTML = `Selected file(s): <span>${names}</span>`;
}

uploadArea.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  filesToUpload = Array.from(event.target.files);
  updateSelectedFilesText();
});

uploadArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadArea.classList.remove("dragover");
  const droppedFiles = Array.from(event.dataTransfer.files);
  if (droppedFiles.length > 0) {
    filesToUpload = droppedFiles;
    updateSelectedFilesText();
  }
});

uploadButton.addEventListener("click", () => {
  const hasFiles = filesToUpload.length > 0;
  const hasRawText = rawText.value.trim().length > 0;

  if (!hasFiles && !hasRawText) {
    message.textContent = "Please select a file or paste some log text first.";
    return;
  }

  const normalize = document.getElementById("opt-timestamps").checked;
  const formatJson = document.getElementById("opt-json").checked;
  const detectSchema = document.getElementById("opt-schema").checked;

  const optionsUsed = [];
  if (normalize) optionsUsed.push("normalize timestamps");
  if (formatJson) optionsUsed.push("format JSON");
  if (detectSchema) optionsUsed.push("detect schema");
  const optionsText =
    optionsUsed.length > 0 ? optionsUsed.join(", ") : "no preprocessing";

  if (hasFiles) {
    filesToUpload.forEach((file) => {
      addHistoryItem(file.name, "uploaded file", optionsText);
    });
  }

  if (hasRawText) {
    addHistoryItem("raw log text", "pasted logs", optionsText);
  }

  message.innerHTML =
    "<strong>Upload simulated successfully.</strong> (In a real system, this is where we would send data to the backend.)";

  filesToUpload = [];
  fileInput.value = "";
  rawText.value = "";
  updateSelectedFilesText();
});

function addHistoryItem(name, type, optionsText) {
  const item = document.createElement("div");
  item.className = "history-item";

  const main = document.createElement("div");
  main.className = "history-main";

  const nameSpan = document.createElement("span");
  nameSpan.className = "history-name";
  nameSpan.textContent = name;

  const metaSpan = document.createElement("span");
  metaSpan.className = "history-meta";
  metaSpan.textContent = `Type: ${type} · Options: ${optionsText}`;

  main.appendChild(nameSpan);
  main.appendChild(metaSpan);

  const status = document.createElement("span");
  status.className = "status-badge status-success";
  status.textContent = "success";

  item.appendChild(main);
  item.appendChild(status);

  history.prepend(item);
}
