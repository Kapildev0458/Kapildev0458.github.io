import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Nav } from "@/components/nav";
import { formatDate, getPosts, plannedPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Writing" };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="phead">
          <h1 className="ptitle">Writing</h1>
          <p className="sub">Notes from what I build and learn: fine-tuning, document AI, agents and systems.</p>
        </header>
        <section className="sec flush">
          <ul className="rows">
            {posts.map((p) => (
              <li key={p.slug}>
                <span className="mono">{formatDate(p.date, "month")}</span>
                <span className="t">
                  <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                  {p.summary && <span className="mono m">{p.summary}</span>}
                </span>
              </li>
            ))}
            {plannedPosts.map((t) => (
              <li key={t}>
                <span className="mono">soon</span>
                <span className="t faint">{t}</span>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </>
  );
}
