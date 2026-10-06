"use strict";

// Add figures here. Variants share a concept so a cat never distracts from a cat.
const FIGURES = [
  { id: "cachorro", concept: "cachorro", label: "Cachorro", question: "Onde está o cachorro?", file: "cachorro.jpg" },
  { id: "gato", concept: "gato", label: "Gato", question: "Onde está o gato?", file: "gato.png" },
  { id: "gato-com-novelos", concept: "gato", label: "Gato com novelos", question: "Onde está o gato?", file: "gato-com-novelos.jpg" },
  { id: "bola", concept: "bola", label: "Bola", question: "Onde está a bola?", file: "bola.jpg" },
  { id: "carro", concept: "carro", label: "Carro", question: "Onde está o carro?", file: "carro.jpg" },
  { id: "menina", concept: "menina", label: "Menina", question: "Onde está a menina?", file: "menina.jpg" },
  { id: "menino", concept: "menino", label: "Menino", question: "Onde está o menino?", file: "menino.jpg" },
];
const GAME_CONFIG = { optionCount: 2, advanceDelay: 2200 };
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const repeat = document.querySelector("#repeat");
const stars = document.querySelector("#stars");
const start = document.querySelector("#start");
let advanceTimer;
let speechWatchdog;
let speechVersion = 0;
let activeUtterance;
let speechStarted = false;
let audioContext;
let started = false;
const audioStatus = document.querySelector("#audio-status");
const assetNote = document.querySelector("#asset-note");
let figures = [];
let current = null;
let solved = false;
const speechAvailable = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function loadFigure(figure) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ ...figure, available: true });
    image.onerror = () => resolve({ ...figure, available: false });
    image.src = `assets/${figure.file}`;
  });
}

function showPlaceholder(button, figure) {
  button.replaceChildren();
  const placeholder = document.createElement("span");
  placeholder.className = "placeholder";
  const label = document.createElement("strong");
  label.textContent = figure.label;
  const note = document.createElement("small");
  note.textContent = "Ilustração em breve";
  placeholder.append(label, note);
  button.append(placeholder);
}

function stopSpeech() {
  speechVersion++;
  clearTimeout(speechWatchdog);
  if (speechAvailable) window.speechSynthesis.cancel();
  activeUtterance = null;
}

function speakInstruction() {
  if (!speechAvailable || !current || solved) return;
  stopSpeech();
  const version = speechVersion;
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(current.question);
  // Retain a reference: some mobile engines otherwise drop the utterance.
  activeUtterance = utterance;
  speechStarted = false;
  utterance.lang = "pt-BR";
  utterance.rate = 0.9;
  const voices = synth.getVoices();
  const normalize = (voice) => voice.lang.toLowerCase().replaceAll("_", "-");
  const voice = voices.find((item) => normalize(item) === "pt-br")
    || voices.find((item) => normalize(item).startsWith("pt"));
  if (voice) utterance.voice = voice;
  const failed = () => {
    if (version !== speechVersion) return;
    audioStatus.textContent = "Não conseguimos tocar a voz. Toque em Ouvir a pergunta. Se continuar sem som, confira o volume e abra no Safari ou Chrome.";
  };
  utterance.onstart = () => {
    if (version !== speechVersion) return;
    clearTimeout(speechWatchdog);
    speechStarted = true;
    audioStatus.textContent = "";
  };
  utterance.onend = () => {
    if (version !== speechVersion) return;
    clearTimeout(speechWatchdog);
    activeUtterance = null;
  };
  utterance.onerror = (event) => {
    if (version !== speechVersion) return;
    clearTimeout(speechWatchdog);
    if (event.error !== "canceled" && event.error !== "interrupted") failed();
  };
  speechWatchdog = setTimeout(failed, 5000);
  synth.resume();
  synth.speak(utterance);
}

function unlockSounds() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return;
  try {
    audioContext ||= new Context();
    audioContext.resume().catch(() => {});
  } catch { /* The game remains playable without sound. */ }
}

function playSuccess() {
  if (!audioContext || audioContext.state !== "running") return;
  // Three soft notes generated locally, with no downloads or data collection.
  const now = audioContext.currentTime;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const time = now + index * 0.14;
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.09, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.36);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  });
}

function startRound(moveFocus = false) {
  stopSpeech();
  clearTimeout(advanceTimer);
  solved = false;
  stars.hidden = true;
  feedback.textContent = "";
  if (speechAvailable) audioStatus.textContent = "";
  // Prefer another concept on the next round; choose only among loaded figures.
  const candidates = figures.filter((figure) => figure.concept !== current?.concept);
  current = shuffled(candidates)[0];
  const distractors = shuffled(figures.filter((figure) => figure.concept !== current.concept));
  // Keep distractors semantically distinct, even if the catalog has variants.
  const uniqueDistractors = distractors.filter((figure, index, all) => all.findIndex((item) => item.concept === figure.concept) === index);
  const options = shuffled([current, ...uniqueDistractors.slice(0, GAME_CONFIG.optionCount - 1)]);
  question.textContent = current.question;
  choices.style.gridTemplateColumns = `repeat(${options.length}, minmax(0, 1fr))`;
  choices.replaceChildren();
  for (const figure of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.setAttribute("aria-label", figure.label);
    if (figure.available) {
      const image = document.createElement("img");
      image.src = `assets/${figure.file}`;
      image.alt = ""; // The button supplies the accessible name.
      image.draggable = false;
      image.onerror = () => { showPlaceholder(button, figure); assetNote.hidden = false; };
      button.append(image);
    } else {
      showPlaceholder(button, figure);
    }
    button.addEventListener("click", () => {
      if (solved) return;
      unlockSounds();
      if (figure.id !== current.id) {
        feedback.textContent = "Vamos tentar de novo? Você pode escolher outra figura.";
        return;
      }
      solved = true;
      button.classList.add("correct");
      feedback.textContent = "Muito bem! Você encontrou a figura.";
      stopSpeech();
      audioStatus.textContent = "";
      stars.hidden = false;
      playSuccess();
      for (const option of choices.querySelectorAll("button")) option.setAttribute("aria-disabled", "true");
      advanceTimer = setTimeout(() => startRound(true), GAME_CONFIG.advanceDelay);
    });
    choices.append(button);
  }
  if (moveFocus) question.focus({ preventScroll: true });
  if (started) speakInstruction();
}

async function init() {
  const catalog = await Promise.all(FIGURES.map(loadFigure));
  const available = catalog.filter((figure) => figure.available);
  // Use real illustrations exclusively once there are two distinct concepts.
  const hasPlayableImages = new Set(available.map((figure) => figure.concept)).size >= 2;
  figures = hasPlayableImages ? available : catalog;
  assetNote.hidden = hasPlayableImages;
  if (speechAvailable) {
    repeat.disabled = false;
  } else {
    audioStatus.textContent = "O áudio não está disponível neste navegador. Você pode ler a pergunta acima.";
  }
  start.disabled = false;
  // Prime the voice list; browsers may populate it asynchronously.
  if (speechAvailable) window.speechSynthesis.getVoices();
}
start.addEventListener("click", () => {
  started = true;
  document.querySelector("#welcome").hidden = true;
  document.querySelector("#game").hidden = false;
  unlockSounds();
  startRound(true);
});
repeat.addEventListener("click", () => { unlockSounds(); speakInstruction(); });
if (speechAvailable) {
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    if (started && !solved && activeUtterance && !speechStarted) speakInstruction();
  });
}
document.addEventListener("visibilitychange", () => {
  if (!started) return;
  if (document.hidden) {
    stopSpeech();
    clearTimeout(advanceTimer);
  } else if (solved) {
    startRound(true);
  } else {
    speakInstruction();
  }
});
window.addEventListener("pagehide", () => { stopSpeech(); clearTimeout(advanceTimer); });
init();
