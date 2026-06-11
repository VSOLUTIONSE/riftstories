import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Agentation } from 'agentation';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroWaveform from './sections/HeroWaveform';
import AboutSection from './sections/AboutSection';
import ManifestoSection from './sections/ManifestoSection';
import SelectedArchives from './sections/SelectedArchives';
import GlassInterface from './sections/GlassInterface';
import RealityCylinder from './sections/RealityCylinder';
import Footer from './sections/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#050505',
        minHeight: '100vh',
        cursor: 'none',
      }}
    >
      {process.env.NODE_ENV === 'development' && <Agentation />}
      <CustomCursor />
      <Navigation />

      <main>
        {/* 1. Hero - Waveform Engine */}
        <HeroWaveform />

        {/* 2. About - Who We Are */}
        <AboutSection />

        {/* 3. Manifesto - Scroll-Scrubbed Video Reveal */}
        <ManifestoSection />

        {/* 4. Selected Archives */}
        <SelectedArchives />

        {/* 5. Glass Interface */}
        <GlassInterface />

        {/* 6. Reality Cylinder */}
        <RealityCylinder />

        {/* 7. Footer / Contact */}
        <Footer />
      </main>

      <WhatsAppWidget />
    </div>
  );
}

export default App;
