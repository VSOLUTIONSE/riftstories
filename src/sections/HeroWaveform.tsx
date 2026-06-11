import { FallingPattern } from "@/components/ui/falling-pattern";
import { PhotoGallery } from "@/components/ui/gallery";

export default function HeroWaveform() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--void-black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <FallingPattern
          color="#00f0ff"
          backgroundColor="var(--void-black)"
          duration={200}
          blurIntensity="0.5em"
          density={1.5}
          className="h-full w-full"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PhotoGallery />
      </div>
    </section>
  );
}
