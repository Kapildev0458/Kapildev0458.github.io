"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiCplusplus,
  SiHelm,
  SiHuggingface,
  SiKeras,
  SiKubernetes,
  SiLangchain,
  SiOpencv,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import { ease, sectionProgress } from "@/lib/scroll";

// Four groups of three, listed group by group.
const groups = ["languages", "ml & dl", "vision & llms", "infra & web"];
const icons: { name: string; Icon: IconType }[] = [
  { name: "Python", Icon: SiPython },
  { name: "Java", Icon: FaJava },
  { name: "C++", Icon: SiCplusplus },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Keras", Icon: SiKeras },
  { name: "scikit-learn", Icon: SiScikitlearn },
  { name: "OpenCV", Icon: SiOpencv },
  { name: "Hugging Face", Icon: SiHuggingface },
  { name: "LangChain", Icon: SiLangchain },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "Helm", Icon: SiHelm },
  { name: "React", Icon: SiReact },
];
const also = ["C", "SQL", "LangGraph", "RAG", "MCP", "Vision Transformers", "LoRA", "Linux", "Git"];

// A fixed pseudo-random home for each icon while it floats, the same on every visit.
function home(i: number) {
  const r1 = Math.abs(Math.sin(i * 91.17 + 3.1) * 10000) % 1;
  const r2 = Math.abs(Math.sin(i * 47.53 + 1.7) * 10000) % 1;
  const slot = (i * 7) % 12;
  return {
    x: ((slot % 4) + 0.5) / 4 + (r1 - 0.5) * 0.16,
    y: (Math.floor(slot / 4) + 0.5) / 3 + (r2 - 0.5) * 0.22,
    phase: r1 * Math.PI * 2,
    speed: 0.4 + r2 * 0.5,
    depth: 0.6 + r1 * 0.8,
  };
}

// The icons float loose and shy away from the pointer, then line up
// into their groups as the section is scrolled through.
export function Skills() {
  const section = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const box = field.current;
    if (!sec || !box) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiles = [...box.querySelectorAll<HTMLElement>(".ico")].map((el, i) => ({ el, ...home(i) }));
    const labels = [...box.querySelectorAll<HTMLElement>(".grp")];
    let px = -1e4;
    let py = -1e4;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };

    function frame(now: number) {
      const w = box!.clientWidth;
      const h = box!.clientHeight;
      const p = still ? 1 : ease(((sectionProgress(sec!) ?? 0) - 0.1) / 0.6);
      const t = now / 1000;

      tiles.forEach((tile, i) => {
        const col = Math.floor(i / 3);
        const row = i % 3;
        // Loose: drifting around its home. Lined up: its slot in the group column.
        let fx = tile.x * w + Math.sin(t * tile.speed + tile.phase) * 18 * tile.depth;
        let fy = tile.y * h + Math.cos(t * tile.speed * 0.8 + tile.phase) * 14 * tile.depth;
        const dx = fx - px;
        const dy = fy - py;
        const d = Math.hypot(dx, dy);
        if (d < 140 && d > 0) {
          const push = (1 - d / 140) * 38;
          fx += (dx / d) * push;
          fy += (dy / d) * push;
        }
        const gx = ((col + 0.5) / 4) * w;
        const gy = h * 0.22 + row * Math.min(110, h * 0.24);
        const x = fx + (gx - fx) * p;
        const y = fy + (gy - fy) * p;
        tile.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      labels.forEach((l, i) => {
        l.style.transform = `translate3d(calc(${(((i + 0.5) / 4) * w).toFixed(1)}px - 50%), ${(h * 0.22 - 70).toFixed(1)}px, 0)`;
      });
      box!.classList.toggle("done", p > 0.97);
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="skills" ref={section} aria-label="Skills">
      <div className="pin">
        <h2 className="h">What I work with</h2>
        <div className="field" ref={field}>
          {groups.map((g) => (
            <span key={g} className="grp">
              {g}
            </span>
          ))}
          {icons.map(({ name, Icon }) => (
            <div key={name} className="ico" title={name}>
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <p className="mono also">also: {also.join(" · ")}</p>
      </div>
    </section>
  );
}
