/********************************************
 * login.js – simple front-end login
 * Allowed user:
 *   email:    nnorrana02@gmail.com
 *   password: 123456789
 ********************************************/

const ALLOWED_EMAIL = "nnorrana02@gmail.com";
const ALLOWED_PASSWORD = "123456789";
const LOGIN_KEY = "fypLoggedIn";

// If already logged in, go straight to dashboard
if (localStorage.getItem(LOGIN_KEY) === "1") {
  window.location.href = "index.html";
}

const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const errorBox = document.getElementById("login-error");

function setLoading(isLoading) {
  loginBtn.disabled = isLoading;
  loginBtn.textContent = isLoading ? "Checking..." : "Login";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorBox.textContent = "";

  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (email === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
    setLoading(true);

    // store login flag
    localStorage.setItem(LOGIN_KEY, "1");

    // optional: you can store name/email if you want later
    window.location.href = "index.html";
  } else {
    errorBox.textContent = "Invalid email or password.";
  }
});
