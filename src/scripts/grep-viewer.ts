import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerSrc;

const init = () => {
  const viewer = document.querySelector<HTMLElement>("[data-grep-viewer]");
  const pdfUrl = viewer?.getAttribute("data-pdf-url");
  const stage = document.querySelector<HTMLElement>("[data-grep-stage]");
  const leftCanvas = document.querySelector<HTMLCanvasElement>(
    "[data-grep-left]"
  );
  const rightCanvas = document.querySelector<HTMLCanvasElement>(
    "[data-grep-right]"
  );
  const singleCanvas = document.querySelector<HTMLCanvasElement>(
    "[data-grep-single]"
  );
  const flipLayer = document.querySelector<HTMLElement>("[data-grep-flip]");
  const flipFront = document.querySelector<HTMLCanvasElement>(
    "[data-grep-flip-front]"
  );
  const flipBack = document.querySelector<HTMLCanvasElement>(
    "[data-grep-flip-back]"
  );
  const prevBtn = document.querySelector<HTMLButtonElement>("[data-grep-prev]");
  const nextBtn = document.querySelector<HTMLButtonElement>("[data-grep-next]");
  const pageLabel = document.querySelector<HTMLElement>("[data-grep-page]");
  const totalLabel = document.querySelector<HTMLElement>("[data-grep-total]");
  const endOverlay = document.querySelector<HTMLElement>("[data-grep-end]");
  const startOverlay = document.querySelector<HTMLElement>("[data-grep-start]");
  const startButton = document.querySelector<HTMLButtonElement>(
    "[data-grep-start-btn]"
  );

  if (
    !pdfUrl ||
    !stage ||
    !leftCanvas ||
    !rightCanvas ||
    !singleCanvas ||
    !flipLayer
  ) {
    console.warn("GREP viewer missing required elements.");
    return;
  }

  let pdfDoc: Awaited<ReturnType<typeof getDocument>>["promise"] | null = null;
  let currentPage = 1;
  let totalPages = 0;
  let isFlipping = false;
  let renderToken = 0;
  let resizeRaf = 0;
  const flipDuration = 880;
  let introDismissed = false;
  const maxCacheEntries = 6;
  const pageCache = new Map<
    number,
    { canvas: HTMLCanvasElement; cssWidth: number; cssHeight: number; ratio: number }
  >();
  let cacheSignature = "";

  const getPagesPerSpread = () =>
    window.matchMedia("(max-width: 768px)").matches ? 1 : 2;

  const getCanvasContext = (canvas: HTMLCanvasElement) =>
    canvas.getContext("2d");

  const getSpreadMetrics = () => {
    const rect = stage.getBoundingClientRect();
    const styles = window.getComputedStyle(stage);
    const paddingX =
      parseFloat(styles.paddingLeft || "0") +
      parseFloat(styles.paddingRight || "0");
    const paddingY =
      parseFloat(styles.paddingTop || "0") +
      parseFloat(styles.paddingBottom || "0");
    const pagesPerSpread = getPagesPerSpread();
    const availableWidth = rect.width - paddingX;
    const availableHeight = rect.height - paddingY;
    const width = pagesPerSpread === 2 ? availableWidth / 2 : availableWidth;
    return { width, height: availableHeight, pagesPerSpread };
  };

  const computeLayout = (boxWidth: number, boxHeight: number, ratio: number) => {
    let width = boxWidth;
    let height = width / ratio;
    if (height > boxHeight) {
      height = boxHeight;
      width = height * ratio;
    }
    return { width, height };
  };

  const storeInCache = (
    pageNumber: number,
    canvas: HTMLCanvasElement,
    cssWidth: number,
    cssHeight: number,
    ratio: number
  ) => {
    const cacheCanvas = document.createElement("canvas");
    cacheCanvas.width = canvas.width;
    cacheCanvas.height = canvas.height;
    const ctx = cacheCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, 0);
    }

    if (pageCache.has(pageNumber)) {
      pageCache.delete(pageNumber);
    }
    pageCache.set(pageNumber, { canvas: cacheCanvas, cssWidth, cssHeight, ratio });

    if (pageCache.size > maxCacheEntries) {
      const oldestKey = pageCache.keys().next().value;
      if (oldestKey !== undefined) {
        pageCache.delete(oldestKey);
      }
    }
  };

  const renderPage = async (
    pageNumber: number,
    canvas: HTMLCanvasElement,
    boxWidth: number,
    boxHeight: number
  ) => {
    if (!pdfDoc || pageNumber < 1 || pageNumber > totalPages) {
      const ctx = getCanvasContext(canvas);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const cached = pageCache.get(pageNumber);
    let ratio = cached?.ratio ?? null;

    if (!ratio) {
      const page = await (await pdfDoc).getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      ratio = viewport.width / viewport.height;
    }

    const { width, height } = computeLayout(boxWidth, boxHeight, ratio);

    if (
      cached &&
      Math.abs(cached.cssWidth - width) < 1 &&
      Math.abs(cached.cssHeight - height) < 1
    ) {
      canvas.style.width = `${cached.cssWidth}px`;
      canvas.style.height = `${cached.cssHeight}px`;
      canvas.width = cached.canvas.width;
      canvas.height = cached.canvas.height;

      const ctx = getCanvasContext(canvas);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(cached.canvas, 0, 0);
      }

      const wrapper = canvas.parentElement as HTMLElement | null;
      if (wrapper) {
        wrapper.style.width = `${cached.cssWidth}px`;
        wrapper.style.height = `${cached.cssHeight}px`;
      }
      return;
    }

    const page = await (await pdfDoc).getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const deviceScale = window.devicePixelRatio || 1;
    const scale = (width / viewport.width) * deviceScale;
    const scaledViewport = page.getViewport({ scale });

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(scaledViewport.width);
    canvas.height = Math.floor(scaledViewport.height);
    const wrapper = canvas.parentElement as HTMLElement | null;
    if (wrapper) {
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
    }

    const ctx = getCanvasContext(canvas);
    if (!ctx) return;

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    storeInCache(pageNumber, canvas, width, height, ratio);
  };

  const updateHud = () => {
    if (pageLabel) pageLabel.textContent = String(currentPage);
    if (totalLabel) totalLabel.textContent = String(totalPages);
    const pagesPerSpread = getPagesPerSpread();
    const isEnd = currentPage + pagesPerSpread - 1 >= totalPages;
    if (endOverlay) {
      endOverlay.classList.toggle("is-visible", isEnd);
    }
    if (startOverlay) {
      startOverlay.classList.toggle(
        "is-visible",
        currentPage === 1 && !introDismissed
      );
    }
  };

  const renderSpread = async () => {
    const token = ++renderToken;
    const { width, height, pagesPerSpread } = getSpreadMetrics();
    const signature = `${Math.round(width)}x${Math.round(height)}:${pagesPerSpread}`;
    if (signature !== cacheSignature) {
      pageCache.clear();
      cacheSignature = signature;
    }

    if (pagesPerSpread === 1) {
      await renderPage(currentPage, singleCanvas, width, height);
    } else {
      await renderPage(currentPage, leftCanvas, width, height);
      await renderPage(currentPage + 1, rightCanvas, width, height);
    }

    if (token === renderToken) {
      updateHud();
      prefetchSurrounding(width, height, pagesPerSpread);
    }
  };

  const copyCanvas = (
    source: HTMLCanvasElement,
    target: HTMLCanvasElement
  ) => {
    target.width = source.width;
    target.height = source.height;
    const ctx = getCanvasContext(target);
    if (!ctx) return;
    ctx.clearRect(0, 0, target.width, target.height);
    ctx.drawImage(source, 0, 0);
  };

  const positionFlipLayer = (targetCanvas: HTMLCanvasElement) => {
    const canvasRect = targetCanvas.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    flipLayer.style.width = `${canvasRect.width}px`;
    flipLayer.style.height = `${canvasRect.height}px`;
    flipLayer.style.left = `${canvasRect.left - stageRect.left}px`;
    flipLayer.style.top = `${canvasRect.top - stageRect.top}px`;
  };

  const runFlip = async (direction: "next" | "prev") => {
    if (isFlipping) return;
    const pagesPerSpread = getPagesPerSpread();
    const nextPage =
      direction === "next"
        ? currentPage + pagesPerSpread
        : currentPage - pagesPerSpread;

    if (nextPage < 1 || nextPage > totalPages) return;

    let activeCanvas = singleCanvas;
    let backPage = nextPage;

    if (pagesPerSpread === 2) {
      if (direction === "next") {
        activeCanvas = rightCanvas;
        backPage = currentPage + 2;
      } else {
        activeCanvas = leftCanvas;
        backPage = currentPage - 1;
      }
    }

    if (!activeCanvas || !flipFront || !flipBack) return;

    positionFlipLayer(activeCanvas);
    copyCanvas(activeCanvas, flipFront);
    await renderPage(
      backPage,
      flipBack,
      activeCanvas.clientWidth,
      activeCanvas.clientHeight
    );

    isFlipping = true;
    flipLayer.classList.remove("next", "prev");
    flipLayer.classList.add("is-flipping", direction);
    flipLayer.style.transformOrigin =
      direction === "next" ? "left center" : "right center";
    flipLayer.style.transform = "rotateY(0deg)";

    const rotation = direction === "next" ? "-180deg" : "180deg";
    const animation = flipLayer.animate(
      [
        { transform: "rotateY(0deg)" },
        { transform: `rotateY(${rotation})` },
      ],
      {
        duration: flipDuration,
        easing: "cubic-bezier(0.25, 0.8, 0.25, 1)",
        fill: "forwards",
      }
    );

    animation.onfinish = async () => {
      flipLayer.classList.remove("is-flipping", direction);
      flipLayer.style.transform = "";
      isFlipping = false;
      currentPage = nextPage;
      await renderSpread();
    };
  };

  const onPrev = () => runFlip("prev");
  const onNext = () => runFlip("next");

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  const dismissIntro = () => {
    introDismissed = true;
    if (startOverlay) startOverlay.classList.remove("is-visible");
  };

  startButton?.addEventListener("click", dismissIntro);

  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      renderSpread();
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") onNext();
    if (event.key === "ArrowLeft") onPrev();
  });

  const prefetchPage = async (
    pageNumber: number,
    boxWidth: number,
    boxHeight: number
  ) => {
    if (!pdfDoc || pageNumber < 1 || pageNumber > totalPages) return;
    if (pageCache.has(pageNumber)) return;

    const page = await (await pdfDoc).getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const ratio = viewport.width / viewport.height;
    const { width, height } = computeLayout(boxWidth, boxHeight, ratio);
    const deviceScale = window.devicePixelRatio || 1;
    const scale = (width / viewport.width) * deviceScale;
    const scaledViewport = page.getViewport({ scale });

    const cacheCanvas = document.createElement("canvas");
    cacheCanvas.width = Math.floor(scaledViewport.width);
    cacheCanvas.height = Math.floor(scaledViewport.height);
    const ctx = cacheCanvas.getContext("2d");
    if (!ctx) return;

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
    pageCache.set(pageNumber, {
      canvas: cacheCanvas,
      cssWidth: width,
      cssHeight: height,
      ratio,
    });

    if (pageCache.size > maxCacheEntries) {
      const oldestKey = pageCache.keys().next().value;
      if (oldestKey !== undefined) {
        pageCache.delete(oldestKey);
      }
    }
  };

  const prefetchSurrounding = (
    boxWidth: number,
    boxHeight: number,
    pagesPerSpread: number
  ) => {
    const nextStart = currentPage + pagesPerSpread;
    const prevStart = currentPage - pagesPerSpread;
    const targets: number[] = [];

    if (pagesPerSpread === 2) {
      targets.push(nextStart, nextStart + 1, prevStart, prevStart + 1);
    } else {
      targets.push(nextStart, prevStart);
    }

    targets.forEach((pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        prefetchPage(pageNumber, boxWidth, boxHeight);
      }
    });
  };

  (async () => {
    pdfDoc = getDocument(pdfUrl).promise;
    totalPages = (await pdfDoc).numPages;
    updateHud();
    await renderSpread();
  })();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
