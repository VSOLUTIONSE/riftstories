import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full z-[1000] transition-all duration-300"
      style={{
        height: '80px',
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.6)' : 'transparent',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="grid grid-cols-3 items-center h-full px-4 md:px-10">
        <span
          className="font-display text-white text-xs tracking-[0.05em] uppercase cursor-pointer glitch-hover"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="Scroll to top"
        >
          Rift Stories
        </span>
        <div className="flex justify-center gap-8">
          <button
            onClick={() => scrollTo('archives')}
            className="font-body text-white text-xs tracking-[0.05em] uppercase opacity-60 hover:opacity-100 hover:text-[#00f0ff] transition-all duration-200 glitch-hover"
          >
            Works
          </button>
          <button
            onClick={() => scrollTo('manifesto')}
            className="font-body text-white text-xs tracking-[0.05em] uppercase opacity-60 hover:opacity-100 hover:text-[#00f0ff] transition-all duration-200 glitch-hover"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="font-body text-white text-xs tracking-[0.05em] uppercase opacity-60 hover:opacity-100 hover:text-[#00f0ff] transition-all duration-200 glitch-hover"
          >
            Contact
          </button>
        </div>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
