/********************************************
 * main.js – auth guard + logout
 ********************************************/

const LOGIN_KEY = "fypLoggedIn";

// If user not logged in → send to login page
if (localStorage.getItem(LOGIN_KEY) !== "1") {
  window.location.href = "login.html";
} else {
  // Attach logout handler if button exists
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(LOGIN_KEY);
      window.location.href = "login.html";
    });
  }
}
