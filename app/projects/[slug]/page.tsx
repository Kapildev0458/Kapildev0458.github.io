import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/nav";
import { getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.tagline } : {};
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  return (
    <>
      <Nav />
      <main className="wrap">
        <article className="article">
          <Link className="back" href="/projects/">
            ← all projects
          </Link>
          <h1>{p.title}</h1>
          <p className="mono meta">{p.meta}</p>
          <p className="lead">{p.summary}</p>
          <div className="stats big">
            <span>
              <b>{p.fact.num}</b>
              {p.fact.label}
            </span>
          </div>
          <div className="prose">
            <h2>What I did</h2>
            <ul>
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
          <p className="gain">
            <span className="mono">built with</span>
            {p.tags.map((t) => (
              <b key={t}>{t}</b>
            ))}
          </p>
          <p className="links">
            {p.link ? (
              <a className="lk" href={p.link.href} target="_blank" rel="noopener">
                {p.link.label}
              </a>
            ) : (
              <span className="mono">{p.note}</span>
            )}
          </p>
        </article>
        <Footer />
      </main>
    </>
  );
}
