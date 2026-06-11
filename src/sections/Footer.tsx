import { useRef, useState } from 'react';

export default function Footer() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [lineScale, setLineScale] = useState(0);

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        height: '800px',
        backgroundColor: 'var(--void-black)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Main CTA */}
      <a
        ref={linkRef}
        href="mailto:riftstories@outlook.com"
        className="font-display uppercase glitch-hover"
        onMouseEnter={() => setLineScale(1)}
        onMouseLeave={() => setLineScale(0)}
        style={{
          fontSize: 'clamp(40px, 8vw, 120px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        Send us a Message
        <span
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: '#00f0ff',
            transform: `scaleX(${lineScale})`,
            transformOrigin: 'left center',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </a>

      <p
        className="font-body"
        style={{
          marginTop: '40px',
          fontSize: '14px',
          color: 'var(--text-dim)',
          letterSpacing: '0.02em',
        }}
      >
        Let's create something extraordinary together
      </p>

      {/* Bottom Navigation */}
      <div
        className="footer-bottom"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        {/* Left links */}
        <div className="footer-links" style={{ display: 'flex', gap: '40px' }}>
          <a
            href="#manifesto"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            Works
          </a>
          <a
            href="#about"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            About
          </a>
          <a
            href="#contact"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            Contact
          </a>
        </div>

        {/* Center - socials */}
        <div className="footer-socials" style={{ display: 'flex', gap: '40px' }}>
          <a
            href="https://www.instagram.com/rift.stories?igsh=MTFkN3Y3N2Fsa2pnOA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@riftstories_1?si=sX5fCVOQE0A3ZinP"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            YouTube
          </a>
          <a
            href="https://www.facebook.com/share/1LJKHAa557/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@riftstories1?_r=1&_t=ZN-9737y3PFu46"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            TikTok
          </a>
          <a
            href="mailto:hello@aivision.studio"
            className="font-body glitch-hover"
            style={{
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#00f0ff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = 'var(--text-muted)';
            }}
          >
            Email
          </a>
        </div>

        {/* Right - year */}
        <span
          className="data-readout"
          style={{           color: 'var(--text-dim)' }}
        >
          &copy; 2024&ndash;2026
        </span>
      </div>
    </footer>
  );
}
