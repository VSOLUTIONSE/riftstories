import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const panelImages = [
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-1.jpg',
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-2.jpg',
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-3.jpg',
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-4.jpg',
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-5.jpg',
  'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-6.jpg',
];

export default function RealityCylinder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
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
          backgroundImage: 'url(https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/carousel-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    const panelCount = 6;
    const radius = 3.8;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505');

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 5.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    container.appendChild(renderer.domElement);

    // Cylinder geometry - open-ended half-cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(
      radius, radius, 10, 64, 1, true,
      -Math.PI / 2, Math.PI
    );

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const materials: THREE.MeshBasicMaterial[] = [];

    panelImages.forEach((src) => {
      const texture = textureLoader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;

      // Each panel gets a material
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: false,
      });
      materials.push(mat);
    });

    // Create cylinder with materials array
    // We need to group the faces so each panel gets one image
    // CylinderGeometry segments = 64, so each panel gets 64/panelCount faces
    const cylinder = new THREE.Mesh(cylinderGeometry, materials);
    cylinder.position.z = -radius;
    cylinder.rotation.y = -Math.PI / 2;
    scene.add(cylinder);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add individual image panels as planes for better control
    // Instead of mapping to cylinder, we'll place planes in a semi-circle
    const panelGroup = new THREE.Group();
    scene.add(panelGroup);

    // Remove the cylinder and use planes instead for better visual control
    scene.remove(cylinder);

    const panels: THREE.Mesh[] = [];
    const panelWidth = 2.2;
    const panelHeight = 3.2;
    const arcAngle = Math.PI; // Half circle

    panelImages.forEach((src, i) => {
      const texture = textureLoader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Position on a semi-circle
      const angle = (i / (panelCount - 1)) * arcAngle - arcAngle / 2;
      mesh.position.x = Math.sin(angle) * radius;
      mesh.position.z = Math.cos(angle) * radius - radius;
      mesh.rotation.y = angle;

      panelGroup.add(mesh);
      panels.push(mesh);
    });

    // Scroll-driven rotation state
    const state = {
      scrollSpeed: 0.002,
      meshSpeed: 0,
      targetSpeed: 0,
    };
    let prevScrollY = window.scrollY;

    // Animation
    const animate = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - prevScrollY;
      prevScrollY = currentScrollY;

      state.targetSpeed = scrollDelta * 0.0005;
      state.meshSpeed += (state.targetSpeed - state.meshSpeed) * 0.05;

      // Rotate the entire panel group
      panelGroup.rotation.y += state.meshSpeed;

      // Auto-rotate slowly when not scrolling
      panelGroup.rotation.y += 0.0005;

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
      renderer.dispose();
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
        height: '150vh',
        backgroundColor: 'var(--void-black)',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Canvas */}
      <div
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
        }}
      />

      
      
    </section>
  );
}
