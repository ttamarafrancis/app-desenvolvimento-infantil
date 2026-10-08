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
let playbackVersion = 0;
let started = false;
let needsAudioGesture = false;
const player = document.querySelector("#game-audio");
const audioStatus = document.querySelector("#audio-status");
const assetNote = document.querySelector("#asset-note");
let figures = [];
let current = null;
let solved = false;

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
  placeholder.append(label);
  button.append(placeholder);
}

function stopAudio() {
  playbackVersion++;
  player.pause();
}

function playAudio(file) {
  stopAudio();
  const version = playbackVersion;
  player.src = `assets/audio/${file}.mp3`;
  player.controls = false;
  audioStatus.textContent = "";
  const failed = (error) => {
    if (version !== playbackVersion) return;
    if (error?.name === "NotAllowedError") {
      needsAudioGesture = true;
      document.querySelector("#welcome").hidden = false;
      return;
    }
    player.controls = true;
    audioStatus.textContent = "O som não tocou. Use o botão de reprodução abaixo e confira o volume do aparelho.";
  };
  player.onerror = failed;
  try {
    const playing = player.play();
    if (playing) playing.then(() => {
      if (version !== playbackVersion) return;
      needsAudioGesture = false;
      document.querySelector("#welcome").hidden = true;
    }).catch(failed);
  } catch (error) { failed(error); }
}

function speakInstruction() {
  if (!current || solved) return;
  playAudio(current.concept);
}

function playSuccess() {
  playAudio("acerto");
}

function startRound(moveFocus = false) {
  stopAudio();
  clearTimeout(advanceTimer);
  solved = false;
  stars.hidden = true;
  feedback.textContent = "";
  audioStatus.textContent = "";
  // Prefer another concept on the next round; choose only among loaded figures.
  const candidates = figures.filter((figure) => figure.concept !== current?.concept);
  current = shuffled(candidates)[0];
  const distractors = shuffled(figures.filter((figure) => figure.concept !== current.concept));
  // Keep distractors semantically distinct, even if the catalog has variants.
  const uniqueDistractors = distractors.filter((figure, index, all) => all.findIndex((item) => item.concept === figure.concept) === index);
  const options = shuffled([current, ...uniqueDistractors.slice(0, GAME_CONFIG.optionCount - 1)]);
  const match = current.question.match(/^Onde está ([oa]) (.+)$/);
  question.replaceChildren(document.createTextNode("Onde está "));
  const article = document.createElement("span");
  article.className = "question-article";
  article.textContent = match[1] + " ";
  const target = document.createElement("span");
  target.className = "question-target";
  target.textContent = match[2];
  question.append(article, target);
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
      if (needsAudioGesture) speakInstruction();
      if (figure.id !== current.id) {
        feedback.textContent = "Você pode escolher outra figura.";
        return;
      }
      solved = true;
      button.classList.add("correct");
      feedback.textContent = "Muito bem! Você encontrou a figura.";
      stopAudio();
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
  repeat.disabled = false;
  // Try autoplay immediately; a small start control appears only if blocked.
  started = true;
  startRound();
}
start.addEventListener("click", () => {
  started = true;
  document.querySelector("#welcome").hidden = true;
  question.focus({ preventScroll: true });
  speakInstruction();
});
repeat.addEventListener("click", speakInstruction);
document.addEventListener("visibilitychange", () => {
  if (!started) return;
  if (document.hidden) {
    stopAudio();
    clearTimeout(advanceTimer);
  } else if (solved) {
    startRound(true);
  } else {
    speakInstruction();
  }
});
window.addEventListener("pagehide", () => { stopAudio(); clearTimeout(advanceTimer); });
init();
