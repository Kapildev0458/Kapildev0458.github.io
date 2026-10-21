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
    <div className="notebox">
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
      <div className="rowx">
        <a className="btn" href={mailto}>
          Send note
        </a>
        <button className="btn quiet" type="button" onClick={copy}>
          {copied === "done" ? "Copied" : "Copy email"}
        </button>
        {copied === "failed" && <span className="sel">{profile.email}</span>}
      </div>
    </div>
  );
}
