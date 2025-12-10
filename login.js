// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = togglePassword.querySelector('.eye-icon');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  // Toggle eye icon (open/closed)
  if (type === 'password') {
    // Show closed eye when password is hidden
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  } else {
    // Show open eye when password is visible
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  }
});

// Form submission with validation
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Simple validation (you can customize this)
  const validEmail = 'admin@example.com';
  const validPassword = 'password123';
  
  if (email === validEmail && password === validPassword) {
    // Success - redirect to dashboard
    errorMessage.style.display = 'none';
    localStorage.setItem('userEmail', email);
    window.location.href = '../Dashboard/Dashboard.html';
  } else {
    // Show error message
    errorMessage.style.display = 'block';
    
    // Shake animation
    errorMessage.style.animation = 'none';
    setTimeout(() => {
      errorMessage.style.animation = 'shake 0.3s ease';
    }, 10);
  }
});

// Hide error message when user starts typing
emailInput.addEventListener('input', () => {
  errorMessage.style.display = 'none';
});

passwordInput.addEventListener('input', () => {
  errorMessage.style.display = 'none';
});
