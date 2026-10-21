"use client";

import { circleReveal } from "@/lib/scroll";

export function ThemeToggle() {
  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    circleReveal(e.currentTarget, () => {
      root.dataset.theme = next;
    });
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button className="tbtn" type="button" onClick={toggle} aria-label="Switch light or dark theme">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
    </button>
  );
}
