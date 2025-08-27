import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ModelViewerOptions } from './types';

gsap.registerPlugin(ScrollTrigger);

function scaleToDesiredSize(object: THREE.Object3D, targetLongestSide: number) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const longest = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetLongestSide / longest;
  object.scale.setScalar(scale);
}

function recenterObject(object: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
}

/**
 * Fits the camera to the given object.
 * @param camera THREE.PerspectiveCamera
 * @param object THREE.Object3D
 * @param camTarget THREE.Vector3 (optional, will be set to center)
 * @param cameraDistanceMul number (optional)
 * @param padding number (optional)
 */
export function fitCameraTo(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  camTarget?: THREE.Vector3,
  cameraDistanceMul: number = 1.8,
  padding: number = 1.25
) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  if (camTarget) camTarget.copy(center);

  const fov = THREE.MathUtils.degToRad(camera.fov);
  const fitHeightDist = (size.y / 2) / Math.tan(fov / 2);
  const fitWidthDist  = (size.x / 2) / Math.tan(fov / 2) / camera.aspect;
  const distance = cameraDistanceMul * padding * Math.max(fitHeightDist, fitWidthDist);

  camera.position.set(center.x, center.y + size.y * 0.2 + 2, center.z + distance);
  camera.near = Math.max(distance / 100, 0.01);
  camera.far  = distance * 100;
  camera.updateProjectionMatrix();
}

/**
 * Handles resize logic for the viewer.
 */
export function onResizeViewer(
  container: HTMLElement | null,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  root: THREE.Object3D,
  camTarget: THREE.Vector3,
  cameraDistanceMul: number,
  padding: number,
  log: (msg: string, obj?: unknown) => void
) {
  if (!container) {
    log('resize aborted: container is null');
    return;
  }
  const w = Math.max(container.clientWidth, 1);
  const h = Math.max(container.clientHeight, 1);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  fitCameraTo(camera, root, camTarget, cameraDistanceMul, padding);
  camera.lookAt(camTarget);
  renderer.render(camera.parent as THREE.Scene || root.parent as THREE.Scene, camera); 
  log('resize', { w, h });
  ScrollTrigger.refresh();
}

/**
 * Wrapper for onResizeViewer to be used as an event handler.
 */
export function handleResizeViewer(
  container: HTMLElement | null,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  root: THREE.Object3D,
  camTarget: THREE.Vector3,
  cameraDistanceMul: number,
  padding: number,
  log: (msg: string, obj?: unknown) => void
) {
  onResizeViewer(
    container,
    camera,
    renderer,
    root,
    camTarget,
    cameraDistanceMul,
    padding,
    log
  );
}

export function initViewer(
  containerId: string,
  modelPath: string,
  opts: ModelViewerOptions = {}
): () => void {
  const {
    pin = true,
    debugMarkers = false,
    endScroll = 3000,
    showHelpers = true,
    desiredSize = 2.0,
    padding = 1.25,
    cameraDistanceMul = 1.8,
    startX = -2,
    endX = 2,
    forcePinType = null,
    watchdogMs = 120,
    recenter = true,
  } = opts;

  const logs: string[] = [];
  const t0 = performance.now();
  const log = (msg: string, obj?: unknown) => {
    const line = `[glb-viewer +${(performance.now()-t0).toFixed(1)}ms] ${msg} ${obj ? JSON.stringify(obj) : ""}`;
    console.log(line);
    logs.push(line);
  };

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[glb-viewer] #${containerId} not found`);
    return () => {};
  }
  if (container.clientHeight < 50) {
    container.style.height = '100vh';
    log('container height < 50px; forcing 100vh');
  }
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  // HUD
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

  const setHUD = (o: { prog?: number; scrollY?: number; active?: boolean; dir?: number; stuck?: boolean; x?: number }) => {
    hudText.textContent = `prog:${o.prog?.toFixed(3)} | y:${o.scrollY} | active:${o.active} | dir:${o.dir} | stuck:${o.stuck} | x:${o.x?.toFixed?.(3)}`;
  };

  // Three.js
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 5000);

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
    const grid = new THREE.GridHelper(20, 20);
    grid.position.y = -1;
    scene.add(grid);
  }

  const root = new THREE.Group();
  scene.add(root);

  const camTarget = new THREE.Vector3(0, 0, 0);

  function render() {
    camera.lookAt(camTarget);
    renderer.render(scene, camera);
  }

  const resizeHandler = () => handleResizeViewer(
    container,
    camera,
    renderer,
    root,
    camTarget,
    cameraDistanceMul,
    padding,
    log
  );
  window.addEventListener('resize', resizeHandler);

  root.position.set(startX, 0, 0);

  // Load GLB
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene || gltf.scenes?.[0];
      if (!model) {
        log('GLTF has no scene, abort');
        return;
      }

      model.traverse((o: THREE.Object3D) => {
        if ((o as THREE.Mesh).isMesh) {
          (o as THREE.Mesh).castShadow = true;
          (o as THREE.Mesh).receiveShadow = true;
          if ((o as THREE.Mesh).material && 'toneMapped' in (o as THREE.Mesh).material)
            ((o as THREE.Mesh).material as any).toneMapped = true;
        }
      });

      root.add(model);

      if (recenter) recenterObject(root);
      if (desiredSize) scaleToDesiredSize(root, desiredSize);
      if (recenter) recenterObject(root);
      fitCameraTo(camera, root, camTarget, cameraDistanceMul, padding);
      render();

      log('GLB loaded', { children: (model as THREE.Group).children?.length || 0 });
    },
    (xhr: ProgressEvent<EventTarget>) => {
      const loaded = (xhr as any).loaded;
      const total = (xhr as any).total;
      const pct = total ? (loaded / total * 100).toFixed(1) : '—';
      log('GLB loading', { loaded, total, pct });
    },
    (err: unknown) => {
      console.error(err);
      log('GLB error', { message: String(err) });
    }
  );

  // ScrollTrigger
  const mapX = gsap.utils.mapRange(0, 1, startX, endX);
  const toX = gsap.quickSetter(root.position, 'x');
  let lastProg = 0;
  let lastActive = false;
  let lastUpdateTs = performance.now();
  let stuck = false;

  const stVars: Record<string, any> = {
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
    onUpdate: (self: any) => {
      const x = mapX(self.progress);
      toX(x);
      render();
      lastActive = self.isActive;
      lastProg = self.progress;
      lastUpdateTs = performance.now();
      setHUD({ prog: self.progress, scrollY: getScrollY(), active: self.isActive, dir: self.direction, stuck, x });
      log('ST onUpdate', { prog: self.progress, x, dir: self.direction, active: self.isActive });
    },
    onLeave: (self: any) => {
      toX(endX);
      render();
      log('ST onLeave -> lock end', { prog: self.progress });
    },
    onEnterBack: (self: any) => {
      toX(startX);
      render();
      log('ST onEnterBack -> lock start', { prog: self.progress });
    },
    onToggle: (self: any) => { log('ST onToggle', { active: self.isActive }); },
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

  const getScrollY = (): number =>
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop || 0;

  // Watchdog
  let lastScrollY = getScrollY();
  function watchdog() {
    const y = getScrollY();
    const now = performance.now();

    if (y !== lastScrollY) {
      if (now - lastUpdateTs > watchdogMs) {
        stuck = true;
        log('WATCHDOG kick: ST stale, forcing update', { y, prog: st.progress });
        ScrollTrigger.update();

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

  // Wake ST on any user intent
  const wake = () => { log('wake'); ScrollTrigger.update(); };
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('wheel', wake, { passive: true });
  window.addEventListener('touchmove', wake, { passive: true });
  window.addEventListener('keydown', wake, { passive: true });

  // RAF
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  animate();

  // Cleanup
  return () => {
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('scroll', wake);
    window.removeEventListener('wheel', wake);
    window.removeEventListener('touchmove', wake);
    window.removeEventListener('keydown', wake);
    ScrollTrigger.getAll().forEach((t: any) => t.kill());

    root.traverse((o: THREE.Object3D) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).geometry?.dispose?.();
        const m = (o as THREE.Mesh).material;
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