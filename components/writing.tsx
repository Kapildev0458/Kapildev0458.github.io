import Link from "next/link";
import { formatDate, getPosts, plannedPosts } from "@/lib/blog";

export function Writing() {
  const posts = getPosts().slice(0, 3);
  return (
    <section id="writing">
      <p className="eyebrow">Writing</p>
      <div className="section-head">
        <h2>Notes from building</h2>
        <Link className="more" href="/blog/">
          All posts →
        </Link>
      </div>
      <ul className="posts">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`}>
              <span className="post-title">{p.title}</span>
              <span className="post-date">{formatDate(p.date)}</span>
            </Link>
          </li>
        ))}
        {plannedPosts.map((t) => (
          <li key={t} className="planned">
            <span className="post-title">{t}</span>
            <span className="post-date">coming up</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
