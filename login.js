/********************************************
 * login.js – simple front-end login (FINAL)
 ********************************************/

const ALLOWED_EMAIL = "nnorrana02@gmail.com";
const ALLOWED_PASSWORD = "123456789";

const LOGIN_KEY = "fypLoggedIn";
const RETURN_URL_KEY = "fypReturnUrl";
const REMEMBER_EMAIL_KEY = "fypRememberEmail";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const errorEl = document.getElementById("login-error");

  // optional checkbox (works if exists)
  const rememberCheckbox =
    document.getElementById("remember") ||
    document.getElementById("remember-me") ||
    document.getElementById("rememberMe");

  // If already logged in → go to index (or back to last protected page)
  if (localStorage.getItem(LOGIN_KEY) === "1") {
    const returnUrl = localStorage.getItem(RETURN_URL_KEY);
    window.location.replace(returnUrl || "index.html");
    return;
  }

  // Prefill remembered email
  const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
  if (rememberedEmail && emailInput) {
    emailInput.value = rememberedEmail;
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim();
    const password = passInput.value;

    if (email === ALLOWED_EMAIL && password === ALLOWED_PASSWORD) {
      localStorage.setItem(LOGIN_KEY, "1");

      // Remember email only
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      // go back to the page user wanted (roots/analysis), else index
      const returnUrl = localStorage.getItem(RETURN_URL_KEY);
      localStorage.removeItem(RETURN_URL_KEY);

      window.location.replace(returnUrl || "index.html");
    } else {
      if (errorEl) errorEl.textContent = "Invalid email or password.";
    }
  });
});
