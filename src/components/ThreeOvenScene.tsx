import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Flame, Eye, RotateCw, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ThreeOvenScene() {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);

  // UI state for bottom dock
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [flameIntensity, setFlameIntensity] = useState<'normal' | 'high' | 'gentle'>('normal');
  const [cameraView, setCameraView] = useState<'overview' | 'hearth' | 'pizza'>('overview');

  // Mutable refs for loop to avoid re-triggering React renders
  const stateRef = useRef({
    isRotating: true,
    flameIntensity: 'normal' as 'normal' | 'high' | 'gentle',
    targetCamPos: new THREE.Vector3(3.4, 2.2, 3.8),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
    stateRef.current.flameIntensity = flameIntensity;
  }, [isRotating, flameIntensity]);

  useEffect(() => {
    if (cameraView === 'overview') {
      stateRef.current.targetCamPos.set(3.4, 2.2, 3.8);
      stateRef.current.targetLookAt.set(0, 0.4, 0);
    } else if (cameraView === 'hearth') {
      stateRef.current.targetCamPos.set(0.2, 0.8, 2.1);
      stateRef.current.targetLookAt.set(0, 0.5, -0.4);
    } else if (cameraView === 'pizza') {
      stateRef.current.targetCamPos.set(1.4, 1.3, 1.6);
      stateRef.current.targetLookAt.set(0.4, 0.45, 0.6);
    }
  }, [cameraView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software GL detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x18110e);
    scene.fog = new THREE.FogExp2(0x18110e, 0.12);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(3.4, 2.2, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffecd6, 0.35);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffdfba, 0x1f1612, 0.5);
    scene.add(hemiLight);

    // Warm Key Directional Light
    const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.8);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Interior Fire Hearth Flickering Point Light
    const fireLight = new THREE.PointLight(0xff5511, 3.2, 4.5);
    fireLight.position.set(0, 0.65, -0.2);
    fireLight.castShadow = !isSoftwareGl;
    scene.add(fireLight);

    // 5. Procedural Texture Helpers
    const createStoneTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#6e5a4f';
        ctx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 4000; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const shade = Math.floor(60 + Math.random() * 120);
          ctx.fillStyle = `rgb(${shade},${shade - 15},${shade - 25})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      return tex;
    };

    const stoneTex = createStoneTexture();

    // 6. Composite 3D Oven & Peel Model Group (9 distinct functional procedural parts)
    const ovenRoot = new THREE.Group();
    scene.add(ovenRoot);

    // (Part 1) Base Stone Slab
    const baseGeo = new THREE.BoxGeometry(3.2, 0.25, 3.2);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x473832,
      roughness: 0.85,
      metalness: 0.05,
      map: stoneTex,
    });
    const baseMesh = new THREE.Mesh(baseGeo, stoneMat);
    baseMesh.position.y = 0.125;
    baseMesh.receiveShadow = !isSoftwareGl;
    ovenRoot.add(baseMesh);

    // Contact shadow grounding plane
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0a0604,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // (Part 2) Refractory Stone Oven Dome
    const domeGeo = new THREE.SphereGeometry(1.25, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x7a6356,
      roughness: 0.9,
      metalness: 0.05,
      map: stoneTex,
      side: THREE.DoubleSide,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.y = 0.25;
    domeMesh.castShadow = !isSoftwareGl;
    domeMesh.receiveShadow = !isSoftwareGl;
    ovenRoot.add(domeMesh);

    // (Part 3) Inner Dark Fire Chamber
    const innerChamberGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.45, 24);
    const chamberMat = new THREE.MeshStandardMaterial({
      color: 0x1a120e,
      roughness: 0.98,
      metalness: 0.0,
    });
    const chamberMesh = new THREE.Mesh(innerChamberGeo, chamberMat);
    chamberMesh.position.set(0, 0.45, 0);
    ovenRoot.add(chamberMesh);

    // (Part 4) Arched Brick Mouth Frame
    const archGeo = new THREE.TorusGeometry(0.55, 0.12, 16, 24, Math.PI);
    const brickMat = new THREE.MeshStandardMaterial({
      color: 0x9e432c, // Terracotta baked brick
      roughness: 0.75,
      metalness: 0.05,
    });
    const archMesh = new THREE.Mesh(archGeo, brickMat);
    archMesh.position.set(0, 0.58, 0.98);
    archMesh.castShadow = !isSoftwareGl;
    ovenRoot.add(archMesh);

    // (Part 5) Brick Pillars for Mouth
    const pillarGeo = new THREE.BoxGeometry(0.18, 0.4, 0.22);
    const leftPillar = new THREE.Mesh(pillarGeo, brickMat);
    leftPillar.position.set(-0.55, 0.42, 0.98);
    ovenRoot.add(leftPillar);
    const rightPillar = new THREE.Mesh(pillarGeo, brickMat);
    rightPillar.position.set(0.55, 0.42, 0.98);
    ovenRoot.add(rightPillar);

    // (Part 6) Copper Chimney Pipe on Top
    const chimneyGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.8, 20);
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xa85834,
      metalness: 0.85,
      roughness: 0.25,
    });
    const chimney = new THREE.Mesh(chimneyGeo, copperMat);
    chimney.position.set(0, 1.7, 0.4);
    chimney.castShadow = !isSoftwareGl;
    ovenRoot.add(chimney);

    const chimneyRingGeo = new THREE.TorusGeometry(0.2, 0.03, 12, 24);
    const chimneyRing = new THREE.Mesh(chimneyRingGeo, copperMat);
    chimneyRing.rotation.x = Math.PI / 2;
    chimneyRing.position.set(0, 2.08, 0.4);
    ovenRoot.add(chimneyRing);

    // (Part 7) Burning Wood Logs inside
    const logGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.75, 12);
    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x24160f,
      roughness: 0.95,
    });
    const log1 = new THREE.Mesh(logGeo, barkMat);
    log1.rotation.z = Math.PI / 3;
    log1.rotation.y = 0.4;
    log1.position.set(-0.25, 0.35, -0.2);
    ovenRoot.add(log1);

    const log2 = new THREE.Mesh(logGeo, barkMat);
    log2.rotation.z = -Math.PI / 3;
    log2.rotation.y = -0.3;
    log2.position.set(0.2, 0.36, -0.25);
    ovenRoot.add(log2);

    // Embers with emissive glow
    const embersGeo = new THREE.DodecahedronGeometry(0.18, 1);
    const embersMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff4400,
      emissiveIntensity: 2.2,
      roughness: 0.5,
    });
    const embers = new THREE.Mesh(embersGeo, embersMat);
    embers.position.set(0, 0.32, -0.22);
    ovenRoot.add(embers);

    // (Part 8) Wooden Pizza Peel
    const peelGroup = new THREE.Group();
    peelGroup.position.set(0.35, 0.42, 0.7);
    ovenRoot.add(peelGroup);

    const woodPaddleMat = new THREE.MeshStandardMaterial({
      color: 0xc89d6e,
      roughness: 0.65,
      metalness: 0.05,
    });

    const paddleBladeGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.025, 32);
    const paddleBlade = new THREE.Mesh(paddleBladeGeo, woodPaddleMat);
    paddleBlade.castShadow = !isSoftwareGl;
    paddleBlade.receiveShadow = !isSoftwareGl;
    peelGroup.add(paddleBlade);

    const paddleHandleGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 16);
    const paddleHandle = new THREE.Mesh(paddleHandleGeo, woodPaddleMat);
    paddleHandle.rotation.x = Math.PI / 2;
    paddleHandle.position.set(0, 0, 1.05);
    peelGroup.add(paddleHandle);

    // (Part 9) Artisanal Neapolitan Pizza on the Peel!
    const pizzaGroup = new THREE.Group();
    pizzaGroup.position.y = 0.015;
    peelGroup.add(pizzaGroup);

    // Puffed leopard-crusted cornicione (crust torus)
    const crustGeo = new THREE.TorusGeometry(0.38, 0.055, 16, 32);
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0xd89f64,
      roughness: 0.85,
    });
    const crustMesh = new THREE.Mesh(crustGeo, crustMat);
    crustMesh.rotation.x = Math.PI / 2;
    pizzaGroup.add(crustMesh);

    // Red San Marzano sauce bed
    const sauceGeo = new THREE.CylinderGeometry(0.37, 0.37, 0.015, 32);
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xa82818, // Rich tomato red
      roughness: 0.4,
    });
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    pizzaGroup.add(sauceMesh);

    // Mozzarella cheese patches
    const cheeseGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.02, 12);
    const cheeseMat = new THREE.MeshStandardMaterial({
      color: 0xfffbe6,
      roughness: 0.3,
    });
    const cheesePositions = [
      [0, 0], [0.18, 0.1], [-0.15, 0.12], [0.1, -0.18], [-0.12, -0.14]
    ];
    cheesePositions.forEach(([cx, cz]) => {
      const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
      cheese.position.set(cx, 0.012, cz);
      pizzaGroup.add(cheese);
    });

    // Fresh basil leaves
    const basilGeo = new THREE.BoxGeometry(0.05, 0.005, 0.09);
    const basilMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a2f,
      roughness: 0.5,
    });
    const basil1 = new THREE.Mesh(basilGeo, basilMat);
    basil1.position.set(0.08, 0.025, 0.04);
    basil1.rotation.y = 0.5;
    pizzaGroup.add(basil1);

    const basil2 = new THREE.Mesh(basilGeo, basilMat);
    basil2.position.set(-0.06, 0.025, -0.05);
    basil2.rotation.y = -0.8;
    pizzaGroup.add(basil2);

    // 7. Lossless 60fps Loop with smooth exponential damping
    let frameId = 0;
    const clock = new THREE.Clock();
    const currentLookAt = new THREE.Vector3(0, 0.4, 0);

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Flame flicker modulation
      const intensityMult =
        stateRef.current.flameIntensity === 'high' ? 1.5 :
        stateRef.current.flameIntensity === 'gentle' ? 0.6 : 1.0;
      fireLight.intensity = (2.8 + Math.sin(elapsed * 9) * 0.5 + Math.cos(elapsed * 15) * 0.3) * intensityMult;
      embersMat.emissiveIntensity = (1.8 + Math.sin(elapsed * 11) * 0.6) * intensityMult;

      // Gentle turntable rotation
      if (stateRef.current.isRotating) {
        ovenRoot.rotation.y += delta * 0.25;
      }

      // Smooth damped camera kinematics
      camera.position.x = THREE.MathUtils.damp(camera.position.x, stateRef.current.targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, stateRef.current.targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, stateRef.current.targetCamPos.z, 3.5, delta);

      currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, stateRef.current.targetLookAt.x, 3.5, delta);
      currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, stateRef.current.targetLookAt.y, 3.5, delta);
      currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, stateRef.current.targetLookAt.z, 3.5, delta);

      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      stoneTex.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-[#18110e] border border-[#291C17]/30 shadow-2xl">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Spec / Title Badge */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 bg-[#18110e]/90 backdrop-blur-md text-[#F8F3E9] px-3.5 py-2.5 rounded-xl border border-[#F8F3E9]/15 shadow-lg pointer-events-none">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#C83B28]" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-[#F8F3E9]">
            {t('Modèle 3D Interactif · Four à Bois', 'Interactive 3D Model · Wood Oven')}
          </span>
        </div>
        <p className="text-[10px] text-[#F8F3E9]/60 font-light mt-0.5">
          {t('Voûte réfractaire 450°C · Braises de chêne · Pâte à pizza alvéolée', '450°C refractory dome · Oak embers · Artisan crust')}
        </p>
      </div>

      {/* Unified Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[94%] max-w-xl">
        {/* Collapse / Expand Toggle */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1f1511] text-[#F8F3E9]/80 hover:text-white text-[11px] font-medium uppercase tracking-wider rounded-t-lg border-t border-x border-[#F8F3E9]/15 shadow-md cursor-pointer transition-colors"
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3 text-[#C83B28]" />
                <span>{t('Afficher les commandes', 'Show Controls')}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 text-[#C83B28]" />
                <span>{t('Masquer', 'Hide')}</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Surface */}
        {!isCollapsed && (
          <div className="bg-[#1f1511]/95 backdrop-blur-md text-[#F8F3E9] p-3 rounded-b-xl rounded-t-none border border-[#F8F3E9]/15 shadow-2xl flex flex-wrap items-center justify-between gap-2.5 text-xs">
            {/* Camera Views */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#F8F3E9]/50 mr-1 hidden sm:inline">
                {t('Vues :', 'Views:')}
              </span>
              <button
                type="button"
                onClick={() => setCameraView('overview')}
                className={`px-2.5 py-1 text-[11px] rounded-xs font-medium cursor-pointer transition-colors ${
                  cameraView === 'overview'
                    ? 'bg-[#C83B28] text-white'
                    : 'bg-white/5 text-[#F8F3E9]/75 hover:bg-white/10'
                }`}
              >
                {t('D’ensemble', 'Overview')}
              </button>
              <button
                type="button"
                onClick={() => setCameraView('hearth')}
                className={`px-2.5 py-1 text-[11px] rounded-xs font-medium cursor-pointer transition-colors ${
                  cameraView === 'hearth'
                    ? 'bg-[#C83B28] text-white'
                    : 'bg-white/5 text-[#F8F3E9]/75 hover:bg-white/10'
                }`}
              >
                {t('Foyer & Braises', 'Hearth')}
              </button>
              <button
                type="button"
                onClick={() => setCameraView('pizza')}
                className={`px-2.5 py-1 text-[11px] rounded-xs font-medium cursor-pointer transition-colors ${
                  cameraView === 'pizza'
                    ? 'bg-[#C83B28] text-white'
                    : 'bg-white/5 text-[#F8F3E9]/75 hover:bg-white/10'
                }`}
              >
                {t('Pizza & Pelle', 'Pizza')}
              </button>
            </div>

            {/* Flame & Rotation Toggles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFlameIntensity((prev) =>
                    prev === 'normal' ? 'high' : prev === 'high' ? 'gentle' : 'normal'
                  );
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white/5 hover:bg-white/10 text-[11px] text-[#F8F3E9] cursor-pointer"
                title={t('Régler l’intensité des flammes', 'Adjust flame intensity')}
              >
                <Flame className="w-3 h-3 text-[#C83B28]" />
                <span className="capitalize">{flameIntensity}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xs text-[11px] cursor-pointer transition-colors ${
                  isRotating
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-[#F8F3E9]/60 hover:text-white'
                }`}
                title={t('Rotation automatique', 'Auto rotation')}
              >
                <RotateCw className="w-3 h-3" />
                <span>{isRotating ? '360° On' : '360° Off'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
