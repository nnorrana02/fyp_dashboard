/**********************************************
 * script-npk.js – Read ALL NPK readings
 **********************************************/

// Firebase config (same as ESP32 project)
const firebaseConfig = {
  apiKey: "AIzaSyBWcttqdKlnhghQ6Bd1vqWVR3uPaic2h3M",
  authDomain: "esp32-go2green.firebaseapp.com",
  databaseURL: "https://esp32-go2green-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-go2green",
  storageBucket: "esp32-go2green.firebasestorage.app",
  messagingSenderId: "269329530320",
  appId: "1:269329530320:web:5ea15eebf94262cf514dd5",
  measurementId: "G-8GG25Y0KD4"
};

// Initialise Firebase for this page
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// DOM elements
const npkStatus = document.getElementById("npk-status");
const npkMeta = document.getElementById("npk-meta");
const npkTableContainer = document.getElementById("npk-table");

function fmt(value) {
  if (value === undefined || value === null || value === "") return "–";
  return Number(value).toFixed(2);
}

function readAllNpk() {
  npkStatus.textContent = "Reading ALL NPK data from Firebase...";

  db.ref("npk_reading").once("value")
    .then((snapshot) => {
      if (!snapshot.exists()) {
        npkStatus.textContent = "No NPK data found.";
        npkTableContainer.innerHTML =
          "<p class='placeholder'>No data under npk_reading.</p>";
        return;
      }

      const allData = [];
      snapshot.forEach((child) => {
        const timestamp = child.key;
        const val = child.val();
        allData.push({
          timestamp,
          N: val.Nitrogen ?? val.N,
          P: val.Phosphorous ?? val.P,
          K: val.Potassium ?? val.K
        });
      });

      allData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      console.table(allData);

      npkStatus.textContent = `Total NPK records found: ${allData.length}`;
      npkMeta.textContent = "Table 1.1 lists all readings from the experiment.";

      renderNpkTable(allData);
    })
    .catch((err) => {
      console.error("Error reading NPK:", err);
      npkStatus.textContent = "Error reading NPK (see console).";
      npkTableContainer.innerHTML =
        "<p class='placeholder'>Error loading table.</p>";
    });
}

function renderNpkTable(data) {
  let html = `
    <table>
      <tr>
        <th>Timestamp</th>
        <th>N (mg/kg)</th>
        <th>P (mg/kg)</th>
        <th>K (mg/kg)</th>
      </tr>
  `;

  data.forEach((row) => {
    html += `
      <tr>
        <td>${row.timestamp}</td>
        <td>${fmt(row.N)}</td>
        <td>${fmt(row.P)}</td>
        <td>${fmt(row.K)}</td>
      </tr>
    `;
  });

  html += "</table>";
  npkTableContainer.innerHTML = html;
}

// Run after DOM ready
document.addEventListener("DOMContentLoaded", readAllNpk);
