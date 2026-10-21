"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";

export function Note() {
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const mailto =
    `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}` +
    `&body=${encodeURIComponent(note)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 1800);
  }

  return (
    <section id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Leave a note</h2>
      <div className="note">
        <p>
          I&apos;m looking for roles in AI/ML engineering, GenAI and agents, and data science. Write a line here and it
          opens in your email app, or copy my address.
        </p>
        <div className="note-form">
          <label htmlFor="note" className="sr-only">
            Your note
          </label>
          <textarea
            id="note"
            rows={4}
            placeholder="Hi Kapil, we have a role that might fit…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="note-actions">
            <a className="btn primary" href={mailto}>
              Send note
            </a>
            <button className="btn" type="button" onClick={copy}>
              {copied === "done" ? "Copied" : copied === "failed" ? profile.email : "Copy email"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
