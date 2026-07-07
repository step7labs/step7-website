import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function DigitalThread() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // We want the thread to span the whole document height
    const updateHeight = () => {
      setHeight(document.body.scrollHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    
    // Also observe mutations in case dynamic content changes height
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  // Map scroll progress to SVG stroke dashoffset or simply clip-path
  const clipHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (shouldReduceMotion) {
    return (
      <div className="fixed right-4 md:right-12 top-0 bottom-0 w-px bg-foreground/10 z-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed right-4 md:right-12 top-0 bottom-0 w-8 z-0 pointer-events-none flex justify-center overflow-hidden">
      {/* Background track (dim) */}
      <div className="absolute top-0 bottom-0 w-px bg-foreground/10" />
      
      {/* Scroll-linked glowing line */}
      <motion.div
        className="absolute top-0 w-px bg-gradient-to-b from-transparent via-foreground/40 to-foreground shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        style={{
          bottom: 0,
          clipPath: useTransform(clipHeight, (val) => `inset(0 0 calc(100% - ${val}) 0)`),
        }}
      />
      
      {/* Occasional animated light pulse */}
      <motion.div
        className="absolute top-0 w-[3px] h-32 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        animate={{
          y: ["-100%", "500vh"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 5
        }}
      />
    </div>
  );
}
