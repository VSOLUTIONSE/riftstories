import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'default',
          color: 'rgba(255,255,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
          opacity: 0.4,
          visibility: 'visible',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0 }}>
          <circle cx="12" cy="12" r="5" />
        </svg>
        <span>—</span>
      </button>
    );
  }

  const isLight = theme === 'light';

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="glitch-hover"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: isLight ? '#1a1a1a' : 'rgba(255,255,255,0.6)',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {isLight ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </>
        )}
      </svg>
      <span>{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}
