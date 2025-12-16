/********************************************
 * main.js – auth guard + logout (FINAL)
 ********************************************/

const LOGIN_KEY = "fypLoggedIn";
const RETURN_URL_KEY = "fypReturnUrl";

(function () {
  const path = window.location.pathname.toLowerCase();
  const isLoginPage = path.endsWith("/login.html") || path.endsWith("login.html");

  // If you accidentally include main.js on login.html, do nothing.
  if (isLoginPage) return;

  // ✅ Auth guard: if not logged in, send to login and remember where user wanted to go
  if (localStorage.getItem(LOGIN_KEY) !== "1") {
    localStorage.setItem(RETURN_URL_KEY, window.location.href);
    window.location.replace("login.html");
    return;
  }

  // ✅ Logout (works on every page that has id="logout-btn")
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(LOGIN_KEY);
      localStorage.removeItem(RETURN_URL_KEY);
      window.location.replace("login.html");
    });
  }
})();
