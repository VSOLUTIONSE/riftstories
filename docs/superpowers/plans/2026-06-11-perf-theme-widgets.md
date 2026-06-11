# Rift Stories — Performance, Theme & Contact Widgets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize mobile performance, add Telegram contact widget, implement light/dark mode toggle

**Architecture:** (1) CSS variable-based theming via `next-themes` with warm off-white light mode palette, (2) Tiered mobile degradation via touch-device detection, (3) Pure CSS animations replacing JS-heavy effects, (4) Combined contact widget floating bottom-right

**Tech Stack:** React 19, Vite 7, Tailwind CSS 3, next-themes, Three.js, GSAP, framer-motion

---

## Task 1: Light Theme CSS Variables & Base Styles

**Files:**
- Modify: `src/index.css`
- Modify: `src/design-system.ts`
- Modify: `index.html`

- [ ] **Step 1: Add light theme CSS variables to index.css**

Add after the existing `:root` block:

```css
/* ─── Light Theme ─────────────────────────── */
.light,
[data-theme="light"] {
  --void-black: #faf6f0;
  --pure-white: #1a1a1a;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --background: 38 30% 96%;
  --foreground: 0 0% 10%;
  --card: 38 30% 96%;
  --card-foreground: 0 0% 10%;
  --popover: 38 30% 96%;
  --popover-foreground: 0 0% 10%;
  --primary: 186 100% 50%;
  --primary-foreground: 0 0% 2%;
  --secondary: 38 20% 90%;
  --secondary-foreground: 0 0% 10%;
  --muted: 38 20% 90%;
  --muted-foreground: 0 0% 40%;
  --accent: 186 100% 50%;
  --accent-foreground: 0 0% 2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 38 15% 85%;
  --input: 38 15% 85%;
  --ring: 186 100% 50%;
}

.light body,
[data-theme="light"] body {
  background-color: #faf6f0;
  color: #1a1a1a;
}

.light .carousel-wrapper,
[data-theme="light"] .carousel-wrapper {
  background-color: #faf6f0;
}
```

Also add theme transition on body:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 2: Update design-system.ts with light mode tokens**

Add a `themes` section to `src/design-system.ts`:

```typescript
export const themes = {
  light: {
    void: '#faf6f0',
    white: '#1a1a1a',
    textPrimary: '#1a1a1a',
    textSecondary: 'rgba(0, 0, 0, 0.8)',
    textMuted: 'rgba(0, 0, 0, 0.5)',
    textDim: 'rgba(0, 0, 0, 0.4)',
    borderSubtle: 'rgba(0, 0, 0, 0.08)',
    borderLight: 'rgba(0, 0, 0, 0.12)',
    bgElevated: 'rgba(0, 0, 0, 0.03)',
  },
} as const;
```

- [ ] **Step 3: Update index.html theme-color**

Add a meta tag that changes with theme (or use media query approach). For now, add both:

```html
<meta name="theme-color" content="#050505" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#faf6f0" media="(prefers-color-scheme: light)" />
```

Replace the existing `<meta name="theme-color" content="#050505" />` with the two above.

- [ ] **Step 4: Commit**

```
git add src/index.css src/design-system.ts index.html
git commit -m "feat: add light theme CSS variables and design tokens"
```

## Task 2: Theme Provider & Toggle Component

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Create ThemeToggle component**

Write `src/components/ThemeToggle.tsx`:

```typescript
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
        className="font-body text-xs tracking-[0.05em] uppercase opacity-40"
        style={{ width: '40px', height: '40px', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Toggle theme"
      >
        —
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
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </>
        ) : (
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
        )}
      </svg>
      <span>{isLight ? 'Dark' : 'Light'}</span>
    </button>
  );
}
```

- [ ] **Step 2: Update main.tsx to wrap with ThemeProvider**

```typescript
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from 'next-themes'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="rift-theme"
    >
      <App />
    </ThemeProvider>
  </BrowserRouter>,
)
```

- [ ] **Step 3: Update Navigation to include ThemeToggle**

Add import to `src/components/Navigation.tsx`:

```typescript
import ThemeToggle from './ThemeToggle';
```

Replace the empty right div (`<div className="flex justify-end" />`) with:

```tsx
<div className="flex justify-end">
  <ThemeToggle />
</div>
```

- [ ] **Step 4: Update App.tsx to use CSS variable for background**

Replace the hardcoded `backgroundColor: '#050505'` in the root div with a dynamic style using CSS class. Change the root div to:

```tsx
<div
  style={{
    backgroundColor: 'var(--void-black)',
    minHeight: '100vh',
    cursor: 'none',
  }}
>
```

Also add a className `bg-void` as a fallback.

- [ ] **Step 5: Commit**

```
git add src/components/ThemeToggle.tsx src/main.tsx src/components/Navigation.tsx src/App.tsx
git commit -m "feat: add theme provider and theme toggle button"
```

## Task 3: Performance — Touch Device Detection & Custom Cursor

**Files:**
- Create: `src/hooks/use-is-touch-device.ts`
- Modify: `src/components/CustomCursor.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create touch device hook**

Write `src/hooks/use-is-touch-device.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isTouch;
}
```

- [ ] **Step 2: Update CustomCursor to skip on touch**

Add import to `src/components/CustomCursor.tsx`:

```typescript
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';
```

Add at top of component:

```typescript
const isTouch = useIsTouchDevice();

useEffect(() => {
  if (isTouch) return;
  // ... rest of existing effect
}, [isTouch]);
```

Make the effect depend on `isTouch`. The return statement should render nothing on touch. Add early return at top of JSX:

```typescript
if (isTouch) return null;
```

- [ ] **Step 3: Update App.tsx cursor rule**

Change cursor rule to use CSS variable approach. The body already has `cursor: none` for fine-pointer devices via CSS. The App div doesn't need `cursor: 'none'` anymore — remove it from inline styles since the CSS handles it properly.

- [ ] **Step 4: Commit**

```
git add src/hooks/use-is-touch-device.ts src/components/CustomCursor.tsx src/App.tsx
git commit -m "perf: disable custom cursor on touch devices"
```

## Task 4: Performance — FallingPattern Pure CSS Animation

**Files:**
- Modify: `src/components/ui/falling-pattern.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Replace framer-motion animation with CSS keyframes**

Update `src/components/ui/falling-pattern.tsx`:

Replace the entire component. Remove the framer-motion import and use a div with CSS animation instead. The animation uses the same background-position but animates via CSS:

```typescript
import type React from 'react';
import { cn } from '@/lib/utils';

type FallingPatternProps = React.ComponentProps<'div'> & {
  color?: string;
  backgroundColor?: string;
  duration?: number;
  blurIntensity?: string;
  density?: number;
};

export function FallingPattern({
  color = 'var(--primary)',
  backgroundColor = 'var(--background)',
  duration = 200,
  blurIntensity = '0.5em',
  density = 1,
  className,
}: FallingPatternProps) {
  const generateBackgroundImage = () => {
    const patterns = [
      `radial-gradient(4px 100px at 0px 235px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 235px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 252px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 252px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 150px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 150px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 253px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 253px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 204px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 204px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 102px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 134px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 134px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 67px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 179px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 179px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 89.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 299px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 299px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 149.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 215px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 215px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 107.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 281px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 281px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 140.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 158px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 158px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 79px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 210px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 210px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 105px, ${color} 100%, transparent 150%)`,
    ];
    return patterns.join(', ');
  };

  const backgroundSizes = [
    '300px 235px', '300px 235px', '300px 235px',
    '300px 252px', '300px 252px', '300px 252px',
    '300px 150px', '300px 150px', '300px 150px',
    '300px 253px', '300px 253px', '300px 253px',
    '300px 204px', '300px 204px', '300px 204px',
    '300px 134px', '300px 134px', '300px 134px',
    '300px 179px', '300px 179px', '300px 179px',
    '300px 299px', '300px 299px', '300px 299px',
    '300px 215px', '300px 215px', '300px 215px',
    '300px 281px', '300px 281px', '300px 281px',
    '300px 158px', '300px 158px', '300px 158px',
    '300px 210px', '300px 210px',
  ].join(', ');

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div
        className="h-full w-full falling-pattern-anim"
        style={{
          backgroundColor,
          backgroundImage: generateBackgroundImage(),
          backgroundSize: backgroundSizes,
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backdropFilter: `blur(${blurIntensity})`,
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 2px)`,
          backgroundSize: `${8 * density}px ${8 * density}px`,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Add CSS keyframe to index.css**

Add to index.css:

```css
@keyframes falling-pattern-scroll {
  from {
    background-position: 0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 230.5px, 100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px, 150px 31px, 153px 31px, 301.5px 120.5px, 175px 235px, 178px 235px, 326.5px 384.5px, 200px 121px, 203px 121px, 351.5px 228.5px, 225px 224px, 228px 224px, 376.5px 364.5px, 250px 26px, 253px 26px, 401.5px 105px, 275px 75px, 278px 75px, 426.5px 180px;
  }
  to {
    background-position: 0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px, 100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px, 150px 9876px, 153px 9876px, 301.5px 9965.5px, 175px 13391px, 178px 13391px, 326.5px 13540.5px, 200px 14741px, 203px 14741px, 351.5px 14848.5px, 225px 18770px, 228px 18770px, 376.5px 18910.5px, 250px 5082px, 253px 5082px, 401.5px 5161px, 275px 6375px, 278px 6375px, 426.5px 6480px;
  }
}

.falling-pattern-anim {
  animation-name: falling-pattern-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: background-position;
}
```

- [ ] **Step 3: Commit**

```
git add src/components/ui/falling-pattern.tsx src/index.css
git commit -m "perf: replace framer-motion falling pattern with pure CSS animation"
```

## Task 5: Performance — Lazy Load Images & Videos

**Files:**
- Modify: `src/components/ui/gallery.tsx`
- Modify: `src/components/ui/elegant-carousel.tsx`
- Modify: `src/sections/AboutSection.tsx`
- Modify: `src/sections/ManifestoSection.tsx`

- [ ] **Step 1: Create IntersectionObserver hook**

Write `src/hooks/use-is-visible.ts`:

```typescript
import { useState, useEffect, useRef, type RefObject } from 'react';

export function useIsVisible<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
```

- [ ] **Step 2: Update PhotoGallery (gallery.tsx) to lazy-load videos**

Replace the video rendering in the `VideoCard` to only mount `<video>` when the card is visible. Use the IntersectionObserver hook. Also reduce to 2 videos on mobile (the current `photos` array already adjusts sizes via `isMobile`).

In `gallery.tsx`, wrap each video card with visibility detection. The key change: only render the `<video>` element when the card is scrolled into view, or use a placeholder video until then.

For simplicity, add `preload="none"` to all videos and only set `src` when visible. Modify the `VideoCard` component to accept an `isVisible` prop:

```typescript
<video
  className={cn("rounded-3xl w-full h-full")}
  src={isVisible ? src : undefined}
  autoPlay
  muted
  loop
  playsInline
  draggable={false}
  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
/>
```

- [ ] **Step 3: Update ElegantCarousel video lazy loading**

In `elegant-carousel.tsx`, only set `src` on the video when the slide is current or adjacent:

```typescript
<video
  ref={videoRef}
  src={currentSlide.videoUrl}
  ...
/>
```

This already only renders one video at a time since only the current slide is shown. Add `preload="metadata"` to the video:

```html
preload="metadata"
```

- [ ] **Step 4: Add loading="lazy" to all img tags**

In `AboutSection.tsx` line 126, the `img` tag for the bio photo. Add `loading="lazy"`.

In `ManifestoSection.tsx` line 165, the `img` tag for the reveal image. Add `loading="lazy"`.

- [ ] **Step 5: Commit**

```
git add src/hooks/use-is-visible.ts src/components/ui/gallery.tsx src/components/ui/elegant-carousel.tsx src/sections/AboutSection.tsx src/sections/ManifestoSection.tsx
git commit -m "perf: lazy-load images and videos with intersection observer"
```

## Task 6: Performance — Three.js Optimization & Content Visibility

**Files:**
- Modify: `src/sections/GlassInterface.tsx`
- Modify: `src/sections/RealityCylinder.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Lower pixel ratio and geometry on mobile for GlassInterface**

In `GlassInterface.tsx`, change pixel ratio line:

```typescript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
```

Already done (line 30). Good.

Reduce geometry segments on mobile:

```typescript
const glassGeometry = new RoundedBoxGeometry(glassSize, glassSize, 1.2, isMobile ? 2 : 4, 0.1);
```

- [ ] **Step 2: Lower pixel ratio on mobile for RealityCylinder**

In `RealityCylinder.tsx`, add isMobile detection and change pixel ratio:

```typescript
const isMobile = window.innerWidth < 768;
// ...
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
```

- [ ] **Step 3: Add content-visibility to App sections**

In `App.tsx`, wrap each section below the fold (everything after HeroWaveform) in a div or add a style prop for content-visibility. The simplest approach: add a CSS class in index.css:

```css
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: 100vh;
}
```

Add this class to all `<section>` elements that are not the first one visible.

- [ ] **Step 4: Commit**

```
git add src/sections/GlassInterface.tsx src/sections/RealityCylinder.tsx src/App.tsx src/index.css
git commit -m "perf: optimize three.js for mobile, add content-visibility"
```

## Task 7: Performance — ManifestoSection Mobile Simplication & Remove App.css

**Files:**
- Modify: `src/sections/ManifestoSection.tsx`
- Modify: `src/App.tsx`
- Delete: `src/App.css`

- [ ] **Step 1: Simplify ManifestoSection on mobile**

Add mobile detection to `ManifestoSection.tsx`. On mobile, instead of the 300vh scroll scrub, use a simpler reveal animation:

```typescript
const isMobile = window.innerWidth < 768;

useEffect(() => {
  if (isMobile) {
    // Simple fade-in animation instead of scrub
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
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.4'
    );

    return () => tl.kill();
  }

  // ... existing full scrub code
}, [isMobile]);
```

Also reduce the section height on mobile from `300vh` to `100vh`:

```typescript
style={{
  position: 'relative',
  height: isMobile ? '100vh' : '300vh',
  backgroundColor: 'var(--void-black)',
}}
```

- [ ] **Step 2: Remove App.css import**

`App.css` contains unused Vite boilerplate. Remove the import from `App.tsx`:

Delete line: `import './App.css'`

Leave the file in place for now (it won't be imported).

- [ ] **Step 3: Commit**

```
git add src/sections/ManifestoSection.tsx src/App.tsx
git commit -m "perf: simplify manifesto section on mobile, remove unused app.css"
```

## Task 8: Contact Widgets — WhatsApp & Telegram

**Files:**
- Create: `src/components/ContactWidgets.tsx`
- Delete: `src/components/WhatsAppWidget.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create ContactWidgets component**

Write `src/components/ContactWidgets.tsx`:

```typescript
export default function ContactWidgets() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end',
      }}
    >
      {/* Telegram */}
      <a
        href="https://t.me/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Telegram"
        className="contact-widget-btn"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#0088cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 136, 204, 0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(0, 136, 204, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 136, 204, 0.4)';
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/2348122090276"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="contact-widget-btn"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Add CSS for contact widget hover scale**

In `index.css`, add:

```css
.contact-widget-btn {
  will-change: transform;
}
```

- [ ] **Step 3: Update App.tsx — replace WhatsAppWidget with ContactWidgets**

In `App.tsx`:
- Remove `import WhatsAppWidget from './components/WhatsAppWidget'`
- Add `import ContactWidgets from './components/ContactWidgets'`
- Replace `<WhatsAppWidget />` with `<ContactWidgets />`

- [ ] **Step 4: Remove WhatsAppWidget.tsx**

Delete the file `src/components/WhatsAppWidget.tsx`.

- [ ] **Step 5: Commit**

```
git add src/components/ContactWidgets.tsx src/App.tsx src/index.css
git rm src/components/WhatsAppWidget.tsx
git commit -m "feat: add Telegram contact widget alongside WhatsApp"
```

## Task 9: Theme — Update All Sections for CSS Variables

**Files:**
- Modify: `src/sections/HeroWaveform.tsx`
- Modify: `src/sections/AboutSection.tsx`
- Modify: `src/sections/ManifestoSection.tsx`
- Modify: `src/sections/SelectedArchives.tsx`
- Modify: `src/sections/GlassInterface.tsx`
- Modify: `src/sections/RealityCylinder.tsx`
- Modify: `src/sections/Footer.tsx`
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Replace hardcoded `#050505` backgrounds with `var(--void-black)` across all sections**

In each section file, replace every occurrence of:
- `backgroundColor: '#050505'` → `backgroundColor: 'var(--void-black)'`
- `backgroundColor: '#050505',` → `backgroundColor: 'var(--void-black)',`
- `background: '#050505'` → `background: 'var(--void-black)'`

Files and their replacements:
- `HeroWaveform.tsx`: lines 10, 28, 30 (style attrs)
- `AboutSection.tsx`: line 91 (section style)
- `ManifestoSection.tsx`: line 87 (section style)
- `SelectedArchives.tsx`: line 5 (section style)
- `GlassInterface.tsx`: line 16, 141 (scene bg, section style)
- `RealityCylinder.tsx`: line 27, 168 (scene bg, section style)
- `Footer.tsx`: line 13 (footer style)
- `Navigation.tsx`: line 30 (nav bg transparency — keep as is, uses rgba(5,5,5,...))

- [ ] **Step 2: Replace text color references where possible**

Replace hardcoded `rgba(255, 255, 255, 0.8)` etc with the CSS variable approach. Since these are in JS style objects, they'll need to be updated via the design system or the CSS variables. For now, focus on the main backgrounds that affect theme switching.

Key text colors that should reference theme CSS variables:
- `color: 'rgba(255, 255, 255, 0.8)'` → `color: 'var(--text-secondary)'`
- `color: 'rgba(255, 255, 255, 0.5)'` → `color: 'var(--text-muted)'`
- `color: 'rgba(255, 255, 255, 0.4)'` → `color: 'var(--text-dim)'`

Add these CSS variables to `:root` and `.light` in index.css:

```css
:root {
  /* ...existing vars... */
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.5);
  --text-dim: rgba(255, 255, 255, 0.4);
}

.light, [data-theme="light"] {
  --text-secondary: rgba(0, 0, 0, 0.8);
  --text-muted: rgba(0, 0, 0, 0.5);
  --text-dim: rgba(0, 0, 0, 0.4);
}
```

- [ ] **Step 3: Commit**

```
git add src/sections/HeroWaveform.tsx src/sections/AboutSection.tsx src/sections/ManifestoSection.tsx src/sections/SelectedArchives.tsx src/sections/GlassInterface.tsx src/sections/RealityCylinder.tsx src/sections/Footer.tsx src/components/Navigation.tsx src/index.css
git commit -m "feat: use CSS variables for theme-aware colors across all sections"
```

## Task 10: Build Verification

- [ ] **Step 1: Run the build**

```
npm run build
```

Expected: Build succeeds with no errors. Check for any TypeScript or import issues.

- [ ] **Step 2: Run dev server to verify**

```
npm run dev
```

Expected: Dev server starts on port 3000. Open in browser, verify theme toggles, widgets visible, no console errors.

- [ ] **Step 3: Fix any issues**

If the build fails, fix reported errors and rebuild.

- [ ] **Step 4: Final commit**

```
git add -A
git commit -m "chore: fix build issues from optimization pass"
```
