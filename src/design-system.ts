/**
 * AIVISION Design System
 *
 * This is the single source of truth for all design tokens,
 * component patterns, and conventions used across the project.
 */

/* ─── Colors ─────────────────────────────────── */
export const colors = {
  void: '#050505',
  white: '#ffffff',
  cyan: '#00f0ff',
  cyanDim: 'rgba(0, 240, 255, 0.15)',
  netflixRed: '#E50914',
  borderSubtle: 'rgba(255, 255, 255, 0.1)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
  textDim: 'rgba(255, 255, 255, 0.4)',
  borderLight: 'rgba(255, 255, 255, 0.15)',
  bgElevated: 'rgba(255, 255, 255, 0.05)',
} as const;

/* ─── Font Family ────────────────────────────── */
export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
} as const;

/* ─── Typography Scale ───────────────────────── */
export const typeScale = {
  dataReadout: {
    fontFamily: fonts.body,
    fontSize: '11px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  overline: {
    fontFamily: fonts.body,
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  eyebrow: {
    fontFamily: fonts.body,
    fontSize: '14px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  body: {
    fontFamily: fonts.body,
    fontSize: '16px',
    lineHeight: 1.8,
    color: colors.textSecondary,
  },
  h2: {
    fontFamily: fonts.display,
    fontSize: 'clamp(32px, 5vw, 72px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
    textTransform: 'uppercase',
    color: colors.white,
  },
  h3: {
    fontFamily: fonts.display,
    fontSize: 'clamp(28px, 5vw, 64px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    textTransform: 'uppercase',
    color: colors.white,
  },
  heroCta: {
    fontFamily: fonts.display,
    fontSize: 'clamp(40px, 8vw, 120px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: colors.white,
    textDecoration: 'none',
  },
  carouselTitle: {
    fontFamily: fonts.display,
    fontSize: 'clamp(36px, 5vw, 64px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    color: colors.white,
  },
} as const;

/* ─── Spacing ────────────────────────────────── */
export const spacing = {
  sectionVertical: '160px',
  sectionPaddingX: '40px',
  sectionPaddingXMobile: '24px',
  gridGapLg: '80px',
  gridGapMd: '40px',
  gridGapSm: '24px',
  stackXl: '120px',
  stackLg: '60px',
  stackMd: '48px',
  stackSm: '40px',
  stackXs: '16px',
  sectionDivider: '60px',
} as const;

/* ─── Layout ─────────────────────────────────── */
export const layout = {
  maxWidth: '1440px',
  maxWidthNarrow: '1280px',
  grid2Col: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.gridGapLg, alignItems: 'start' },
  grid4Col: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.gridGapMd },
  sectionPadding: { paddingLeft: spacing.sectionPaddingX, paddingRight: spacing.sectionPaddingX },
  container: { maxWidth: '1440px', margin: '0 auto', paddingLeft: spacing.sectionPaddingX, paddingRight: spacing.sectionPaddingX },
} as const;

/* ─── Section Background ─────────────────────── */
export const sectionBg = {
  backgroundColor: colors.void,
  paddingTop: spacing.sectionVertical,
  paddingBottom: spacing.sectionVertical,
} as const;

/* ─── Borders & Dividers ─────────────────────── */
export const borders = {
  sectionDivider: { height: '1px', width: '100%', backgroundColor: colors.borderSubtle },
  subtleBottom: { borderBottom: `1px solid ${colors.borderSubtle}` },
  carouselArrow: { border: `1px solid ${colors.borderLight}`, borderRadius: '50%' },
} as const;

/* ─── Effects ────────────────────────────────── */
export const effects = {
  glitchHover: 'glitch-hover',
  transitionColor: { transition: 'color 0.2s ease' },
  hoverToCyan: { color: colors.textMuted, transition: 'color 0.2s ease', cursor: 'default' },
  cyanGlow: `0 0 40px ${colors.cyanDim}`,
  netflixGlow: '0 0 20px rgba(229, 9, 20, 0.15)',
  glassBackdrop: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${colors.borderLight}`,
  },
} as const;

/* ─── Animations (GSAP defaults) ─────────────── */
export const animation = {
  duration: { fast: 0.6, normal: 0.8, slow: 1 },
  ease: { out: 'power3.out', spring: 'spring(70, 12, 1)' },
  scrollTrigger: { start: 'top 80%', toggleActions: 'play none none none' },
  stagger: { fast: 0.1, normal: 0.15 },
  from: { up: { opacity: 0, y: 60 }, fade: { opacity: 0, y: 40 }, subtle: { opacity: 0, y: 30 } },
  to: { visible: { opacity: 1, y: 0 } },
} as const;

/* ─── Scrollbar ──────────────────────────────── */
export const scrollbar = {
  width: '4px',
  track: colors.void,
  thumb: 'rgba(255, 255, 255, 0.15)',
  thumbHover: colors.cyan,
} as const;

/* ─── Responsive Breakpoints ─────────────────── */
export const breakpoints = {
  mobile: '320px',
  tablet: '640px',
  desktop: '1024px',
  large: '1280px',
} as const;

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.tablet})`,
  tablet: `(min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
  large: `(min-width: ${breakpoints.large})`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

/* ─── Component Recipes ──────────────────────── */

export const components = {
  /** Ghost button with cyan text used in AboutSection CTA */
  ghostCyan: {
    fontFamily: fonts.body,
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: colors.cyan,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  /** Inline link style for footer nav links */
  footerLink: {
    fontFamily: fonts.body,
    fontSize: '11px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: colors.textMuted,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },

  /** Netflix red variant */
  netflixAccent: {
    color: colors.netflixRed,
  },

  /** Profile image border treatment (organic blob shape) */
  profileBlob: {
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    border: `2px solid ${colors.cyanDim}`,
    boxShadow: effects.cyanGlow,
  },

  /** Service category heading in AboutSection */
  serviceCategory: {
    fontFamily: fonts.display,
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: colors.white,
    paddingBottom: '16px',
    borderBottom: `1px solid ${colors.borderSubtle}`,
    marginBottom: '16px',
  },

  /** Service list item */
  serviceItem: {
    fontFamily: fonts.body,
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: colors.textMuted,
    paddingTop: '8px',
    paddingBottom: '8px',
    transition: 'color 0.2s ease',
    cursor: 'default',
  },
} as const;

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

/* ─── Usage Guide ──────────────────────────────
 *
 *   import { colors, fonts, spacing, components } from '@/design-system'
 *
 *   <section style={{ backgroundColor: colors.void, ...spacing.sectionPadding }}>
 *     <h2 className="font-display" style={typeScale.h2}>
 *       Title
 *     </h2>
 *   </section>
 *
 * ──────────────────────────────────────────────── */
