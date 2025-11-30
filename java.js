// Récupération des éléments du DOM (zone de jeu, zombie, inputs, boutons, etc.)
const playfield        = document.getElementById("playfield");
const zombieImg        = document.getElementById("z_img");
const startInput       = document.getElementById("start_time");
const startBtn         = document.getElementById("start_btn");
const initBtn          = document.getElementById("init_btn");
const modeButtons      = document.querySelectorAll(".mode-btn");
const difficultySelect = document.getElementById("difficulty");

// Zones de texte pour afficher le temps, les scores et le rang
const timeSpan    = document.querySelector(".last_time");
const counterSpan = document.querySelector(".counter");
const recordSpan  = document.querySelector(".record");
const ratioSpan   = document.querySelector(".ratio");
const rankSpan    = document.querySelector(".rank");

// Sons : tir réussi, musique de fond, clic sur les boutons
const hitSound = document.getElementById("hitSound");
const bgMusic  = document.getElementById("bgMusic");
const btnSound = document.getElementById("btnSound");

// Bouton qui contrôle la musique (lecture / pause)
const muteBtn = document.getElementById("mute_btn");

// Tous les boutons de la page (start, init, modes, musique, etc.)
const allButtons = document.querySelectorAll("button");

// Variables d’état du jeu
let timerId     = null;
let moveId      = null;
let duration    = 0;
let remaining   = 0;
let clicks      = 0;
let best        = 0;
let totalClicks = 0;

// Retourne l’intervalle de déplacement du zombie selon la difficulté
function getMoveInterval() {
  const diff = difficultySelect.value;
  if (diff === "easy") return 900;  // zombie plus lent (bouge moins souvent)
  if (diff === "hard") return 450;  // zombie plus rapide (bouge plus souvent)
  return 600;                       // medium par défaut
}

// Donne un rang texte en fonction des clics par seconde (CPS)
function getRank(cps) {
  if (cps < 3) return "Slow Zombie";
  if (cps < 5) return "Walker";
  if (cps < 7) return "Hunter";
  if (cps < 9) return "Exterminator";
  return "Demon Slayer";
}

// Choisit une nouvelle position aléatoire pour le zombie (distance 100% aléatoire)
function moveZombieRandom() {
  const fieldRect = playfield.getBoundingClientRect();
  const imgRect   = zombieImg.getBoundingClientRect();

  const maxX = fieldRect.width  - imgRect.width;
  const maxY = fieldRect.height - imgRect.height;

  const x = Math.random() * Math.max(maxX, 0);
  const y = Math.random() * Math.max(maxY, 0);

  zombieImg.style.left = `${x}px`;
  zombieImg.style.top  = `${y}px`;
}

// Lance le déplacement régulier du zombie
function startMovingZombie() {
  clearInterval(moveId);
  moveZombieRandom();
  moveId = setInterval(moveZombieRandom, getMoveInterval());
}

// Arrête le déplacement du zombie
function stopMovingZombie() {
  clearInterval(moveId);
  moveId = null;
}

// Gestion des boutons de modes (5s, 10s, 30s, 60s)
modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const s = parseInt(btn.dataset.seconds, 10);
    startInput.value = s;

    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Démarre une nouvelle partie
function startGame() {
  const value = parseInt(startInput.value, 10);
  if (!Number.isInteger(value) || value <= 0) {
    alert("Choose a time mode or enter a positive number of seconds.");
    return;
  }

  // Pas de démarrage auto de la musique ici

  duration    = value;
  remaining   = value;
  clicks      = 0;
  totalClicks = 0;

  updateUI();

  startInput.disabled       = true;
  difficultySelect.disabled = true;
  modeButtons.forEach(b => b.disabled = true);

  clearInterval(timerId);
  timerId = setInterval(tick, 1000);

  startMovingZombie();
}

// Fonction appelée chaque seconde pendant la partie
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

// Réinitialise complètement le jeu
function initializeGame() {
  clearInterval(timerId);
  timerId = null;
  stopMovingZombie();

  duration    = 0;
  remaining   = 0;
  clicks      = 0;
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

// Met à jour tous les affichages (temps, score, record, CPS, rang)
function updateUI() {
  timeSpan.textContent    = remaining;
  counterSpan.textContent = clicks;
  recordSpan.textContent  = best;

  const cps = duration > 0 ? (clicks / duration) : 0;
  ratioSpan.textContent = cps.toFixed(2);
  rankSpan.textContent  = getRank(cps);
}

// Gestion du tir sur le zombie
zombieImg.addEventListener("mousedown", (e) => {
  if (remaining <= 0 || !timerId) return;

  clicks++;
  totalClicks++;

  if (hitSound) {
    hitSound.currentTime = 0;
    hitSound.play().catch(() => {});
  }

  updateUI();
  e.stopPropagation();
});

// Clic sur le playfield (mais pas sur le zombie)
playfield.addEventListener("click", () => {
  if (remaining <= 0 || !timerId) return;

  totalClicks++;
});

// Bouton musique : lecture / pause de la musique de fond
muteBtn.addEventListener("click", () => {
  if (!bgMusic) return;

  if (bgMusic.paused) {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
});

// Démarrer une partie et réinitialiser
startBtn.addEventListener("click", startGame);
initBtn.addEventListener("click", initializeGame);

// Son de clic pour tous les boutons
allButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!btnSound) return;
    btnSound.currentTime = 0;
    btnSound.play().catch(() => {});
  });
});
