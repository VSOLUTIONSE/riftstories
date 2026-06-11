import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const isMobile = window.innerWidth < 768;
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLImageElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const meta = metaRef.current;

    if (!section || !textContainer || !videoContainer || !video || !leftText || !rightText || !meta) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          textContainer,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        ).fromTo(
          videoContainer,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        ).fromTo(
          meta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );

        tl.fromTo(
          rightText,
          { x: '100%', opacity: 0.3 },
          { x: '0%', opacity: 1, duration: 0.8 },
          '-=0.6'
        );
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
            markers: false,
          },
        });

        tl.fromTo(
          textContainer,
          { xPercent: 0 },
          { xPercent: -10, ease: 'none' },
          0
        ).fromTo(
          rightText,
          { x: '100%', opacity: 0.3 },
          { x: '0%', opacity: 1, ease: 'none' },
          0
        ).fromTo(
          videoContainer,
          { width: '0%', opacity: 0 },
          { width: '100%', opacity: 1, ease: 'none' },
          0
        ).fromTo(
          video,
          { width: '100%', scale: 1.2 },
          { width: '100%', scale: 1, ease: 'none' },
          0
        ).fromTo(
          meta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: 'none' },
          0.3
        );
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: isMobile ? '100vh' : '300vh',
        backgroundColor: 'var(--void-black)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/reveal.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Text Layer */}
        <div
          ref={textContainerRef}
          className="animated-text"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            width: '100%',
            position: 'relative',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <span
            ref={leftTextRef}
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(24px, 10vw, 120px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              display: 'block',
              color: 'var(--text-primary)',
            }}
          >
            HUMAN
          </span>
          <span
            ref={rightTextRef}
            className="font-display uppercase"
            style={{
              fontSize: 'clamp(24px, 10vw, 120px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              display: 'block',
              color: '#E50914',
              transform: 'translateX(100%)',
            }}
          >
            EMOTION
          </span>
        </div>

        {/* Video/Image Container */}
        <div
          ref={videoContainerRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '0%',
            overflow: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 1,
          }}
        >
          <img
            ref={videoRef}
            src="https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/reveal.jpg"
            alt="AI cinematic data center"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Metadata overlay */}
        <div
          ref={metaRef}
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '40px',
            zIndex: 3,
            opacity: 0,
          }}
        >
          <div className="data-readout" style={{ color: '#00f0ff' }}>
            
          </div>
        </div>
      </div>
    </section>
  );
}
