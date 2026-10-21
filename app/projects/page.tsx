import type { Metadata } from "next";
import { Footer, Nav } from "@/components/nav";
import { ProjectRows } from "@/components/project-rows";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="wrap">
        <header className="phead">
          <h1 className="ptitle">Projects</h1>
          <p className="sub">
            Things I&apos;ve built: fine-tuned LLMs, document AI, agent tooling and deep learning. Filter by the kind of
            role you&apos;re hiring for.
          </p>
        </header>
        <section className="sec flush">
          <ProjectRows />
        </section>
        <Footer />
      </main>
    </>
  );
}
