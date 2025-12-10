// Very small, readable JS for mobile UI interactions

// Retention: enable custom days if chosen
const retention = document.getElementById('retention');
const customDays = document.getElementById('custom-days');
const saveRetentionBtn = document.getElementById('save-retention');

retention.addEventListener('change', () => {
  customDays.disabled = retention.value !== 'custom';
  if (retention.value !== 'custom') customDays.value = '';
});
saveRetentionBtn.addEventListener('click', () => {
  const val = retention.value === 'custom' ? (customDays.value || 'N/A') + ' days (custom)' : retention.options[retention.selectedIndex].text;
  alert('Retention saved: ' + val);
});

// Add user (UI only)
const addUserBtn = document.getElementById('add-user-btn');
const usersList = document.getElementById('users-list');

addUserBtn.addEventListener('click', () => {
  const email = document.getElementById('new-user').value.trim();
  const role = document.getElementById('new-role').value;
  if (!email) { alert('Please enter an email'); return; }
  const div = document.createElement('div');
  div.className = 'list-item';
  div.textContent = email + ' (' + role + ')';
  usersList.appendChild(div);
  document.getElementById('new-user').value = '';
});

// API key reveal / copy / regenerate
const apiKeyBox = document.getElementById('api-key');
const revealBtn = document.getElementById('reveal-key');
const copyBtn = document.getElementById('copy-key');
const regenBtn = document.getElementById('regenerate');

revealBtn.addEventListener('click', () => {
  if (revealBtn.textContent === 'Show') {
    apiKeyBox.textContent = 'sk_live_12345_example_key';
    revealBtn.textContent = 'Hide';
  } else {
    apiKeyBox.textContent = 'sk_live_************ABCD';
    revealBtn.textContent = 'Show';
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(apiKeyBox.textContent);
    alert('API key copied');
  } catch {
    alert('Copy not supported');
  }
});

regenBtn.addEventListener('click', () => {
  if (confirm('Regenerate API key?')) {
    apiKeyBox.textContent = 'sk_live_' + Math.random().toString(36).slice(2,10);
    revealBtn.textContent = 'Hide';
  }
});

// Theme toggle (persist minimal)
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

function applyTheme(t) {
  if (t === 'dark') {
    document.documentElement.style.setProperty('--bg', '#0b0d12');
    document.documentElement.style.setProperty('--card', '#0f1115');
    document.documentElement.style.setProperty('--text', '#f4f6fb');
    document.documentElement.style.setProperty('--muted', '#9aa3b2');
    themeLabel.textContent = 'Dark';
    localStorage.setItem('theme', 'dark');
  } else {
    // restore defaults
    document.documentElement.style.removeProperty('--bg');
    document.documentElement.style.removeProperty('--card');
    document.documentElement.style.removeProperty('--text');
    document.documentElement.style.removeProperty('--muted');
    themeLabel.textContent = 'Light';
    localStorage.setItem('theme', 'light');
  }
}
themeToggle.addEventListener('click', () => {
  const cur = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
});
// init theme
applyTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

// Save / cancel (mock)
document.getElementById('save-all').addEventListener('click', () => alert('All settings saved (mock).'));
document.getElementById('cancel').addEventListener('click', () => {
  if (confirm('Discard changes?')) location.reload();
});
