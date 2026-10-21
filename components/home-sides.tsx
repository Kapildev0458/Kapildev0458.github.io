"use client";

import { useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { profile, sides, type Side } from "@/lib/profile";
import { circleReveal } from "@/lib/scroll";
import { Avatar } from "./avatar";

// Remembered while the visitor stays on the site, so going back home keeps the side.
let lastSide: Side = "pro";

// The hero, plus the switch between the professional and personal halves of the page.
export function HomeSides({ pro, personal }: { pro: ReactNode; personal: ReactNode }) {
  const [side, setSide] = useState<Side>(() => lastSide);
  const current = sides.find((s) => s.id === side)!;

  function pick(next: Side, button: HTMLButtonElement) {
    if (next === side) return;
    circleReveal(button, () => {
      flushSync(() => {
        lastSide = next;
        setSide(next);
      });
    });
  }

  return (
    <>
      <section className="hero">
        <div className="text">
          <p className="kick">Hey, I&apos;m</p>
          <h1>{profile.shortName}</h1>
          <p className="line">{current.line}</p>
          <p className="own">{current.own}</p>
          <div className="pick">
            <div className="sides" role="group" aria-label="Which side of me">
              {sides.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={s.id === side}
                  onClick={(e) => pick(s.id, e.currentTarget)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <span className="mono">Two sides of the same person. Flip it.</span>
          </div>
        </div>
        <div className="side">
          <Avatar />
          <p className="status">
            <b />
            {profile.status}
          </p>
        </div>
      </section>

      <div hidden={side !== "pro"}>{pro}</div>
      <div hidden={side !== "personal"}>{personal}</div>
    </>
  );
}
