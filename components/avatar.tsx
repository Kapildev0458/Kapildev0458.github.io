"use client";

import { useEffect, useRef, useState } from "react";

const lines = ["hi! 👋", "thanks for stopping by", "scroll down to level up", "say hi below ↓"];

// The portrait. It leans towards the pointer and says something when clicked.
export function Avatar() {
  const el = useRef<HTMLButtonElement>(null);
  const [said, setSaid] = useState<string | null>(null);
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = node.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        node.style.setProperty("--rx", `${(-dy * 18).toFixed(2)}deg`);
        node.style.setProperty("--ry", `${(dx * 18).toFixed(2)}deg`);
        node.style.setProperty("--px", `${(dx * 14).toFixed(1)}px`);
        node.style.setProperty("--py", `${(dy * 14).toFixed(1)}px`);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  function speak() {
    setSaid(lines[clicks.current++ % lines.length]);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaid(null), 1800);
  }

  return (
    <div className="ava-wrap">
      <button ref={el} className="ava" type="button" onClick={speak} aria-label="Kapil's photo. Click to say hi.">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photo.jpg" alt="" width={304} height={304} />
      </button>
      <span className={said ? "say on" : "say"} aria-live="polite">
        {said}
      </span>
    </div>
  );
}
