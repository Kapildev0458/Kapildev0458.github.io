"use client";

import { useEffect, useRef, useState } from "react";

// A small pixel-art Doberman that follows the cursor. It runs to the cursor,
// wags its tail, sits after a while, falls asleep, and jumps and barks when clicked.
// Each frame is a 16×12 pixel map: k = black coat, t = tan, e = eye, n = nose, c = collar.

const FRAMES = {
  stand: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    "k.........kkekk.",
    ".k........kktttn",
    "..kkkkkkkkcckk..",
    "..kkkkkkkkkkk...",
    "..kkkkkkkkkkt...",
    "..kk.......kk...",
    "..kk.......kk...",
    "..tt.......tt...",
  ],
  standWag: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    ".k........kkekk.",
    ".k........kktttn",
    "..kkkkkkkkcckk..",
    "..kkkkkkkkkkk...",
    "..kkkkkkkkkkt...",
    "..kk.......kk...",
    "..kk.......kk...",
    "..tt.......tt...",
  ],
  run1: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    "..........kkekk.",
    "kk........kktttn",
    "..kkkkkkkkcckk..",
    "..kkkkkkkkkkk...",
    "..kkkkkkkkkkt...",
    ".kk.........kk..",
    "kk...........kk.",
    "t.............t.",
  ],
  run2: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    "..........kkekk.",
    ".kk.......kktttn",
    "..kkkkkkkkcckk..",
    "..kkkkkkkkkkk...",
    "..kkkkkkkkkkt...",
    "...kk.....kk....",
    "....kk...kk.....",
    ".....t...t......",
  ],
  sit: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    "..........kkekk.",
    "..........kktttn",
    ".........cckk...",
    ".........kkkk...",
    "........kkkkk...",
    ".......kkkkktk..",
    "......kkkkkktk..",
    "..kkkkkkkkkttt..",
  ],
  sitWag: [
    "...........k....",
    "..........kk....",
    "..........kkkk..",
    "..........kkekk.",
    "..........kktttn",
    ".........cckk...",
    ".........kkkk...",
    "........kkkkk...",
    ".......kkkkktk..",
    ".k....kkkkkktk..",
    "..kkkkkkkkkttt..",
  ],
  sleep: [
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "..........k.....",
    "..........kkkk..",
    "..kkkkkkkkkkkkk.",
    ".kkkkkkkkkkkkttn",
    "..tt.....tttttt.",
  ],
};

type Pose = keyof typeof FRAMES;

const COLORS: Record<string, string> = {
  k: "#1f1a1c",
  t: "#b8652e",
  e: "#ffffff",
  n: "#0b0a0b",
  c: "var(--accent)",
};

// One SVG path per color for each frame, built once.
const SPRITES = Object.fromEntries(
  Object.entries(FRAMES).map(([pose, rows]) => {
    const byColor: Record<string, string> = {};
    rows.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (COLORS[ch]) byColor[ch] = (byColor[ch] ?? "") + `M${x} ${y}h1v1h-1z`;
      }),
    );
    return [pose, Object.entries(byColor)];
  }),
) as Record<Pose, [string, string][]>;

const SCALE = 3;
const W = 16 * SCALE;
const H = 12 * SCALE;

function canRun() {
  return (
    window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function Dog() {
  const [enabled, setEnabled] = useState(false);
  const [pose, setPose] = useState<Pose>("sit");
  const [flip, setFlip] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [jumping, setJumping] = useState(false);
  const el = useRef<HTMLDivElement>(null);
  const lastActive = useRef(0);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function say(text: string, ms: number) {
    setBubble(text);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }

  function bark() {
    lastActive.current = performance.now();
    setJumping(false);
    requestAnimationFrame(() => setJumping(true));
    say("woof!", 900);
  }

  // On or off: only on mouse devices, without reduced motion, and not hidden by the visitor.
  useEffect(() => {
    let hidden = false;
    try {
      hidden = localStorage.getItem("dog") === "off";
    } catch {}
    setEnabled(canRun() && !hidden);
    const onToggle = (e: Event) => setEnabled(canRun() && (e as CustomEvent<boolean>).detail);
    window.addEventListener("dog-toggle", onToggle);
    return () => window.removeEventListener("dog-toggle", onToggle);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let x = window.innerWidth - W - 24;
    let y = window.innerHeight - H - 24;
    let tx = x;
    let ty = y;
    let last = performance.now();
    let stride = 0;
    let curPose: Pose = "sit";
    let curFlip = false;
    let asleep = false;
    let raf = 0;
    lastActive.current = last - 4000;

    const show = (p: Pose) => {
      if (p !== curPose) {
        curPose = p;
        setPose(p);
      }
    };
    const face = (left: boolean) => {
      if (left !== curFlip) {
        curFlip = left;
        setFlip(left);
      }
    };

    // Stop beside the cursor, on whichever side the dog is coming from.
    const onMove = (e: PointerEvent) => {
      const fromLeft = x + W / 2 < e.clientX;
      tx = fromLeft ? e.clientX - W - 10 : e.clientX + 10;
      ty = e.clientY - H / 2;
      tx = Math.max(0, Math.min(window.innerWidth - W, tx));
      ty = Math.max(0, Math.min(window.innerHeight - H, ty));
    };

    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        const speed = 0.32 * dt * (dist > 240 ? 1.7 : 1);
        const move = Math.min(dist, speed);
        x += (dx / dist) * move;
        y += (dy / dist) * move;
        if (Math.abs(dx) > 2) face(dx < 0);
        stride += dt;
        show(Math.floor(stride / 110) % 2 ? "run1" : "run2");
        if (asleep) {
          asleep = false;
          say("!", 700);
        }
        lastActive.current = now;
      } else {
        const idle = now - lastActive.current;
        const wag = Math.floor(now / 180) % 2 === 0;
        if (idle < 2500) show(wag ? "stand" : "standWag");
        else if (idle < 9000) show(wag ? "sit" : "sitWag");
        else {
          show("sleep");
          asleep = true;
        }
      }

      if (el.current) el.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={el} className="dog" style={{ width: W, height: H }} onClick={bark} title="Woof" aria-hidden="true">
      {bubble ? (
        <span className="dog-bubble">{bubble}</span>
      ) : pose === "sleep" ? (
        <span className="dog-bubble dog-z">
          z<b>z</b>
        </span>
      ) : null}
      <span className={jumping ? "dog-sprite jump" : "dog-sprite"} onAnimationEnd={() => setJumping(false)}>
        <svg
          width={W}
          height={H}
          viewBox="0 0 16 12"
          shapeRendering="crispEdges"
          style={flip ? { transform: "scaleX(-1)" } : undefined}
        >
          {SPRITES[pose].map(([ch, d]) => (
            <path key={ch} d={d} style={{ fill: COLORS[ch] }} />
          ))}
        </svg>
      </span>
    </div>
  );
}

// Footer link that hides or brings back the dog, remembered per visitor.
export function DogToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      setOn(localStorage.getItem("dog") !== "off");
    } catch {}
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    try {
      localStorage.setItem("dog", next ? "on" : "off");
    } catch {}
    window.dispatchEvent(new CustomEvent("dog-toggle", { detail: next }));
  }

  return (
    <span className="dog-toggle-wrap">
      <button className="dog-toggle" type="button" onClick={toggle}>
        {on ? "Hide the dog" : "Bring the dog back"}
      </button>
    </span>
  );
}
