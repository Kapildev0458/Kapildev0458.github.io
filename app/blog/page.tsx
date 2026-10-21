import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Nav } from "@/components/nav";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Writing" };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <Nav />
      <main className="wrap">
        <section className="page">
          <p className="eyebrow">Writing</p>
          <h2>Notes from building</h2>
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`}>
                  <span>
                    <span className="post-title">{p.title}</span>
                    {p.summary && <span className="post-summary">{p.summary}</span>}
                  </span>
                  <span className="post-date">{formatDate(p.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </>
  );
}
