import { useEffect, useRef } from "react";
import { useCursorScroll } from "../../hooks/useCursorScroll";

interface HeroAnimationProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  color: string;
  size: number;
  phase: number;
  maxConnections: number;
  isGlowing: boolean;
}

interface Pulse {
  fromNode: Node;
  toNode: Node;
  progress: number;
  speed: number;
}

export function HeroAnimation({ sectionRef }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getUpdate } = useCursorScroll(sectionRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const primary = rootStyles.getPropertyValue("--brand-primary").trim() || "#F9F9F9";
    const secondary = rootStyles.getPropertyValue("--brand-secondary").trim() || "#AFAFAF";
    const accent = rootStyles.getPropertyValue("--brand-accent").trim() || "#6B6B6B";
    const lineMuted =
      rootStyles.getPropertyValue("--line-muted").trim() || "rgba(249, 249, 249, 0.12)";
    const pulseColor = rootStyles.getPropertyValue("--pulse-color").trim() || "#FFFFFF";

    const colors = [primary, secondary, accent];

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId: number;

    const initNodes = () => {
      const padding = 200;
      const nodeCount = Math.min(Math.floor((width * height) / 7000), 180);
      nodes = [];

      // Minimum distance between nodes to ensure even distribution (no clumps)
      const minSpawnDistSq = 60 * 60;

      let attempts = 0;
      while (nodes.length < nodeCount && attempts < nodeCount * 10) {
        attempts++;
        const ox = Math.random() * (width + padding * 2) - padding;
        const oy = Math.random() * (height + padding * 2) - padding;

        let tooClose = false;
        for (const n of nodes) {
          const dx = n.x - ox;
          const dy = n.y - oy;
          if (dx * dx + dy * dy < minSpawnDistSq) {
            tooClose = true;
            break;
          }
        }

        if (tooClose) continue;

        // Neural Network / Constellation hybrid: mostly 2 connections (constellation), some 3-4 (neural hubs)
        const rand = Math.random();
        const maxConnections = rand > 0.85 ? 4 : rand > 0.6 ? 3 : 2;
        const isGlowing = Math.random() > 0.8; // 20% of stars get a strong glowing twinkle

        nodes.push({
          x: ox,
          y: oy,
          vx: 0,
          vy: 0,
          baseX: ox,
          baseY: oy,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 1.2 + 1.0,
          phase: Math.random() * Math.PI * 2,
          maxConnections,
          isGlowing,
        });
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const newWidth = parent.clientWidth;
        const newHeight = parent.clientHeight;

        if (
          Math.abs(width - newWidth) < 50 &&
          Math.abs(height - newHeight) < 50 &&
          nodes.length > 0
        ) {
          return;
        }

        width = newWidth;
        height = newHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          initNodes();
        }, 150);
      }
    };

    if (canvas.parentElement) {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initNodes();
    }

    window.addEventListener("resize", handleResize);

    const spawnPulse = () => {
      if (nodes.length === 0) return;
      const fromNode = nodes[Math.floor(Math.random() * nodes.length)];

      // Find a random connected node (we calculate nearby dynamically now)
      const nearby = [];
      const maxDist = 160;
      for (const n of nodes) {
        if (n === fromNode) continue;
        const dx = n.x - fromNode.x;
        const dy = n.y - fromNode.y;
        if (dx * dx + dy * dy < maxDist * maxDist) {
          nearby.push(n);
        }
      }

      if (nearby.length > 0) {
        const toNode = nearby[Math.floor(Math.random() * nearby.length)];
        pulses.push({
          fromNode,
          toNode,
          progress: 0,
          speed: 0.008 + Math.random() * 0.012,
        });
      }
    };

    const pulseInterval = setInterval(spawnPulse, 800);

    let time = 0;
    const render = () => {
      time += 0.01;
      const state = getUpdate(0.08);

      if (!state.inView || state.isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const globalAlpha = Math.max(0, 1 - state.scrollProgress * 1.5);
      ctx.globalAlpha = globalAlpha;

      ctx.save();
      ctx.translate(0, state.scrollProgress * height * 0.15);

      // Use targetCursor instead of lerped cursor for physics to ensure instant, 100% reliable avoidance
      const cursorPx = state.targetCursorX * window.innerWidth;
      const cursorPy = state.targetCursorY * window.innerHeight;

      // Slightly increased cursor interaction so it feels more responsive
      const maxRepelDist = 140;
      const avoidanceRadius = 60;

      const padding = 200;

      // Global drift for the entire universe
      const globalDriftX = -0.25;
      const globalDriftY = -0.15;

      // Update physics for nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Drift the base position (the resting spot in the constellation)
        node.baseX += globalDriftX;
        node.baseY += globalDriftY;

        // Wrap base position around edges to create infinite flow
        if (node.baseX < -padding) {
          node.baseX += width + padding * 2;
          node.x += width + padding * 2;
        }
        if (node.baseX > width + padding) {
          node.baseX -= width + padding * 2;
          node.x -= width + padding * 2;
        }
        if (node.baseY < -padding) {
          node.baseY += height + padding * 2;
          node.y += height + padding * 2;
        }
        if (node.baseY > height + padding) {
          node.baseY -= height + padding * 2;
          node.y -= height + padding * 2;
        }

        // Organic wander around the base position
        const targetX = node.baseX + Math.sin(time + node.phase) * 20;
        const targetY = node.baseY + Math.cos(time + node.phase * 1.5) * 20;

        // Gentle spring force pulling node back to its resting spot in the network
        node.vx += (targetX - node.x) * 0.015;
        node.vy += (targetY - node.y) * 0.015;

        // Cursor repulsion
        const dx = node.x - cursorPx;
        const dy = node.y - cursorPy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < avoidanceRadius && dist > 0) {
          const pushDist = avoidanceRadius - dist;
          node.x += (dx / dist) * pushDist;
          node.y += (dy / dist) * pushDist;
          node.vx += (dx / dist) * 2.5;
          node.vy += (dy / dist) * 2.5;
        } else if (dist < maxRepelDist && dist > 0) {
          const force = (maxRepelDist - dist) / maxRepelDist;
          node.vx += (dx / dist) * force * 0.8;
          node.vy += (dy / dist) * force * 0.8;
        }

        // Apply friction
        node.vx *= 0.9;
        node.vy *= 0.9;

        // Update actual position
        node.x += node.vx;
        node.y += node.vy;
      }

      // Draw edges (calculated dynamically every frame to form true constellations)
      ctx.lineWidth = 1;
      const maxDistSq = 140 * 140;

      // Store drawn lines to prevent double drawing and opacity stacking
      const drawnLines = new Set<string>();

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Find closest neighbors
        const neighbors = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            neighbors.push({ idx: j, node: n2, distSq });
          }
        }

        // Sort by distance and connect up to node's maxConnections
        neighbors.sort((a, b) => a.distSq - b.distSq);
        const closestNeighbors = neighbors.slice(0, n1.maxConnections);

        for (const neighbor of closestNeighbors) {
          const n2 = neighbor.node;
          const lineId = i < neighbor.idx ? `${i}-${neighbor.idx}` : `${neighbor.idx}-${i}`;

          if (!drawnLines.has(lineId)) {
            drawnLines.add(lineId);

            const distanceRatio = Math.sqrt(neighbor.distSq) / 140;
            const edgeOpacity = 1 - Math.pow(distanceRatio, 3);

            ctx.globalAlpha = globalAlpha * edgeOpacity;
            ctx.strokeStyle = "rgba(249, 249, 249, 0.16)"; // slightly dimmer

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = globalAlpha;

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = pulse.fromNode.x + (pulse.toNode.x - pulse.fromNode.x) * pulse.progress;
        const py = pulse.fromNode.y + (pulse.toNode.y - pulse.fromNode.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor;
        ctx.shadowBlur = 12;
        ctx.shadowColor = pulseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (node.isGlowing ? 0.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = node.color;

        if (node.isGlowing) {
          // Twinkling effect
          const twinkle = Math.sin(time * 3 + node.phase) * 0.5 + 0.5;
          ctx.shadowBlur = 10 + twinkle * 15;
          ctx.shadowColor = node.color;
          ctx.globalAlpha = globalAlpha * (0.6 + twinkle * 0.4);
        } else {
          ctx.shadowBlur = 0;
          ctx.globalAlpha = globalAlpha * 0.6;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sectionRef, getUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
