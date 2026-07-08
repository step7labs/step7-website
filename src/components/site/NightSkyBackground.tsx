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

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      for (const star of stars) {
        // Smooth twinkle effect using sine wave based on time in seconds
        const alpha = Math.abs(Math.sin((time * 0.001) * star.speed + star.x)) * star.a;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
      {/* Stars Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      
      {/* Bottom Clouds Layer (Shifted higher) */}
      <div 
        className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/clouds.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200% auto",
          animation: "pan-clouds-bottom 120s linear infinite",
        }}
      />

      {/* Top Clouds Layer (Mirrored) */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/clouds.png')",
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
