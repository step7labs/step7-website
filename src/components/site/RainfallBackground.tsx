import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  drift: number;     // Slight horizontal drift
  wobble: number;    // Phase offset for organic movement
  width: number;     // Stroke width — most are sub-pixel
  layer: number;
  spawnDelay: number; // ms before this drop activates
  alive: boolean;
}

/**
 * Cinematic rainfall background.
 *
 * Key differences from v1:
 *  - Many more drops (200-300) but individually almost invisible (2-10% opacity)
 *  - Very short streaks (4-18px) — real rain streaks are tiny at this distance
 *  - Tapered strokes via linear gradients — each drop fades at both ends
 *  - Random slight angles (2-6° drift) for organic feel
 *  - Mix of particle-dots and micro-streaks
 *  - Staggered gradual onset over 6 seconds
 */
export function RainfallBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let width = 0;
    let height = 0;
    let drops: Drop[] = [];
    let animationFrameId: number;
    let isVisible = false;
    let activeTime = 0;
    let lastTime = 0;

    const createDrops = () => {
      drops = [];
      const isMobile = width < 768;
      const scale = isMobile ? 0.55 : 1.0;

      // Layer 1: Distant — tiny dots and micro-streaks, very faint
      const l1 = Math.floor(90 * scale);
      for (let i = 0; i < l1; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          len: Math.random() * 6 + 4,       // 4-10px
          speed: 0.3 + Math.random() * 0.3,  // very slow
          opacity: 0.02 + Math.random() * 0.03, // 2-5%
          drift: (Math.random() - 0.5) * 0.15,
          wobble: Math.random() * Math.PI * 2,
          width: 0.5 + Math.random() * 0.3,  // sub-pixel
          layer: 1,
          spawnDelay: Math.random() * 2500,   // 0-2.5s
          alive: false,
        });
      }

      // Layer 2: Primary — slightly longer, still subtle
      const l2 = Math.floor(100 * scale);
      for (let i = 0; i < l2; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          len: Math.random() * 8 + 6,        // 6-14px
          speed: 0.5 + Math.random() * 0.4,
          opacity: 0.04 + Math.random() * 0.04, // 4-8%
          drift: (Math.random() - 0.5) * 0.2,
          wobble: Math.random() * Math.PI * 2,
          width: 0.6 + Math.random() * 0.4,
          layer: 2,
          spawnDelay: 1800 + Math.random() * 2500, // 1.8-4.3s
          alive: false,
        });
      }

      // Layer 3: Foreground — occasional slightly brighter accent streaks
      const l3 = Math.floor(30 * scale);
      for (let i = 0; i < l3; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          len: Math.random() * 8 + 10,       // 10-18px
          speed: 0.7 + Math.random() * 0.5,
          opacity: 0.06 + Math.random() * 0.08, // 6-14%
          drift: (Math.random() - 0.5) * 0.25,
          wobble: Math.random() * Math.PI * 2,
          width: 0.8 + Math.random() * 0.6,
          layer: 3,
          spawnDelay: 3500 + Math.random() * 2500, // 3.5-6s
          alive: false,
        });
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createDrops();
    };

    resize();
    window.addEventListener("resize", resize);

    // Visibility — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) lastTime = performance.now();
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min(now - (lastTime || now), 50); // cap delta
      lastTime = now;
      activeTime += dt;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Gradual spawn
        if (!d.alive) {
          if (activeTime >= d.spawnDelay) {
            d.alive = true;
            d.y = -(Math.random() * height * 0.3); // start above viewport
          }
          continue;
        }

        // Slight organic wobble
        const wobbleX = Math.sin(now * 0.0008 + d.wobble) * 0.15;

        // Update position
        d.y += d.speed * (dt / 16.67);
        d.x += (d.drift + wobbleX) * (dt / 16.67);

        // Recycle when past bottom
        if (d.y > height + d.len) {
          d.y = -(d.len + Math.random() * 40);
          d.x = Math.random() * width;
        }
        // Wrap horizontally
        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;

        // Draw tapered raindrop using gradient stroke
        const endX = d.x + d.drift * d.len * 0.3;
        const endY = d.y + d.len;

        // Create a gradient that fades at both ends for a natural tapered look
        const grad = ctx.createLinearGradient(d.x, d.y, endX, endY);
        grad.addColorStop(0, `rgba(200, 210, 220, 0)`);
        grad.addColorStop(0.25, `rgba(200, 210, 220, ${d.opacity})`);
        grad.addColorStop(0.7, `rgba(200, 210, 220, ${d.opacity * 0.7})`);
        grad.addColorStop(1, `rgba(200, 210, 220, 0)`);

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
