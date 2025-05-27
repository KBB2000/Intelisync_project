const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const resetForm = document.getElementById("resetForm");
const newPasswordForm = document.getElementById("newPasswordForm");
const emailVerifyForm = document.getElementById("emailVerifyForm");

const registerError = document.getElementById("registerError");
const loginError = document.getElementById("loginError");
const resetError = document.getElementById("resetError");
const newPassError = document.getElementById("newPassError");

let registeredUser = JSON.parse(localStorage.getItem("user")) || null;

function toggleForm(formType) {
  document.querySelectorAll('.register-container').forEach(container => {
    container.classList.add('hidden');
  });
  
  registerForm.classList.add("hidden");
  loginForm.classList.add("hidden");
  resetForm.classList.add("hidden");
  newPasswordForm.classList.add("hidden");

  if (formType === "register") {
    registerForm.classList.remove("hidden");
    registerForm.closest('.register-container').classList.remove('hidden');
  } else if (formType === "login") {
    loginForm.classList.remove("hidden");
    loginForm.closest('.register-container').classList.remove('hidden');
  } else if (formType === "reset") {
    resetForm.classList.remove("hidden");
    resetForm.closest('.register-container').classList.remove('hidden');
  } else if (formType === "new-password") {
    newPasswordForm.classList.remove("hidden");
    newPasswordForm.closest('.register-container').classList.remove('hidden');
  } else if (formType === "verify") {
    emailVerifyForm.classList.remove('hidden');
  }

  registerError.textContent = "";
  loginError.textContent = "";
  resetError.textContent = "";
  newPassError.textContent = "";
}

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm-password").value;
  const terms = document.getElementById("terms").checked;

  if (!name || !email || !password || !confirm) {
    registerError.textContent = "All fields are required.";
    return;
  }

  if (password !== confirm) {
    registerError.textContent = "Passwords do not match.";
    return;
  }

  if (!terms) {
    registerError.textContent = "You must agree to the terms.";
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  registeredUser = user;

  alert("Registration successful!");
  toggleForm("login"); // Go to login page after successful registration
});

// LOGIN
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    loginError.textContent = "Email and password are required.";
    return;
  }

  if (!registeredUser || registeredUser.email !== email || registeredUser.password !== password) {
    loginError.textContent = "Invalid email or password.";
    return;
  }

  // Redirect to dashboard after successful login
  window.location.href = 'dashboard.html';
});

// RESET PASSWORD (simulate sending email)
resetForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("reset-email").value.trim();

  if (!email) {
    resetError.textContent = "Email is required.";
    return;
  }

  if (!registeredUser || registeredUser.email !== email) {
    resetError.textContent = "Email not found.";
    return;
  }

  toggleForm("new-password"); // Go to set new password form
});

// SET NEW PASSWORD
newPasswordForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-new-password").value;

  if (!newPassword || !confirmPassword) {
    newPassError.textContent = "Both fields are required.";
    return;
  }

  if (newPassword !== confirmPassword) {
    newPassError.textContent = "Passwords do not match.";
    return;
  }

  // Update password in local storage
  registeredUser.password = newPassword;
  localStorage.setItem("user", JSON.stringify(registeredUser));

  toggleForm("verify"); // Show verify email section after setting new password
});

// RESEND EMAIL (just a dummy action)
function resendEmail() {
  // Hide all containers
  document.querySelectorAll('.register-container').forEach(container => {
    container.classList.add('hidden');
  });

  // Show success form
  document.getElementById('resetSuccessForm').classList.remove('hidden');
}
