export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function ease(n: number) {
  const t = clamp01(n);
  return t * t * (3 - 2 * t);
}

// 0 when a tall section's top reaches the bottom of the header, 1 when its
// bottom reaches the bottom of the screen. null while it isn't laid out.
export function sectionProgress(el: HTMLElement): number | null {
  const box = el.getBoundingClientRect();
  if (!box.height) return null;
  const top = document.querySelector(".bar")?.getBoundingClientRect().bottom ?? 0;
  const travel = box.height - (window.innerHeight - top);
  return travel <= 0 ? 0 : clamp01((top - box.top) / travel);
}

// Runs fn inside a view transition that opens as a circle from the element,
// or just runs it where view transitions aren't supported.
export function circleReveal(from: HTMLElement, fn: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fn();
    return;
  }
  const r = from.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = doc.startViewTransition(fn);
  t.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: "cubic-bezier(.3,.7,.2,1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}
