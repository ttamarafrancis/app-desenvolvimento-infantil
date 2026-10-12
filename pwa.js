"use strict";

(() => {
  const installButton = document.querySelector("#install-app");
  const help = document.querySelector("#install-help");
  const status = document.querySelector("#offline-status");
  let installPrompt = null;

  const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  installButton.hidden = isStandalone();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installButton.hidden = true;
    if (help.open) help.close();
  });
  installButton.addEventListener("click", async () => {
    if (installPrompt) {
      const prompt = installPrompt;
      installPrompt = null;
      try {
        await prompt.prompt();
        await prompt.userChoice;
        return;
      } catch {
        // A browser that cannot show its install prompt still has menu instructions.
      }
    }
    help.showModal();
  });
  document.querySelector("#close-install-help").addEventListener("click", () => help.close());

  function readOfflineStatus(worker) {
    if (!worker) return;
    const channel = new MessageChannel();
    const timeout = setTimeout(() => {
      channel.port1.close();
      status.textContent = "Reabra o jogo com internet para concluir o download.";
    }, 5000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      channel.port1.close();
      status.textContent = event.data.ready
        ? "Pronto para usar sem internet"
        : "Reabra o jogo com internet para concluir o download.";
    };
    worker.postMessage({ type: "OFFLINE_STATUS" }, [channel.port2]);
  }

  async function prepareOffline() {
    if (!("serviceWorker" in navigator)) {
      status.textContent = "Abra no Safari ou Chrome para preparar o uso sem internet.";
      return;
    }
    navigator.serviceWorker.addEventListener("controllerchange", () => readOfflineStatus(navigator.serviceWorker.controller));
    try {
      const registration = await navigator.serviceWorker.register("service-worker.js", { scope: "./", updateViaCache: "none" });
      if (registration.installing) {
        registration.installing.addEventListener("statechange", (event) => {
          if (event.target.state === "redundant" && !registration.active) {
            status.textContent = "O download não terminou. Reabra o jogo com internet para tentar de novo.";
          }
        });
      }
      const ready = await navigator.serviceWorker.ready;
      readOfflineStatus(ready.active);
    } catch {
      if (navigator.serviceWorker.controller) {
        readOfflineStatus(navigator.serviceWorker.controller);
      } else {
        status.textContent = "Reabra o jogo com internet para preparar o uso sem internet.";
      }
    }
  }
  window.addEventListener("load", prepareOffline, { once: true });
})();
