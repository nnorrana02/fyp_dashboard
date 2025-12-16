/**************************************************
 * particles.js - simple falling particles
 * Works like snow / floating dust effect
 **************************************************/

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = window.innerWidth);
let H = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const PARTICLE_COUNT = 80;
const particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle() {
  return {
    x: rand(0, W),
    y: rand(-H, 0),
    r: rand(1, 3.5),
    speedY: rand(0.6, 1.8),
    driftX: rand(-0.4, 0.4),
    alpha: rand(0.15, 0.45),
  };
}

// init
for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

function draw() {
  ctx.clearRect(0, 0, W, H);

  // soft particles (white-ish)
  for (const p of particles) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // update
    p.y += p.speedY;
    p.x += p.driftX;

    // wrap
    if (p.y > H + 10) {
      p.y = rand(-80, -10);
      p.x = rand(0, W);
    }
    if (p.x < -10) p.x = W + 10;
    if (p.x > W + 10) p.x = -10;
  }

  requestAnimationFrame(draw);
}

draw();
