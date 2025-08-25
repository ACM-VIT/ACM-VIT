import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ModelViewerOptions } from './types';

gsap.registerPlugin(ScrollTrigger);


let hudText: HTMLSpanElement;
let hud: HTMLDivElement;

function initHUD(container: HTMLElement, logs: string[]) {
  hud = document.createElement('div');
  hud.style.cssText = 'position:absolute;top:8px;left:8px;background:rgba(0,0,0,.7);color:#0f0;font:12px monospace;padding:6px 8px;border-radius:4px;z-index:10;';
  const btn = document.createElement('button');
  btn.textContent = 'Download Logs';
  btn.style.cssText = 'margin-left:8px;padding:2px 6px;font:12px monospace;';
  const hudBar = document.createElement('div');
  hudBar.style.cssText = 'display:flex;align-items:center;';
  hudText = document.createElement('span');
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
}

function setHUD(o: { prog?: number; scrollY?: number; active?: boolean; dir?: number; stuck?: boolean; x?: number }) {
  if (hudText) {
    hudText.textContent = `prog:${o.prog?.toFixed(3)} | y:${o.scrollY} | active:${o.active} | dir:${o.dir} | stuck:${o.stuck} | x:${o.x?.toFixed?.(3)}`;
  }
}

export function initViewer(
  containerId: string,
  modelPath: string,
  opts: ModelViewerOptions = {}
): () => void {
    const {
        pin = true,
        debugMarkers = true,
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

    initHUD(container, logs);

    const scene = new THREE.Scene();
    
    const aspect = container.clientWidth / container.clientHeight;
    
    // CAMERA ANIMATION SETTINGS - EASILY CHANGEABLE VALUES
    const INITIAL_CAMERA_POSITION = new THREE.Vector3(-500, 500, 500);  // Starting position
    const FINAL_CAMERA_POSITION = new THREE.Vector3(-100, 45, 30);        // End position (CHANGE THIS - closer to origin)
    const INITIAL_CAMERA_TARGET = new THREE.Vector3(-10, 70, 10);       // What camera looks at initially
    const FINAL_CAMERA_TARGET = new THREE.Vector3(0, 20, 25);            // What camera looks at finally (CHANGE THIS)
    const INITIAL_FRUSTUM_SIZE = 250;                                   // Starting zoom level (wide view)
    const FINAL_FRUSTUM_SIZE = 20;                                      // Final zoom level (CHANGE THIS - smaller = more zoom)
    
    // Create orthographic camera with initial frustum size
    const camera = new THREE.OrthographicCamera(
      -INITIAL_FRUSTUM_SIZE * aspect / 2, // left
      INITIAL_FRUSTUM_SIZE * aspect / 2,  // right
      INITIAL_FRUSTUM_SIZE / 2,           // top
      -INITIAL_FRUSTUM_SIZE / 2,          // bottom
      0.001,                              // near - very close
      100000                              // far
    );

    // Set initial positions
    camera.position.copy(INITIAL_CAMERA_POSITION);
    camera.up.set(0, 1, 0); // Ensure proper up vector to prevent inversion
    
    // Create target object for what camera looks at
    const camTarget = new THREE.Vector3().copy(INITIAL_CAMERA_TARGET);
    
    // Create an object to hold the current frustum size for animation
    const cameraZoom = { frustumSize: INITIAL_FRUSTUM_SIZE };
    
    // Function to update camera frustum based on current zoom
    const updateCameraFrustum = () => {
        const size = cameraZoom.frustumSize;
        camera.left = -size * aspect / 2;
        camera.right = size * aspect / 2;
        camera.top = size / 2;
        camera.bottom = -size / 2;
        camera.updateProjectionMatrix();
    };
  
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
  
    if (showHelpers) {
    const axes = new THREE.AxesHelper(100);
    axes.position.y = -1;
    scene.add(axes);
    const grid = new THREE.GridHelper(20, 20);
    grid.position.y = -1;
    scene.add(grid);
    }
    
    const root = new THREE.Group();
    scene.add(root);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.1);
    hemi.position.set(0, 2, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(3, 5, 4);
    dir.castShadow = true;
    scene.add(dir);
    
    function render() {
        camera.lookAt(camTarget);
        renderer.render(scene, camera);
    }

    root.position.set(0, 0, 0);

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
                const mesh = o as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // keep original material (optional) so you can restore or dispose later
                mesh.userData._origMaterial = mesh.material;

                // render the mesh into the depth buffer only (no color) so edges get occluded correctly
                // use colorWrite=false + depthWrite=true to guarantee depth-only pass
                const depthOnly = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                colorWrite: false,   // don't write color
                depthWrite: true,    // do write depth
                transparent: false,
                side: THREE.DoubleSide
                });
                mesh.material = depthOnly;

                // create edges geometry that only includes "visible" silhouette/feature edges
                // thresholdAngle controls which edges are included (15° here)
                const thresholdAngle = 15 * Math.PI / 180;
                const edgesGeo = new THREE.EdgesGeometry(mesh.geometry, thresholdAngle);
                const edgeMat = new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 1,
                depthTest: true,   
                depthWrite: false  
                });
                const edges = new THREE.LineSegments(edgesGeo, edgeMat);

                // ensure lines render after the depth-only surface has written depth
                edges.renderOrder = 999;
                edges.frustumCulled = false;

                // attach edges to the mesh so they follow transforms
                mesh.add(edges);
            }
            });


            root.add(model);

            render();

            log('GLB loaded', { children: (model as THREE.Group).children?.length || 0 });
            
            // Create camera animation with zoom effect
            const cameraTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: `+=${endScroll}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    markers: debugMarkers,
                    onUpdate: () => {
                        updateCameraFrustum(); // Update frustum on each frame
                        render(); // Re-render on each frame
                    }
                }
            });

            // Animate camera position, target, and zoom simultaneously
            cameraTimeline
                .to(camera.position, {
                    x: FINAL_CAMERA_POSITION.x,
                    y: FINAL_CAMERA_POSITION.y,
                    z: FINAL_CAMERA_POSITION.z,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0)
                .to(camTarget, {
                    x: FINAL_CAMERA_TARGET.x,
                    y: FINAL_CAMERA_TARGET.y,
                    z: FINAL_CAMERA_TARGET.z,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0)
                .to(cameraZoom, {
                    frustumSize: FINAL_FRUSTUM_SIZE,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);

            log('Camera animation with zoom created', { 
                from: INITIAL_CAMERA_POSITION, 
                to: FINAL_CAMERA_POSITION,
                targetFrom: INITIAL_CAMERA_TARGET,
                targetTo: FINAL_CAMERA_TARGET,
                zoomFrom: INITIAL_FRUSTUM_SIZE,
                zoomTo: FINAL_FRUSTUM_SIZE
            });
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

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    animate();

    return () => {
      // Kill all ScrollTriggers associated with this viewer
      ScrollTrigger.getAll().forEach((t: any) => {
        if (t.trigger === container) {
          t.kill();
        }
      });
  
      root.traverse((o: THREE.Object3D) => {
        // dispose Mesh geometry/materials
        if ((o as THREE.Mesh).isMesh) {
          (o as THREE.Mesh).geometry?.dispose?.();
          const m = (o as THREE.Mesh).material;
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
          else m?.dispose?.();
        }

        // dispose LineSegments (edge overlays)
        if ((o as THREE.LineSegments).isLineSegments) {
          (o as THREE.LineSegments).geometry?.dispose?.();
        }
      });
  
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      if (hud.parentNode === container) container.removeChild(hud);
      log('viewer disposed');
    };
}

