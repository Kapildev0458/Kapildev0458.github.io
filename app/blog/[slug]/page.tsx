import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Nav } from "@/components/nav";
import { formatDate, getPost, getPosts, renderMarkdown } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="wrap">
        <article className="article">
          <Link className="back" href="/blog/">
            ← all writing
          </Link>
          <h1>{post.title}</h1>
          <p className="mono meta">{formatDate(post.date)}</p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
        </article>
        <Footer />
      </main>
    </>
  );
}
