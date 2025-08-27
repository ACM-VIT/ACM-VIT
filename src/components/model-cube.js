import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initViewer(containerId, opts = {}) {
  const {
    pin = true,
    debugMarkers = false,
    endScroll = 3000,
    showHelpers = true,
    cubeSize = 2,
    padding = 1.25,
    cameraDistanceMul = 1.8,   // ⬅️ move camera farther from cube
    forcePinType = null,
    watchdogMs = 120,
    startX = -2,               // ⬅️ start at left
    endX = 2                   // ⬅️ end at right
  } = opts;

  // ---------- Logging ----------
  const logs = [];
  const t0 = performance.now();
  const log = (msg, obj) => {
    const line = `[cube-viewer +${(performance.now()-t0).toFixed(1)}ms] ${msg} ${obj ? JSON.stringify(obj) : ""}`;
    console.log(line);
    logs.push(line);
  };

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[cube-viewer] #${containerId} not found`);
    return;
  }
  if (container.clientHeight < 50) {
    log('container height < 50px; forcing 100vh');
    container.style.height = '100vh';
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
    a.download = `cube-viewer-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const setHUD = (o) => {
    hudText.textContent = `prog:${o.prog?.toFixed(3)} | y:${o.scrollY} | active:${o.active} | dir:${o.dir} | stuck:${o.stuck} | x:${o.x?.toFixed?.(3)}`;
  };

  // ---------- Three.js ----------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
    0.01,
    5000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth || 1, container.clientHeight || 1);
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

  const geom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const mat  = new THREE.MeshStandardMaterial({ color: 0x6699ff, roughness: 0.5, metalness: 0.1 });
  const cube = new THREE.Mesh(geom, mat);
  cube.castShadow = cube.receiveShadow = true;
  scene.add(cube);

  const camTarget = new THREE.Vector3(0, 0, 0);
  function fitCameraTo(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    camTarget.copy(center);

    const fov = THREE.MathUtils.degToRad(camera.fov);
    const fitHeightDist = (size.y / 2) / Math.tan(fov / 2);
    const fitWidthDist  = (size.x / 2) / Math.tan(fov / 2) / camera.aspect;
    const distance = cameraDistanceMul * padding * Math.max(fitHeightDist, fitWidthDist); // ⬅️ farther

    camera.position.set(center.x, center.y + size.y * 0.2, center.z + distance);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far  = distance * 100;
    camera.updateProjectionMatrix();
  }

  function render() {
    camera.lookAt(camTarget);
    renderer.render(scene, camera);
  }

  function onResize() {
    const w = Math.max(container.clientWidth, 1);
    const h = Math.max(container.clientHeight, 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    fitCameraTo(cube);
    render();
    log('resize', { w, h });
    ScrollTrigger.refresh();
  }
  window.addEventListener('resize', onResize);

  // Initial pose & frame
  cube.position.set(startX, 0, 0);
  fitCameraTo(cube);
  render();

  // ---------- ScrollTrigger (manual mapping with sticky end states) ----------
  const mapX = gsap.utils.mapRange(0, 1, startX, endX);
  const toX = gsap.quickSetter(cube.position, 'x');
  let lastProg = 0;
  let lastActive = false;
  let lastUpdateTs = performance.now();
  let stuck = false;

  // We want the value to STAY at the end when leaving.
  const stVars = {
    id: 'cubeST',
    trigger: container,
    start: 'top top',
    end: `+=${endScroll}`,
    scrub: true,
    pin,
    pinSpacing: true,
    pinReparent: true,
    markers: debugMarkers,
    anticipatePin: 1,
    // important: don't auto-reinit the mapping at odd times
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
      // lock final state when you scroll past the end
      toX(endX);
      render();
      log('ST onLeave -> lock end', { prog: self.progress });
    },
    onEnterBack: (self) => {
      // lock start state when scrolling back above the section
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
    // enforce end/start at scrollEnd too (belt & suspenders)
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

  // Watchdog (kept, but gentler): nudge ST if stale
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
            // After refresh, enforce current DOM state to cube X:
            const p = st.progress; // ST recomputes this
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
    setHUD({ prog: st.progress, scrollY: y, active: lastActive, dir: 0, stuck, x: cube.position.x });
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

  // Cleanup
  return () => {
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', wake);
    window.removeEventListener('wheel', wake);
    window.removeEventListener('touchmove', wake);
    window.removeEventListener('keydown', wake);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    renderer.dispose();
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    if (hud.parentNode === container) container.removeChild(hud);
    log('viewer disposed');
  };
}