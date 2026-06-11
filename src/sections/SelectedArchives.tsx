import ElegantCarousel from '../components/ui/elegant-carousel';

export default function SelectedArchives() {
  return (
    <section id="archives" style={{ backgroundColor: 'var(--void-black)', paddingTop: '120px', paddingBottom: '120px' }}>
      <div style={{ paddingLeft: '40px', paddingRight: '40px', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="section-divider" style={{ marginBottom: '60px' }} />
        <h2
          className="font-display uppercase"
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            paddingBottom: '40px',
            color: 'var(--text-primary)',
          }}
        >
          Some of my
          <br />
          <span style={{ color: '#00f0ff' }}>creations</span> and stories
        </h2>
      </div>
      <ElegantCarousel />
    </section>
  );
}
