"use client";

import { m, useMotionValue, useTransform } from "motion/react";
import { ReactNode, useRef, MouseEvent } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Glassmorphism card with a mouse-tracking orange glow border.
 * Inspired by Magic UI hover glow effect.
 */
export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,107,53,0.12), transparent 60%)`
  );

  return (
    <m.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      {/* Mouse-tracking glow overlay */}
      <m.div
        style={{
          background,
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {children}
    </m.div>
  );
}
