"use client";

import { useState } from "react";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { roles, type RoleId } from "@/lib/roles";

type Filter = RoleId | "all";

// The hero and the project list share one state: picking a role in the hero
// rewrites the headline and filters the projects to match.
export function RoleSections() {
  const [roleId, setRoleId] = useState<RoleId>("ml");
  const [filter, setFilter] = useState<Filter>("ml");
  const role = roles.find((r) => r.id === roleId)!;

  function pickRole(id: RoleId) {
    setRoleId(id);
    setFilter(id);
  }

  const shown = filter === "all" ? projects : projects.filter((p) => p.roles.includes(filter));

  return (
    <>
      <div className="hero">
        <div>
          <div className="hello">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photo.jpg" alt="Kapil Dev" width={64} height={64} />
            <div className="status">
              <b />
              {profile.status}
            </div>
          </div>

          <div className="switch" role="group" aria-label="View my work as">
            {roles.map((r) => (
              <button key={r.id} type="button" aria-pressed={r.id === roleId} onClick={() => pickRole(r.id)}>
                {r.label}
              </button>
            ))}
          </div>

          <div className="swap" key={role.id}>
            <h1>
              {role.headline.before}
              <em>{role.headline.em}</em>
              {role.headline.after}
            </h1>
            <p className="lede">{role.lede}</p>
          </div>

          <div className="cta">
            <a className="btn primary" href="#projects">
              See my work
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="output swap" key={`out-${role.id}`} aria-label="Example output from one of my projects">
          <div className="bar">
            <span>{role.sample.file}</span>
            <span>{role.sample.model}</span>
          </div>
          <pre>
            <span className="d">{"{"}</span>
            {"\n"}
            {role.sample.lines.map(([k, v], i) => (
              <span key={k}>
                {"  "}
                <span className="k">&quot;{k}&quot;</span>: <span className={v.startsWith('"') ? "s" : "n"}>{v}</span>
                {i < role.sample.lines.length - 1 ? "," : ""}
                {"\n"}
              </span>
            ))}
            <span className="d">{"}"}</span>
          </pre>
          <div className="foot">Example output with made-up values. The real data is private.</div>
        </div>
      </div>

      <section id="projects">
        <p className="eyebrow">Projects</p>
        <div className="section-head">
          <h2>Things I&apos;ve built</h2>
          <div className="chips" role="group" aria-label="Filter projects">
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
              All
            </button>
            {roles.map((r) => (
              <button key={r.id} type="button" aria-pressed={filter === r.id} onClick={() => setFilter(r.id)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects">
          {shown.map((p) => (
            <article className="proj" key={p.title}>
              <div>
                <h3>{p.title}</h3>
                <p className="meta">{p.meta}</p>
                <p>{p.summary}</p>
                <ul>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="fact">
                <div>
                  <div className="num">{p.fact.num}</div>
                  <div className="lbl">{p.fact.label}</div>
                </div>
                {p.link ? (
                  <a href={p.link.href} target="_blank" rel="noopener">
                    {p.link.label}
                  </a>
                ) : (
                  <div className="src">{p.note}</div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
