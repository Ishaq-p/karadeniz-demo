"use client";

import { useEffect, useRef } from "react";

/**
 * Pure CSS/Canvas moon + pearl scene — replaces the @react-three/fiber
 * version which is incompatible with React 19 (ReactCurrentOwner removal).
 * Achieves the same gold crescent moon + luminous pearl aesthetic via
 * canvas + CSS animations, with no WebGL dependency.
 */
export default function MoonPearlScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const t = frame / 60;

      // ── Pearl glow aura ──────────────────────────────────────────────
      const pearlY = cy + Math.sin(t * 0.7) * 12;
      const pearlX = cx + Math.cos(t * 0.4) * 6;

      const aura = ctx.createRadialGradient(pearlX, pearlY, 0, pearlX, pearlY, 180);
      aura.addColorStop(0, "rgba(212,175,55,0.10)");
      aura.addColorStop(0.4, "rgba(183,148,246,0.06)");
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);

      // ── Crescent moon (gold arc) ─────────────────────────────────────
      const moonX = cx + 60;
      const moonY = cy - 30 + Math.sin(t * 0.5) * 8;
      const moonR = 110;

      // Outer arc (full golden circle)
      const moonGrad = ctx.createRadialGradient(moonX - 20, moonY - 20, 10, moonX, moonY, moonR);
      moonGrad.addColorStop(0, "#F7E7A0");
      moonGrad.addColorStop(0.4, "#D4AF37");
      moonGrad.addColorStop(0.75, "#9C7A24");
      moonGrad.addColorStop(1, "#6B5010");

      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fillStyle = moonGrad;
      ctx.fill();
      ctx.restore();

      // Erase right portion to create crescent shape
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(moonX + 75, moonY - 15, moonR * 0.92, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.restore();

      // Rim highlight on the crescent edge
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(247,231,160,0.25)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Moon glow
      ctx.save();
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, moonR * 1.6);
      moonGlow.addColorStop(0, "rgba(212,175,55,0.08)");
      moonGlow.addColorStop(1, "transparent");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Glowing Pearl ────────────────────────────────────────────────
      const pr = 28 + Math.sin(t * 1.1) * 2; // subtle breathe

      // Pearl outer glow
      const pearlGlowG = ctx.createRadialGradient(pearlX, pearlY, 0, pearlX, pearlY, pr * 4);
      pearlGlowG.addColorStop(0, "rgba(255,253,247,0.35)");
      pearlGlowG.addColorStop(0.3, "rgba(245,240,232,0.15)");
      pearlGlowG.addColorStop(1, "transparent");
      ctx.fillStyle = pearlGlowG;
      ctx.beginPath();
      ctx.arc(pearlX, pearlY, pr * 4, 0, Math.PI * 2);
      ctx.fill();

      // Pearl body
      const pearlBodyG = ctx.createRadialGradient(
        pearlX - pr * 0.3, pearlY - pr * 0.35, pr * 0.05,
        pearlX, pearlY, pr
      );
      pearlBodyG.addColorStop(0, "#FFFDF7");
      pearlBodyG.addColorStop(0.35, "#F5F0E8");
      pearlBodyG.addColorStop(0.7, "#C9C2B4");
      pearlBodyG.addColorStop(1, "#A09080");
      ctx.fillStyle = pearlBodyG;
      ctx.beginPath();
      ctx.arc(pearlX, pearlY, pr, 0, Math.PI * 2);
      ctx.fill();

      // Pearl specular highlight
      ctx.save();
      const specG = ctx.createRadialGradient(
        pearlX - pr * 0.35, pearlY - pr * 0.4, 0,
        pearlX - pr * 0.2, pearlY - pr * 0.2, pr * 0.55
      );
      specG.addColorStop(0, "rgba(255,255,255,0.85)");
      specG.addColorStop(1, "transparent");
      ctx.fillStyle = specG;
      ctx.beginPath();
      ctx.arc(pearlX, pearlY, pr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Ambient sparkles ─────────────────────────────────────────────
      const sparkles = [
        { ox: -140, oy: -80, phase: 0 },
        { ox: 160, oy: -120, phase: 1.2 },
        { ox: -90, oy: 130, phase: 2.4 },
        { ox: 200, oy: 60, phase: 0.8 },
        { ox: -180, oy: 20, phase: 1.8 },
        { ox: 80, oy: -170, phase: 3.1 },
      ];
      sparkles.forEach(({ ox, oy, phase }) => {
        const alpha = (Math.sin(t * 1.3 + phase) + 1) / 2;
        const r = 1.5 + Math.sin(t + phase) * 0.5;
        const color = Math.sin(phase) > 0 ? `rgba(247,231,160,${alpha * 0.8})` : `rgba(183,148,246,${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
