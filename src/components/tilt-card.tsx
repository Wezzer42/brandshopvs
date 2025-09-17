"use client";

import { useRef, type ReactNode } from "react";

export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    const mx = x / r.width - 0.5; const my = y / r.height - 0.5;
    el.style.setProperty("--rx", `${-my * 6}deg`);
    el.style.setProperty("--ry", `${mx * 8}deg`);
    el.style.setProperty("--tx", `${mx * 6}px`);
    el.style.setProperty("--ty", `${my * 6}px`);
    el.style.setProperty("--x", `${(x / r.width) * 100}%`);
    el.style.setProperty("--y", `${(y / r.height) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className ? `tilt-card ${className}` : "tilt-card"}>
      {children}
    </div>
  );
}