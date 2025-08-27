// model-viewer-glb.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initViewer(containerId, modelPath, opts = {}) {
  const {
    // behavior / layout
    pin = true,
    debugMarkers = false,
    endScroll = 3000,
    showHelpers = true,

    // camera/model fit
    desiredSize = 2.0,          // target longest side after scaling the GLB
    padding = 1,             // extra framing around object
    cameraDistanceMul = 0.3,    // push camera farther from model

    // scroll mapping
    startX = -2,
    endX = 2,
    forcePinType = null,

    // stability
    watchdogMs = 120,

    // model handling
    recenter = true,            // center model to origin before animating
  } = opts;

  // ---------- Logging ----------
  const logs = [];
  const t0 = performance.now();
  const log = (msg, obj) => {
    const line = `[glb-viewer +${(performance.now()-t0).toFixed(1)}ms] ${msg} ${obj ? JSON.stringify(obj) : ""}`;
    console.log(line);
    logs.push(line);
  };

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[glb-viewer] #${containerId} not found`);
    return;
  }
  if (container.clientHeight < 50) {
    container.style.height = '100vh';
    log('container height < 50px; forcing 100vh');
  }
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative'; // for HUD overlay
  }

  // ---------- HUD ----------
  const hud = document.createElement('div');
  hud.style.cssText = 'position:absolute;top:8px;left:8px;background:rgba(0,0,0,.7);color:#0f0;font:12px monospace;padding:6px 8px;border-radius:4px;z-index:10;';
  const btn = document.createElement('button');
  btn.textContent = 'Download Logs';
  btn.style.cssText = 'margin-left:8px;padding:2px 6px;font:12px monospace;';
  const hudBar = document.createElement('div');
  hudBar.style.cssText = 'display:flex;align-items:center;';
  const hudText = document.createElement('span');
  hudBar.appendChild(hudText);
  hudBar.appendChild(btn);
  hud.appendChild(hudBar);
  container.appendChild(hud);

  btn.onclick = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `glb-viewer-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const setHUD = (o) => {
    hudText.textContent = `prog:${o.prog?.toFixed(3)} | y:${o.scrollY} | active:${o.active} | dir:${o.dir} | stuck:${o.stuck} | x:${o.x?.toFixed?.(3)}`;
  };

  // ---------- Three.js ----------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.01, 1000);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.1);
  hemi.position.set(0, 2, 0);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(3, 5, 4);
  dir.castShadow = true;
  scene.add(dir);

  if (showHelpers) {
    const axes = new THREE.AxesHelper(3);
    axes.position.y = -1;
    scene.add(axes);
    const grid = new THREE.GridHelper(2, 20);
    grid.position.y = -1;
    scene.add(grid);
  }

  // A transform root we animate left→right
  const root = new THREE.Group();
  scene.add(root);

  // Camera target (always look at model center)
  const camTarget = new THREE.Vector3(0, 0, 0);

  function render() {
    camera.lookAt(camTarget);
    renderer.render(scene, camera);
  }

  function fitCameraTo(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    camTarget.copy(center);

    const fov = THREE.MathUtils.degToRad(camera.fov);
    const fitHeightDist = (size.y / 2) / Math.tan(fov / 2);
    const fitWidthDist  = (size.x / 2) / Math.tan(fov / 2) / camera.aspect;
    const distance = cameraDistanceMul * padding * Math.max(fitHeightDist, fitWidthDist);

    camera.position.set(0,0, 0.5);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far  = distance * 100;
    camera.updateProjectionMatrix();
  }

  function scaleToDesiredSize(object, targetLongestSide) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const longest = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetLongestSide / longest;
    object.scale.setScalar(scale);
  }

  function recenterObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center); // move so that its center is at origin
  }

  function onResize() {
    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    // After resize, refit camera to the ROOT (includes model)
    fitCameraTo(root);
    render();
    log('resize', { w, h });
    ScrollTrigger.refresh();
  }
  window.addEventListener('resize', onResize);

  // Initial pose & frame (we set position before load)
  root.position.set(startX, 0, 0);

  // ---------- Load GLB ----------
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene || gltf.scenes?.[0];
      if (!model) {
        log('GLTF has no scene, abort');
        return;
      }

      // better materials/shadows
      model.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          if (o.material && 'toneMapped' in o.material) o.material.toneMapped = true;
        }
      });

      root.add(model);

      // center -> scale -> refit -> render
      if (recenter) recenterObject(root);
      if (desiredSize) scaleToDesiredSize(root, desiredSize);
      if (recenter) recenterObject(root); // recenter again after scaling
      fitCameraTo(root);
      render();

      log('GLB loaded', { children: model.children?.length || 0 });
    },
    (xhr) => {
      const pct = xhr.total ? (xhr.loaded / xhr.total * 100).toFixed(1) : '—';
      log('GLB loading', { loaded: xhr.loaded, total: xhr.total, pct });
    },
    (err) => {
      console.error(err);
      log('GLB error', { message: String(err) });
    }
  );

  // ---------- ScrollTrigger (manual mapping with sticky end states) ----------
  const mapX = gsap.utils.mapRange(0, 1, startX, endX);
  const toX = gsap.quickSetter(root.position, 'x');
  let lastProg = 0;
  let lastActive = false;
  let lastUpdateTs = performance.now();
  let stuck = false;
//   const tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: container,
//     start: "top top",
//     end: `+=${endScroll}`,
//     scrub: true,
//     pin: pin,
//     markers: debugMarkers,
//   }
//   });

//   tl.to(root.position, { x: startX, duration: 0 }, 0);          // 0–startScroll: static
//   tl.to(root.position, { x: midX, duration: 1 }, (phase1_px / endScroll)); // smooth change
//   tl.to(root.position, { x: endX, duration: 1 }, (phase2_px / endScroll));   
//   const midX = (startX + endX) / 2;
// const phase1_px = endScroll * 0.33;
// const phase2_px = endScroll * 0.66;

  const stVars = {
    id: 'glbST',
    trigger: container,
    start: 'top top',
    end: `+=${endScroll}`,
    scrub: true,
    pin,
    pinSpacing: true,
    pinReparent: true,
    markers: debugMarkers,
    anticipatePin: 1,
    invalidateOnRefresh: false,
    onUpdate: (self) => {
      const x = mapX(self.progress);
      toX(x);
      render();
      lastActive = self.isActive;
      lastProg = self.progress;
      lastUpdateTs = performance.now();
      setHUD({ prog: self.progress, scrollY: getScrollY(), active: self.isActive, dir: self.direction, stuck, x });
      log('ST onUpdate', { prog: self.progress, x, dir: self.direction, active: self.isActive });
    },
    onLeave: (self) => {
      toX(endX);
      render();
      log('ST onLeave -> lock end', { prog: self.progress });
    },
    onEnterBack: (self) => {
      toX(startX);
      render();
      log('ST onEnterBack -> lock start', { prog: self.progress });
    },
    onToggle: (self) => { log('ST onToggle', { active: self.isActive }); },
    onRefreshInit: () => log('ST refreshInit'),
    onRefresh: () => log('ST refresh'),
    onKill: () => log('ST kill'),
    onScrubComplete: () => log('ST scrubComplete')
  };
  if (forcePinType) stVars.pinType = forcePinType;

  const st = ScrollTrigger.create(stVars);

  ScrollTrigger.addEventListener('scrollEnd', () => {
    const prog = st.progress;
    if (prog >= 1) {
      toX(endX);
      render();
      log('scrollEnd -> enforce end', { prog });
    } else if (prog <= 0) {
      toX(startX);
      render();
      log('scrollEnd -> enforce start', { prog });
    } else {
      log('scrollEnd mid', { prog });
    }
  });

  const getScrollY = () =>
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop || 0;

  // Watchdog (nudge ST if stale)
  let lastScrollY = getScrollY();
  function watchdog() {
    const y = getScrollY();
    const now = performance.now();

    if (y !== lastScrollY) {
      if (now - lastUpdateTs > watchdogMs) {
        stuck = true;
        log('WATCHDOG kick: ST stale, forcing update', { y, prog: st.progress });
        ScrollTrigger.update(true);

        requestAnimationFrame(() => {
          if (performance.now() - lastUpdateTs > watchdogMs) {
            log('WATCHDOG hard refresh');
            ScrollTrigger.refresh();
            const p = st.progress;
            const x = mapX(p);
            toX(x);
            render();
            log('WATCHDOG enforced', { p, x });
          } else {
            stuck = false;
          }
        });
      } else {
        stuck = false;
      }
    }

    lastScrollY = y;
    setHUD({ prog: st.progress, scrollY: y, active: lastActive, dir: 0, stuck, x: root.position.x });
    requestAnimationFrame(watchdog);
  }
  requestAnimationFrame(watchdog);

  // Wake ST on any user intent (helps some trackpads/browsers)
  const wake = () => { log('wake'); ScrollTrigger.update(true); };
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('wheel', wake, { passive: true });
  window.addEventListener('touchmove', wake, { passive: true });
  window.addEventListener('keydown', wake, { passive: true });

  // ---------- RAF ----------
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  animate();

  // ---------- Cleanup ----------
  return () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', wake);
    window.removeEventListener('wheel', wake);
    window.removeEventListener('touchmove', wake);
    window.removeEventListener('keydown', wake);
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // dispose geometry/materials
    root.traverse((o) => {
      if (o.isMesh) {
        o.geometry?.dispose?.();
        const m = o.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
        else m?.dispose?.();
      }
    });

    renderer.dispose();
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    if (hud.parentNode === container) container.removeChild(hud);
    log('viewer disposed');
  };
}
