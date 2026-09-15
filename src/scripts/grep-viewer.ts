import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { AnimationItem } from "lottie-web";

GlobalWorkerOptions.workerSrc = workerSrc;

type Mode = "spread" | "single" | "pdf";
type RenderedPage = { canvas: HTMLCanvasElement; width: number; height: number; page: number };

const init = () => {
  const viewer = document.querySelector<HTMLElement>("[data-grep-viewer]");
  if (!viewer) return;
  const find = <T extends Element>(selector: string) => viewer.querySelector<T>(selector)!;
  const stage = find<HTMLElement>("[data-grep-stage]");
  const left = find<HTMLCanvasElement>("[data-grep-left]");
  const right = find<HTMLCanvasElement>("[data-grep-right]");
  const turn = find<HTMLCanvasElement>("[data-grep-flip]");
  const versionSelect = find<HTMLSelectElement>("[data-grep-version-select]");
  const modeSelect = find<HTMLSelectElement>("[data-grep-mode]");
  const prev = find<HTMLButtonElement>("[data-grep-prev]");
  const next = find<HTMLButtonElement>("[data-grep-next]");
  const start = find<HTMLElement>("[data-grep-start]");
  const startButton = find<HTMLButtonElement>("[data-grep-start-btn]");
  const loader = find<HTMLElement>("[data-grep-loading]");
  const loadingAnimationContainer = find<HTMLElement>("[data-grep-loading-animation]");
  const errorPanel = find<HTMLElement>("[data-grep-error]");
  const frame = find<HTMLIFrameElement>("[data-grep-pdf-frame]");
  const pdfLink = find<HTMLAnchorElement>("[data-grep-pdf-link]");
  const errorLink = find<HTMLAnchorElement>("[data-grep-error-link]");
  const options = Array.from(versionSelect.options);
  const params = new URL(location.href).searchParams;
  let edition = options.find((option) => option.value === params.get("version")) ?? options[0];
  const requestedMode = params.get("mode");
  let mode: Mode = requestedMode === "pdf" || requestedMode === "single" || requestedMode === "spread"
    ? requestedMode : matchMedia("(max-width: 768px)").matches ? "single" : "spread";
  let doc: Awaited<ReturnType<typeof getDocument>["promise"]> | null = null;
  let page = 1;
  let busy = false;
  let started = false;
  let needsResize = false;
  let resizeTimer = 0;
  let generation = 0;
  const cache = new Map<string, Promise<RenderedPage>>();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const perSpread = () => mode === "spread" ? 2 : 1;
  let loadingAnimation: AnimationItem | null = null;
  let loadingAnimationToken = 0;

  const stopLoadingAnimation = () => {
    loadingAnimationToken += 1;
    loadingAnimation?.destroy();
    loadingAnimation = null;
  };

  const startLoadingAnimation = async () => {
    stopLoadingAnimation();
    const token = loadingAnimationToken;
    try {
      const { default: lottie } = await import("lottie-web/build/player/lottie_light");
      if (token !== loadingAnimationToken || loader.hidden) return;
      // Use the main website's exact cassette animation, on the same origin.
      loadingAnimation = lottie.loadAnimation({
        container: loadingAnimationContainer,
        renderer: "svg",
        loop: !reducedMotion.matches,
        autoplay: !reducedMotion.matches,
        path: "/loader/loading_state.json",
      });
      loadingAnimation.addEventListener("data_failed", () => {
        if (token === loadingAnimationToken) stopLoadingAnimation();
      });
    } catch (error) {
      // The loading status and PDF reader still work if the animation fails.
      console.warn("GREP cassette animation failed to load:", error);
    }
  };

  const syncControls = () => {
    viewer.setAttribute("aria-busy", String(busy));
    versionSelect.disabled = busy;
    modeSelect.disabled = busy;
    startButton.disabled = busy;
    prev.disabled = busy || !doc || !started || page <= 1;
    next.disabled = busy || !doc || !started || page + perSpread() > doc.numPages;
    prev.setAttribute("aria-label", mode === "single" ? "Previous page" : "Previous pages");
    next.setAttribute("aria-label", mode === "single" ? "Next page" : "Next pages");
    find<HTMLElement>("[data-grep-page]").textContent = doc && mode === "spread" && page < doc.numPages ? `${page}–${page + 1}` : String(page);
    find<HTMLElement>("[data-grep-total]").textContent = doc ? String(doc.numPages) : "—";
    find<HTMLElement>("[data-grep-end]").hidden = !doc || page + perSpread() <= doc.numPages;
  };

  const syncUrl = () => {
    const url = new URL(location.href);
    if (edition.value === "v1") url.searchParams.delete("version");
    else url.searchParams.set("version", edition.value);
    url.searchParams.set("mode", mode);
    history.replaceState({}, "", url);
  };

  const applyMode = () => {
    viewer.dataset.mode = mode;
    modeSelect.value = mode;
    stage.hidden = mode === "pdf";
    frame.hidden = mode !== "pdf";
    right.hidden = mode !== "spread";
    start.hidden = started || mode === "pdf";
    if (mode === "pdf") frame.src = `${pdfLink.href}#page=${page}&view=FitH`;
    else frame.removeAttribute("src");
  };

  const metrics = () => {
    const style = getComputedStyle(stage);
    return {
      width: Math.max(1, (stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) / perSpread()),
      height: Math.max(1, stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)),
      dpr: Math.min(devicePixelRatio || 1, 2),
    };
  };

  // Render into detached canvases only. In-flight prefetches share a promise
  // with navigation, and can never overwrite a displayed canvas or new edition.
  const prepare = (number: number, size = metrics()): Promise<RenderedPage> => {
    const source = doc!;
    const key = `${generation}:${number}:${size.width}:${size.height}:${size.dpr}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const promise = (async () => {
      const valid = number >= 1 && number <= source.numPages;
      const pdfPage = await source.getPage(valid ? number : source.numPages);
      const natural = pdfPage.getViewport({ scale: 1 });
      const scale = Math.min(size.width / natural.width, size.height / natural.height);
      const viewport = pdfPage.getViewport({ scale: scale * size.dpr });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      if (valid) await pdfPage.render({ canvas, canvasContext: canvas.getContext("2d")!, viewport }).promise;
      return { canvas, width: natural.width * scale, height: natural.height * scale, page: valid ? number : 0 };
    })();
    cache.set(key, promise);
    while (cache.size > 10) cache.delete(cache.keys().next().value!);
    void promise.catch(() => { if (cache.get(key) === promise) cache.delete(key); });
    return promise;
  };

  const paint = (target: HTMLCanvasElement, source: RenderedPage) => {
    target.width = source.canvas.width;
    target.height = source.canvas.height;
    target.style.width = `${source.width}px`;
    target.style.height = `${source.height}px`;
    target.getContext("2d")!.drawImage(source.canvas, 0, 0);
    target.dataset.page = String(source.page);
  };

  const spread = (number: number) => {
    const size = metrics();
    return Promise.all(Array.from({ length: perSpread() }, (_, offset) => prepare(number + offset, size)));
  };

  const commit = (pages: RenderedPage[]) => {
    // Both stationary pages are committed in the same task / browser frame.
    paint(left, pages[0]);
    if (pages[1]) paint(right, pages[1]);
    else { right.width = 0; right.dataset.page = "0"; }
  };

  const prefetch = () => {
    if (!doc || mode === "pdf") return;
    const size = metrics();
    for (const number of [page - 2, page - 1, page + perSpread(), page + perSpread() + 1]) {
      if (number > 0 && number <= doc.numPages) void prepare(number, size).catch(() => {});
    }
  };

  const showError = (error: unknown) => {
    console.error("GREP reader failed:", error);
    loader.hidden = true;
    start.hidden = true;
    errorPanel.hidden = false;
  };

  const finish = () => {
    busy = false;
    syncControls();
    if (needsResize && mode !== "pdf" && doc && errorPanel.hidden) {
      needsResize = false;
      void redraw();
    }
  };

  const redraw = async () => {
    if (!doc || mode === "pdf") return;
    if (busy) { needsResize = true; return; }
    busy = true;
    syncControls();
    try { commit(await spread(page)); prefetch(); }
    catch (error) { showError(error); }
    finally { finish(); }
  };

  const animate = async (from: number, to: number) => {
    const animation = turn.animate(
      [{ transform: `scaleX(${from})` }, { transform: `scaleX(${to})` }],
      { duration: 230, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" },
    );
    try { await animation.finished; }
    finally { turn.style.transform = `scaleX(${to})`; animation.cancel(); }
  };

  const positionTurn = (target: HTMLCanvasElement, origin: "left" | "right") => {
    const rect = target.getBoundingClientRect();
    const parent = stage.getBoundingClientRect();
    turn.style.left = `${rect.left - parent.left}px`;
    turn.style.top = `${rect.top - parent.top}px`;
    turn.style.transformOrigin = `${origin} center`;
  };

  const flip = async (direction: 1 | -1) => {
    if (busy || !doc || !started || mode === "pdf" || !errorPanel.hidden) return;
    const destination = page + direction * perSpread();
    if (destination < 1 || destination > doc.numPages) return;
    busy = true;
    syncControls();
    try {
      const prepared = await spread(destination);
      if (!reducedMotion.matches) {
        const outgoing = mode === "spread" && direction === 1 ? right : left;
        paint(turn, { canvas: outgoing, width: outgoing.clientWidth, height: outgoing.clientHeight, page });
        positionTurn(outgoing, direction === 1 ? "left" : "right");
        turn.style.transform = "scaleX(1)";
        turn.hidden = false;
        // Replace the sheet below the outgoing copy before opening the fold.
        paint(outgoing, prepared[mode === "spread" && direction === 1 ? 1 : 0]);
        await animate(1, 0);
        commit(prepared);
        const landing = mode === "spread" && direction === -1 ? right : left;
        paint(turn, prepared[mode === "spread" && direction === -1 ? 1 : 0]);
        positionTurn(landing, direction === 1 ? "right" : "left");
        // Positive scale only: neither sheet can ever be mirrored.
        await animate(0, 1);
      }
      commit(prepared);
      page = destination;
      prefetch();
    } catch (error) { showError(error); }
    finally {
      turn.hidden = true;
      turn.getAnimations().forEach((animation) => animation.cancel());
      turn.style.transform = "";
      finish();
    }
  };

  const loadVersion = async (option: HTMLOptionElement) => {
    if (busy) return;
    busy = true;
    generation += 1;
    cache.clear();
    page = 1;
    loader.hidden = false;
    void startLoadingAnimation();
    errorPanel.hidden = true;
    start.hidden = true;
    versionSelect.value = option.value;
    // Direct links use same-origin assets so browser PDF mode also works if
    // a CDN asset hasn't been uploaded yet or disallows cross-origin requests.
    pdfLink.href = option.dataset.pdfFallback!;
    errorLink.href = option.dataset.pdfFallback!;
    const oldDoc = doc;
    doc = null;
    syncControls();
    try {
      if (oldDoc) await oldDoc.destroy();
      const urls = [...new Set([option.dataset.pdfUrl!, option.dataset.pdfFallback!])];
      for (const url of urls) {
        const task = getDocument(url);
        task.onProgress = ({ loaded, total }) => {
          find<HTMLElement>("[data-grep-loading-text]").textContent = total > 0 && loaded < total
            ? `Loading GREP… ${Math.min(100, Math.round(loaded / total * 100))}%` : "Preparing Pages…";
        };
        try { doc = await task.promise; break; }
        catch (error) { await task.destroy(); if (url === urls.at(-1)) throw error; }
      }
      edition = option;
      find<HTMLElement>("[data-grep-edition]").textContent = option.dataset.versionTitle!;
      applyMode();
      if (mode !== "pdf") { commit(await spread(page)); prefetch(); }
      syncUrl();
    } catch (error) { showError(error); }
    finally { loader.hidden = true; stopLoadingAnimation(); finish(); }
  };

  versionSelect.addEventListener("change", () => { void loadVersion(versionSelect.selectedOptions[0]); });
  modeSelect.addEventListener("change", () => {
    if (busy) { modeSelect.value = mode; return; }
    mode = modeSelect.value as Mode;
    if (mode === "spread") page = Math.floor((page - 1) / 2) * 2 + 1;
    cache.clear();
    applyMode();
    syncUrl();
    syncControls();
    void redraw();
  });
  startButton.addEventListener("click", () => { started = true; start.hidden = true; syncControls(); next.focus(); });
  prev.addEventListener("click", () => { void flip(-1); });
  next.addEventListener("click", () => { void flip(1); });
  find<HTMLButtonElement>("[data-grep-retry]").addEventListener("click", () => { void loadVersion(versionSelect.selectedOptions[0]); });
  window.addEventListener("keydown", (event) => {
    if (event.target instanceof Element && event.target.closest("select, input, textarea, button, a, [contenteditable]")) return;
    if (mode !== "pdf" && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
      event.preventDefault();
      void flip(event.key === "ArrowRight" ? 1 : -1);
    }
  });
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { void redraw(); }, 120);
  });
  applyMode();
  void loadVersion(edition);
};

init();
