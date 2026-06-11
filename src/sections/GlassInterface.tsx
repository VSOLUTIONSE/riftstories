import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export default function GlassInterface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--void-black)',
          overflow: 'hidden',
          backgroundImage: 'url(https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/glass-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '24px',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <div className="data-readout" style={{ marginBottom: '8px' }}>
            RIFT STORIES
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            pointerEvents: 'none',
            textAlign: 'center',
            maxWidth: '700px',
            width: '90%',
          }}
        >
          <h3
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(28px, 5vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
            }}
          >
            Telling Stories.
            <br />
            <span style={{ color: '#E50914' }}>Reimagining</span> the Future.
          </h3>
        </div>
      </section>
    );
  }

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505');

    const isMobile = window.innerWidth < 768;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, isMobile ? 6 : 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Load background texture
    const textureLoader = new THREE.TextureLoader();
    const bgTexture = textureLoader.load('https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/glass-bg.jpg');
    bgTexture.colorSpace = THREE.SRGBColorSpace;

    // Background plane
    const bgGeometry = new THREE.PlaneGeometry(12, 12);
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.DoubleSide,
    });
    const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
    bgPlane.position.z = -3;
    scene.add(bgPlane);

    // Glass block
    const glassSize = isMobile ? 2.8 : 4;
    const glassGeometry = new RoundedBoxGeometry(glassSize, glassSize, 1.2, isMobile ? 2 : 4, 0.1);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 1.0,
      thickness: 1.5,
      roughness: 0.05,
      metalness: 0.0,
      ior: 1.7,
      dispersion: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      color: new THREE.Color('#ffffff'),
      transparent: true,
      opacity: 1.0,
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    scene.add(glass);

    // Lighting
    const rectLight = new THREE.RectAreaLight(0xffffff, 2.0, 6, 6);
    rectLight.position.set(-3, 4, 4);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);

    const spotLight = new THREE.SpotLight(0x00f0ff, 5.0);
    spotLight.position.set(4, 2, 6);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 1;
    spotLight.distance = 50;
    spotLight.lookAt(0, 0, 0);
    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouseMove);

    // Animation
    const startTime = performance.now();
    const animate = () => {
      const time = (performance.now() - startTime) / 1000;

      // Breathing micro-motion
      glass.rotation.y = Math.sin(time * 0.5) * 0.05 + mouse.x * 0.1;
      glass.rotation.x = Math.cos(time * 0.4) * 0.05 - mouse.y * 0.1;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--void-black)',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Canvas */}
      <div
        ref={canvasContainerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Overlay Text - Technical Readouts */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '40px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div className="data-readout" style={{ marginBottom: '8px' }}>
          RIFT STORIES
        </div>
       
      </div>


      {/* Center Tagline */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          pointerEvents: 'none',
          textAlign: 'center',
          maxWidth: '700px',
          width: '90%',
        }}
      >
        <h3
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(28px, 5vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}
        >
          Telling Stories.
          <br />
          <span style={{ color: '#E50914' }}>Reimagining</span> the Future.
        </h3>
      </div>

    </section>
  );
}
