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
const GAME_CONFIG = { optionCount: 2 };
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const repeat = document.querySelector("#repeat");
const next = document.querySelector("#next");
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

function speakInstruction() {
  if (!speechAvailable || !current) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(current.question);
  utterance.lang = "pt-BR";
  utterance.rate = 0.85;
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().replace("_", "-") === "pt-br");
  if (voice) utterance.voice = voice;
  utterance.onstart = () => { audioStatus.textContent = "Ouvindo a pergunta…"; };
  utterance.onend = () => { audioStatus.textContent = ""; };
  utterance.onerror = (event) => {
    if (event.error !== "canceled" && event.error !== "interrupted") {
      audioStatus.textContent = "Não foi possível reproduzir o áudio. Leia a pergunta acima e tente ouvir novamente.";
    }
  };
  window.speechSynthesis.speak(utterance);
}

function startRound(moveFocus = false) {
  if (speechAvailable) window.speechSynthesis.cancel();
  solved = false;
  next.hidden = true;
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
      if (figure.id !== current.id) {
        feedback.textContent = "Vamos tentar de novo? Você pode escolher outra figura.";
        return;
      }
      solved = true;
      button.classList.add("correct");
      feedback.textContent = "Muito bem! Você encontrou a figura.";
      next.hidden = false;
      // An explicit next step leaves time to hear/read the feedback, without a timer.
      next.focus();
    });
    choices.append(button);
  }
  if (moveFocus) choices.querySelector("button").focus();
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
  startRound();
}
repeat.addEventListener("click", speakInstruction);
next.addEventListener("click", () => startRound(true));
window.addEventListener("pagehide", () => { if (speechAvailable) window.speechSynthesis.cancel(); });
init();
