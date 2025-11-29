const playfield        = document.getElementById("playfield");
const zombieImg        = document.getElementById("z_img");
const startInput       = document.getElementById("start_time");
const startBtn         = document.getElementById("start_btn");
const initBtn          = document.getElementById("init_btn");
const modeButtons      = document.querySelectorAll(".mode-btn");
const difficultySelect = document.getElementById("difficulty");

const timeSpan    = document.querySelector(".last_time");
const counterSpan = document.querySelector(".counter");
const recordSpan  = document.querySelector(".record");
const ratioSpan   = document.querySelector(".ratio");
const rankSpan    = document.querySelector(".rank");

let timerId    = null;
let moveId     = null;
let duration   = 0;
let remaining  = 0;
let clicks     = 0;
let best       = 0;
let totalClicks = 0;

function getMoveInterval() {
  const diff = difficultySelect.value;
  if (diff === "easy")  return 900;
  if (diff === "hard")  return 700;
  return 800;
}

function getRank(cps) {
  if (cps < 3)  return "Slow Zombie";
  if (cps < 5)  return "Walker";
  if (cps < 7)  return "Hunter";
  if (cps < 9)  return "Exterminator";
  return "Demon Slayer";
}

function moveZombieRandom() {
  const fieldRect = playfield.getBoundingClientRect();
  const imgRect   = zombieImg.getBoundingClientRect();

  const maxX = fieldRect.width  - imgRect.width;
  const maxY = fieldRect.height - imgRect.height;

  const currentX = parseFloat(zombieImg.style.left) || maxX / 2;
  const currentY = parseFloat(zombieImg.style.top)  || maxY / 2;

  let minFactor;
  const diff = difficultySelect.value;
  if (diff === "easy")      minFactor = 0.4;
  else if (diff === "hard") minFactor = 0.8;
  else                      minFactor = 0.6;

  const diag    = Math.sqrt(maxX * maxX + maxY * maxY);
  const minDist = diag * minFactor;

  let x, y, tries = 0;
  while (true) {
    x = Math.random() * Math.max(maxX, 0);
    y = Math.random() * Math.max(maxY, 0);

    const dx   = x - currentX;
    const dy   = y - currentY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist >= minDist || tries > 20) break;
    tries++;
  }

  zombieImg.style.left = `${x}px`;
  zombieImg.style.top  = `${y}px`;
}

function startMovingZombie() {
  clearInterval(moveId);
  moveZombieRandom();
  moveId = setInterval(moveZombieRandom, getMoveInterval());
}

function stopMovingZombie() {
  clearInterval(moveId);
  moveId = null;
}

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const s = parseInt(btn.dataset.seconds, 10);
    startInput.value = s;

    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function startGame() {
  const value = parseInt(startInput.value, 10);
  if (!Number.isInteger(value) || value <= 0) {
    alert("Choose a time mode or enter a positive number of seconds.");
    return;
  }

  duration   = value;
  remaining  = value;
  clicks     = 0;
  totalClicks = 0;

  updateUI();

  startInput.disabled       = true;
  difficultySelect.disabled = true;
  modeButtons.forEach(b => b.disabled = true);

  clearInterval(timerId);
  timerId = setInterval(tick, 1000);

  startMovingZombie();
}

function tick() {
  remaining--;

  if (remaining <= 0) {
    remaining = 0;
    clearInterval(timerId);
    timerId = null;
    stopMovingZombie();

    if (clicks > best) best = clicks;

    updateUI();

    startInput.disabled       = false;
    difficultySelect.disabled = false;
    modeButtons.forEach(b => b.disabled = false);

    const cps  = duration > 0 ? (clicks / duration) : 0;
    const rank = getRank(cps);

    alert(
      `You shot ${clicks} times in ${duration} seconds.\n` +
      `CPS: ${cps.toFixed(2)}\n` +
      `Rank: ${rank}`
    );
    return;
  }

  updateUI();
}

function initializeGame() {
  clearInterval(timerId);
  timerId = null;
  stopMovingZombie();

  duration   = 0;
  remaining  = 0;
  clicks     = 0;
  totalClicks = 0;

  updateUI();

  startInput.value          = "";
  startInput.disabled       = false;
  difficultySelect.disabled = false;
  modeButtons.forEach(b => {
    b.disabled = false;
    b.classList.remove("active");
  });
}

function updateUI() {
  timeSpan.textContent    = remaining;
  counterSpan.textContent = clicks;
  recordSpan.textContent  = best;

  const cps = duration > 0 ? (clicks / duration) : 0;
  ratioSpan.textContent = cps.toFixed(2);
  rankSpan.textContent  = getRank(cps);
}

zombieImg.addEventListener("click", (e) => {
  if (remaining <= 0 || !timerId) return;

  clicks++;
  totalClicks++;

  updateUI();
  e.stopPropagation();
});

playfield.addEventListener("click", () => {
  if (remaining <= 0 || !timerId) return;

  totalClicks++;
});

startBtn.addEventListener("click", startGame);
initBtn.addEventListener("click", initializeGame);
