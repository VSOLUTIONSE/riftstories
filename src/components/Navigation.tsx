import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.6)',
    background: 'none' as const,
    border: 'none' as const,
    cursor: 'pointer' as const,
    transition: 'color 0.2s ease',
  };

  const links = (
    <>
      <button
        onClick={() => scrollTo('archives')}
        style={linkStyle}
        className="glitch-hover"
      >
        Works
      </button>
      <button
        onClick={() => scrollTo('manifesto')}
        style={linkStyle}
        className="glitch-hover"
      >
        About
      </button>
      <button
        onClick={() => scrollTo('contact')}
        style={linkStyle}
        className="glitch-hover"
      >
        Contact
      </button>
    </>
  );

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
      <div className="flex items-center justify-between h-full px-4 md:px-10">
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

        <div className="hidden md:flex items-center gap-8">
          {links}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden glitch-hover"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? 'transparent' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? 'transparent' : 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: menuOpen ? 'calc(100vh - 80px)' : '0',
          backgroundColor: 'rgba(5, 5, 5, 0.97)',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
          transition: 'height 0.35s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '36px',
          zIndex: 999,
        }}
      >
        <button
          onClick={() => scrollTo('archives')}
          className="font-display uppercase glitch-hover"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
        >
          Works
        </button>
        <button
          onClick={() => scrollTo('manifesto')}
          className="font-display uppercase glitch-hover"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
        >
          About
        </button>
        <button
          onClick={() => scrollTo('contact')}
          className="font-display uppercase glitch-hover"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
        >
          Contact
        </button>
        <div style={{ marginTop: '20px' }}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
