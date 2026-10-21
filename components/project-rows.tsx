"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, tracks, type Track } from "@/lib/projects";

// Project list with a filter, so a recruiter can jump to the work for their role.
export function ProjectRows({ limit }: { limit?: number }) {
  const [track, setTrack] = useState<Track | "all">("all");
  const shown = (track === "all" ? projects : projects.filter((p) => p.tracks.includes(track))).slice(0, limit);

  return (
    <>
      <div className="chips" role="group" aria-label="Filter projects">
        <button type="button" aria-pressed={track === "all"} onClick={() => setTrack("all")}>
          all
        </button>
        {tracks.map((t) => (
          <button key={t.id} type="button" aria-pressed={track === t.id} onClick={() => setTrack(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <ul className="rows">
        {shown.map((p) => (
          <li key={p.slug}>
            <span className="mono">{p.year}</span>
            <span className="t">
              <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
              <span className="mono m">{p.tagline}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
