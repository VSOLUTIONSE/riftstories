import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useIsVisible } from "@/hooks/use-is-visible";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [galleryRef, galleryVisible] = useIsVisible<HTMLDivElement>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    );

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1, // Reduced from 0.3 to 0.1 since we already have the fade-in delay
      },
    },
  };

  // Animation variants for each photo
  const photoVariants = {
    hidden: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    },
    visible: (custom: { x: any; y: any; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  } satisfies import("framer-motion").Variants;

  // Photo positions - responsive for desktop/mobile
  const photos = [
    {
      id: 1,
      order: 0,
      x: isMobile ? "-80px" : "-220px",
      y: isMobile ? "60px" : "15px",
      zIndex: 30,
      direction: "left" as Direction,
      size: isMobile ? 160 : 280,
      src: "https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/ugc-bag.mp4",
    },
    {
      id: 2,
      order: 1,
      x: isMobile ? "0px" : "0px",
      y: isMobile ? "-40px" : "8px",
      zIndex: 20,
      direction: "right" as Direction,
      size: isMobile ? 180 : 280,
      src: "https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/fashion-showcase.mp4",
    },
    {
      id: 3,
      order: 2,
      x: isMobile ? "80px" : "220px",
      y: isMobile ? "60px" : "22px",
      zIndex: 10,
      direction: "left" as Direction,
      size: isMobile ? 160 : 280,
      src: "https://bvhrxctzw3eenxbl.public.blob.vercel-storage.com/fashion-concert.mp4",
    },
  ];

  return (
    <div ref={galleryRef} className="mt-40 relative">
       <div className="absolute inset-0 max-md:hidden top-[200px] -z-10 h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <p className="lg:text-md my-2 text-center text-xs font-light uppercase tracking-widest text-slate-400">
      A Journey Through Visual Stories
      </p>
      <h3 className="z-20 mx-auto max-w-2xl justify-center bg-clip-text py-3 text-center text-3xl text-transparent md:text-7xl" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), color-mix(in srgb, var(--text-primary) 80%, transparent), var(--text-primary))' }}>
        Welcome to <span className="text-[#00f0ff]">Rift</span> <span className="text-[#E50914]">Stories</span>
      </h3>
      <div className="relative mb-8 h-[300px] md:h-[350px] w-full items-center justify-center lg:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative h-[400px] w-[800px] max-w-[90vw] flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{
                    x: photo.x,
                    y: photo.y,
                    order: photo.order,
                  }}
                >
                  <VideoCard
                    width={photo.size}
                    height={photo.size}
                    src={photo.src}
                    direction={photo.direction}
                    isVisible={galleryVisible}
                  />
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="flex w-full justify-center mb-28 md:pb-0">
      <Button
        className="border-[#E50914]/40 mt-20 text-[#E50914] hover:bg-[#E50914]/10 shadow-[0_0_20px_rgba(229,9,20,0.15)]"
        onClick={() => {
          const el = document.getElementById('archives');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.body.scrollHeight * 0.35, behavior: 'smooth' });
          }
        }}
      >
        View All Stories
      </Button>
      </div>
    </div>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

type Direction = "left" | "right";

export const VideoCard = ({
  src,
  className,
  direction,
  width,
  height,
  isVisible,
}: {
  src: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  isVisible: boolean;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, []);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-sm">
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
      </div>
    </motion.div>
  );
};
