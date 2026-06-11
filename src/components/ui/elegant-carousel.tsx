import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../index.css';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
}

const slides: SlideData[] = [
  {
    title: 'Luxury Bag UGC',
    subtitle: 'Exotic Brand — User-Generated Content',
    description:
      'A cinematic UGC ad for a leading exotic luxury bag brand. Every frame highlights the meticulous craftsmanship, rich texture, and the quiet confidence of understated elegance.',
    accent: '#d4a853',
    imageUrl:
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/ugc-bag.mp4',
  },
  {
    title: 'Amura Collection',
    subtitle: 'Luxury Clothing Brand — Showcase',
    description:
      'A visual showcase for Amura, where contemporary design meets timeless tailoring. Each piece tells a story of refined craftsmanship and bold sophistication.',
    accent: '#1a1a2e',
    imageUrl:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/fashion-showcase.mp4',
  },
  {
    title: 'Fashion Concert Runway',
    subtitle: 'Live Runway — Music & Fashion',
    description:
      'An electrifying fashion concert runway where music and design collide. Models move to the rhythm, creating an immersive live experience that blurs the line between performance and art.',
    accent: '#E50914',
    imageUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/fashion-concert.mp4',
  },
  {
    title: 'Folk Tale',
    subtitle: 'African Drama — Coming of Age Story',
    description:
      'A spoilt Nigerian teenager falls for his secondary school teacher. She turns him down gently and tells him to channel that energy into his books. He listens. He graduates with a first class.',
    accent: '#E50914',
    imageUrl:
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/folk-tale.mp4',
  },
  {
    title: 'Hotel UGC Ad',
    subtitle: 'Palm Classic Hotel, Benin City',
    description:
      'A UGC ad for Palm Classic Hotel in Benin City. We captured the ambience, the poolside, the restaurant, and the kind of customer service that makes you want to book a stay.',
    accent: '#00f0ff',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/ugc-hotel.mp4',
  },
  {
    title: 'Wonder Realm',
    subtitle: 'Animated Storytelling',
    description:
      'AI-powered animation that brings imagination to life. Vibrant worlds and playful characters crafted for audiences of all ages.',
    accent: '#ffffff',
    imageUrl:
      'https://images.unsplash.com/photo-1617957710614-7d0cb90a00e8?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/kids-animation.mp4',
  },
  {
    title: 'Gas & Go',
    subtitle: 'Business Ad for a Cooking Gas Station',
    description:
      'A high-energy commercial for a cooking gas station that delivers straight to your door. We show how they make cooking easy and reliable, all through the lens of AI-driven storytelling.',
    accent: '#E50914',
    imageUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=1200&fit=crop&q=80',
    isVideo: true,
    videoUrl:
      'https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/marketting-ad-cooking-gas.mp4',
  },
];

export default function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [resettingProgress, setResettingProgress] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, _dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setResettingProgress(true);
      setProgress(0);
      setTimeout(() => setResettingProgress(false), 80);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image / Video */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            {currentSlide.isVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={currentSlide.videoUrl}
                  className="carousel-image"
                  playsInline
                  preload="metadata"
                  aria-label={currentSlide.title}
                  title={currentSlide.title}
                  onClick={() => {
                    if (!videoRef.current) return;
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                      setVideoPlaying(true);
                    } else {
                      videoRef.current.pause();
                      setVideoPlaying(false);
                    }
                  }}
                />
                {!videoPlaying && (
                  <div
                    onClick={() => {
                      if (!videoRef.current) return;
                      videoRef.current.play();
                      setVideoPlaying(true);
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.45)',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(0, 0, 0, 0.45)';
                    }}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                        background: 'rgba(229, 9, 20, 0.8)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                        (e.currentTarget as HTMLElement).style.background = '#E50914';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(229, 9, 20, 0.8)';
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="carousel-image"
              />
            )}
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                  transition: index === currentIndex && resettingProgress ? 'none' : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{slide.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
