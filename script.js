"use strict";

// Add figures here. Variants of the same object must share a concept.
const FIGURES = [
  {"id": "menina", "concept": "menina", "label": "Menina", "question": "Onde está a menina?", "file": "figuras/menina.jpg"},
  {"id": "menino", "concept": "menino", "label": "Menino", "question": "Onde está o menino?", "file": "figuras/menino.jpg"},
  {"id": "casa", "concept": "casa", "label": "Casa", "question": "Onde está a casa?", "file": "figuras/casa.jpg"},
  {"id": "bola", "concept": "bola", "label": "Bola", "question": "Onde está a bola?", "file": "figuras/bola.jpg"},
  {"id": "arvore", "concept": "arvore", "label": "Árvore", "question": "Onde está a árvore?", "file": "figuras/arvore.jpg"},
  {"id": "nuvem", "concept": "nuvem", "label": "Nuvem", "question": "Onde está a nuvem?", "file": "figuras/nuvem.jpg"},
  {"id": "arco-iris", "concept": "arco-iris", "label": "Arco-íris", "question": "Onde está o arco-íris?", "file": "figuras/arco-iris.jpg"},
  {"id": "lua", "concept": "lua", "label": "Lua", "question": "Onde está a lua?", "file": "figuras/lua.jpg"},
  {"id": "sol", "concept": "sol", "label": "Sol", "question": "Onde está o sol?", "file": "figuras/sol.jpg"},
  {"id": "carro", "concept": "carro", "label": "Carro", "question": "Onde está o carro?", "file": "figuras/carro.jpg"},
  {"id": "maca", "concept": "maca", "label": "Maçã", "question": "Onde está a maçã?", "file": "figuras/maca.jpg"},
  {"id": "uva", "concept": "uva", "label": "Uva", "question": "Onde está a uva?", "file": "figuras/uva.jpg"},
  {"id": "melancia", "concept": "melancia", "label": "Melancia", "question": "Onde está a melancia?", "file": "figuras/melancia.jpg"},
  {"id": "morango", "concept": "morango", "label": "Morango", "question": "Onde está o morango?", "file": "figuras/morango.jpg"},
  {"id": "banana", "concept": "banana", "label": "Banana", "question": "Onde está a banana?", "file": "figuras/banana.jpg"},
  {"id": "galinha", "concept": "galinha", "label": "Galinha", "question": "Onde está a galinha?", "file": "figuras/galinha.jpg"},
  {"id": "pato", "concept": "pato", "label": "Pato", "question": "Onde está o pato?", "file": "figuras/pato.jpg"},
  {"id": "gato", "concept": "gato", "label": "Gato", "question": "Onde está o gato?", "file": "figuras/gato.jpg"},
  {"id": "jacare", "concept": "jacare", "label": "Jacaré", "question": "Onde está o jacaré?", "file": "figuras/jacare.jpg"},
  {"id": "girafa", "concept": "girafa", "label": "Girafa", "question": "Onde está a girafa?", "file": "figuras/girafa.jpg"},
  {"id": "elefante", "concept": "elefante", "label": "Elefante", "question": "Onde está o elefante?", "file": "figuras/elefante.jpg"},
  {"id": "cachorro", "concept": "cachorro", "label": "Cachorro", "question": "Onde está o cachorro?", "file": "figuras/cachorro.jpg"},
  {"id": "macaco", "concept": "macaco", "label": "Macaco", "question": "Onde está o macaco?", "file": "figuras/macaco.jpg"},
  {"id": "prato", "concept": "prato", "label": "Prato", "question": "Onde está o prato?", "file": "figuras/prato.jpg"},
  {"id": "colher", "concept": "colher", "label": "Colher", "question": "Onde está a colher?", "file": "figuras/colher.jpg"},
  {"id": "coelho", "concept": "coelho", "label": "Coelho", "question": "Onde está o coelho?", "file": "figuras/coelho.jpg"},
  {"id": "cavalo", "concept": "cavalo", "label": "Cavalo", "question": "Onde está o cavalo?", "file": "figuras/cavalo.jpg"},
  {"id": "vaca", "concept": "vaca", "label": "Vaca", "question": "Onde está a vaca?", "file": "figuras/vaca.jpg"},
  {"id": "passarinho", "concept": "passarinho", "label": "Passarinho", "question": "Onde está o passarinho?", "file": "figuras/passarinho.jpg"},
  {"id": "peixe", "concept": "peixe", "label": "Peixe", "question": "Onde está o peixe?", "file": "figuras/peixe.jpg"},
  {"id": "caneca", "concept": "caneca", "label": "Caneca", "question": "Onde está a caneca?", "file": "figuras/caneca.jpg"},
  {"id": "livro", "concept": "livro", "label": "Livro", "question": "Onde está o livro?", "file": "figuras/livro.jpg"},
  {"id": "leao", "concept": "leao", "label": "Leão", "question": "Onde está o leão?", "file": "figuras/leao.jpg"},
  {"id": "olhos", "concept": "olhos", "label": "Olhos", "question": "Onde estão os olhos?", "file": "figuras/olhos.jpg"},
  {"id": "boca", "concept": "boca", "label": "Boca", "question": "Onde está a boca?", "file": "figuras/boca.jpg"},
  {"id": "nariz", "concept": "nariz", "label": "Nariz", "question": "Onde está o nariz?", "file": "figuras/nariz.jpg"},
  {"id": "pe", "concept": "pe", "label": "Pé", "question": "Onde está o pé?", "file": "figuras/pe.jpg"},
  {"id": "mao", "concept": "mao", "label": "Mão", "question": "Onde está a mão?", "file": "figuras/mao.jpg"},
  {"id": "pao", "concept": "pao", "label": "Pão", "question": "Onde está o pão?", "file": "figuras/pao.jpg"},
  {"id": "tenis", "concept": "tenis", "label": "Tênis", "question": "Onde está o tênis?", "file": "figuras/tenis.jpg"},
];
const GAME_CONFIG = {
  optionCount: 2,
  advanceDelay: 2200,
  questionAudioPath: "assets/audio/voz-dora",
  questionAudioOverrides: {
    "menina": "assets/audio/voz-elevenlabs/menina.mp3",
    "menino": "assets/audio/voz-elevenlabs/menino.mp3",
    "casa": "assets/audio/voz-elevenlabs/casa.mp3",
    "bola": "assets/audio/voz-elevenlabs/bola.mp3",
    "arvore": "assets/audio/voz-elevenlabs/arvore.mp3",
    "nuvem": "assets/audio/voz-elevenlabs/nuvem.mp3",
    "arco-iris": "assets/audio/voz-elevenlabs/arco-iris.mp3",
    "lua": "assets/audio/voz-elevenlabs/lua.mp3",
    "sol": "assets/audio/voz-elevenlabs/sol.mp3",
    "carro": "assets/audio/voz-elevenlabs/carro.mp3",
    "maca": "assets/audio/voz-elevenlabs/maca.mp3",
    "uva": "assets/audio/voz-elevenlabs/uva.mp3",
    "melancia": "assets/audio/voz-elevenlabs/melancia.mp3",
    "morango": "assets/audio/voz-elevenlabs/morango.mp3",
    "banana": "assets/audio/voz-elevenlabs/banana.mp3",
    "galinha": "assets/audio/voz-elevenlabs/galinha.mp3",
    "pato": "assets/audio/voz-elevenlabs/pato.mp3",
    "gato": "assets/audio/voz-elevenlabs/gato.mp3",
    "jacare": "assets/audio/voz-elevenlabs/jacare.mp3",
    "girafa": "assets/audio/voz-elevenlabs/girafa.mp3",
    "elefante": "assets/audio/voz-elevenlabs/elefante.mp3",
    "cachorro": "assets/audio/voz-elevenlabs/cachorro.mp3",
    "macaco": "assets/audio/voz-elevenlabs/macaco.mp3",
    "prato": "assets/audio/voz-elevenlabs/prato.mp3",
    "colher": "assets/audio/voz-elevenlabs/colher.mp3",
    "coelho": "assets/audio/voz-elevenlabs/coelho.mp3",
    "cavalo": "assets/audio/voz-elevenlabs/cavalo.mp3",
    "vaca": "assets/audio/voz-elevenlabs/vaca.mp3",
    "passarinho": "assets/audio/voz-elevenlabs/passarinho.mp3",
    "peixe": "assets/audio/voz-elevenlabs/peixe.mp3"
  }
};
const question = document.querySelector("#question");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const repeat = document.querySelector("#repeat");
const stars = document.querySelector("#stars");
const starsHome = stars.parentElement;
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

function playAudio(file, isQuestion = false) {
  stopAudio();
  const version = playbackVersion;
  const audioPath = isQuestion ? GAME_CONFIG.questionAudioPath : "assets/audio";
  const questionOverride = isQuestion ? GAME_CONFIG.questionAudioOverrides[file] : undefined;
  player.src = questionOverride || `${audioPath}/${file}.mp3`;
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
  playAudio(current.concept, true);
}

function playSuccess() {
  playAudio("brilho");
}

function clearErrorFeedback() {
  for (const option of choices.querySelectorAll("button")) {
    option.classList.remove("try-again");
    option.querySelector(".error-mark")?.remove();
  }
}

function showErrorFeedback(button) {
  clearErrorFeedback();
  button.classList.add("try-again");
  const mark = document.createElement("span");
  mark.className = "error-mark";
  mark.textContent = "×";
  mark.setAttribute("aria-hidden", "true");
  button.append(mark);
  feedback.textContent = "Você pode escolher outra figura.";
  playAudio("tente-novamente");
}

function startRound(moveFocus = false) {
  stopAudio();
  clearTimeout(advanceTimer);
  solved = false;
  stars.hidden = true;
  // Return the shared celebration before replacing the previous round's cards.
  starsHome.append(stars);
  feedback.textContent = "";
  audioStatus.textContent = "";
  // Prefer another concept on the next round; choose only among loaded figures.
  const candidates = figures.filter((figure) => figure.concept !== current?.concept);
  current = shuffled(candidates)[0];
  const distractors = shuffled(figures.filter((figure) => figure.concept !== current.concept));
  // Keep distractors semantically distinct, even if the catalog has variants.
  const uniqueDistractors = distractors.filter((figure, index, all) => all.findIndex((item) => item.concept === figure.concept) === index);
  const options = shuffled([current, ...uniqueDistractors.slice(0, GAME_CONFIG.optionCount - 1)]);
  const match = current.question.match(/^(Onde (?:está|estão)) (o|a|os|as) (.+)$/);
  question.replaceChildren(document.createTextNode(match[1] + " "));
  const article = document.createElement("span");
  article.className = "question-article";
  article.textContent = match[2] + " ";
  const target = document.createElement("span");
  target.className = "question-target";
  target.textContent = match[3];
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
        showErrorFeedback(button);
        return;
      }
      solved = true;
      clearErrorFeedback();
      button.classList.add("correct");
      feedback.textContent = "Muito bem! Você encontrou a figura.";
      stopAudio();
      audioStatus.textContent = "";
      button.append(stars);
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
