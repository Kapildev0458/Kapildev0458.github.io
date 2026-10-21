"use client";

import { useEffect, useRef, useState } from "react";
import { levels } from "@/lib/levels";
import { clamp01, sectionProgress } from "@/lib/scroll";

// The journey as levels. The stage stays pinned while the section scrolls past;
// each stretch of scroll fills one XP segment and opens the next level.
export function Levels() {
  const section = useRef<HTMLElement>(null);
  const bars = useRef<(HTMLElement | null)[]>([]);
  const [at, setAt] = useState(0);
  const [up, setUp] = useState(false);
  const n = levels.length;

  useEffect(() => {
    let queued = false;
    let current = 0;
    let upTimer: ReturnType<typeof setTimeout> | undefined;

    function update() {
      queued = false;
      const p = section.current ? sectionProgress(section.current) : null;
      if (p === null) return;
      bars.current.forEach((b, i) => {
        if (b) b.style.transform = `scaleX(${clamp01(p * n - i).toFixed(3)})`;
      });
      const next = Math.min(n - 1, Math.floor(p * n));
      if (next === current) return;
      if (next > current) {
        setUp(true);
        clearTimeout(upTimer);
        upTimer = setTimeout(() => setUp(false), 1100);
      }
      current = next;
      setAt(next);
    }
    function onScroll() {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(upTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  return (
    <section className="levels" ref={section} aria-label="My journey, level by level" style={{ height: `${n * 85}vh` }}>
      <div className="pin">
        <div className="xp" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }} aria-hidden="true">
          {levels.map((l, i) => (
            <div key={l.tag} className={i <= at ? "seg on" : "seg"}>
              <b>
                <i ref={(el) => void (bars.current[i] = el)} />
              </b>
              <span>{l.tag}</span>
            </div>
          ))}
        </div>

        <div className="lv">
          <div className="numbox" aria-hidden="true">
            <span className={up ? "lvup show" : "lvup"}>level up!</span>
            <p className="mono">level</p>
            <div className="num">
              <span key={at} className="in">
                {String(at + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* All levels share one grid cell, so the tallest sets the height. */}
          <div className="lvstack">
            {levels.map((l, i) => (
              <div key={l.tag} className={(i === at ? "lvbody on" : "lvbody") + (l.inProgress ? " now" : "")}>
                <p className="yr">{l.period}</p>
                <h3>{l.title}</h3>
                <p className="co">
                  {l.org} <span>· {l.place}</span>
                </p>
                <ul className="pts">
                  {l.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="gain">
                  <span className="mono">{l.inProgress ? "unlocking" : "unlocked"}</span>
                  {l.unlocked.map((s) => (
                    <b key={s}>+ {s}</b>
                  ))}
                </p>
                {l.sideQuest && (
                  <p className="quest">
                    <span className="mono">side quest</span>
                    {l.sideQuest}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mono hint" aria-hidden="true">
          Keep scrolling to level up.
        </p>
      </div>
    </section>
  );
}
