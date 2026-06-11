import { useEffect, useRef } from 'react';
import { useIsTouchDevice } from '@/hooks/use-is-touch-device';

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[data-cursor-expand]') ||
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON'
      ) {
        isHovering.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[data-cursor-expand]') ||
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON'
      ) {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 2}px, ${target.current.y - 2}px)`;
      }

      if (ringRef.current) {
        const size = isHovering.current ? 40 : 0;
        const opacity = isHovering.current ? 1 : 0;
        ringRef.current.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.opacity = `${opacity}`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'none',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '0px',
          height: '0px',
          border: '1px solid #ffffff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
        }}
      />
    </>
  );
}
