import { useEffect, useRef } from "react";

export function NightSkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Create a static array of stars to draw
    const stars: { x: number; y: number; r: number; a: number; speed: number }[] = [];

    const initStars = () => {
      stars.length = 0;
      // Reduce density slightly for performance
      const numStars = Math.floor((width * height) / 3500); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.1, // radius
          a: Math.random(), // alpha (opacity max)
          speed: Math.random() * 0.015 + 0.005, // twinkle speed
        });
      }
    };

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      // Cap DPR at 1.5 to prevent massive rendering overhead on retina screens
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      initStars();
    };

    window.addEventListener("resize", resize);
    resize();

    // Stars twinkle slowly, so 30fps looks identical and halves the work. Visitors who prefer
    // reduced motion get one still frame; hidden tabs stop drawing entirely.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frameInterval = 1000 / 30;
    let lastFrame = -Infinity;

    const draw = (time: number) => {
      if (time - lastFrame < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);
      
      for (const star of stars) {
        // Smooth twinkle effect using sine wave based on time in seconds
        const alpha = Math.abs(Math.sin((time * 0.001) * star.speed + star.x)) * star.a;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      
      if (!reduceMotion) animationFrameId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(animationFrameId);
      if (!document.hidden) animationFrameId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
      {/* Stars Layer */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full opacity-60" />
      
      {/* Bottom Clouds Layer (Shifted higher) */}
      <div 
        className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/clouds.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "200% auto",
          animation: "pan-clouds-bottom 120s linear infinite",
        }}
      />

      {/* Top Clouds Layer (Mirrored) */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/clouds.webp')",
          backgroundRepeat: "repeat",
          backgroundSize: "200% auto",
          animation: "pan-clouds-bottom 160s linear infinite reverse",
          transform: "scaleY(-1)",
        }}
      />
      
      {/* CSS for panning clouds */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pan-clouds-bottom {
          0% { background-position: 0 -150px; }
          100% { background-position: -2000px -150px; }
        }
      `}} />
    </div>
  );
}
