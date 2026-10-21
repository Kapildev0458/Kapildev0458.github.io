import Link from "next/link";
import { HomeSides } from "@/components/home-sides";
import { Levels } from "@/components/levels";
import { Footer, Nav } from "@/components/nav";
import { Note } from "@/components/note";
import { ProjectRows } from "@/components/project-rows";
import { Skills } from "@/components/skills";
import { formatDate, getPosts, plannedPosts } from "@/lib/blog";
import { education } from "@/lib/levels";
import { books, favourites } from "@/lib/personal";
import { profile } from "@/lib/profile";

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <Nav />
      <main className="wrap">
        <HomeSides
          pro={
            <>
              <Levels />
              <Skills />

              <section className="sec" id="projects">
                <div className="duo">
                  <div>
                    <h2 className="h">Things I&apos;ve built</h2>
                    <ProjectRows />
                    <Link className="more lk" href="/projects/">
                      all projects →
                    </Link>
                  </div>
                  <div>
                    <h2 className="h">Education</h2>
                    <ul className="rows">
                      {education.map((e) => (
                        <li key={e.what}>
                          <span className="mono">{e.when}</span>
                          <span className="t">
                            {e.what}
                            <span className="mono m">{e.where}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a className="more lk" href={profile.resume} target="_blank" rel="noopener">
                      full résumé ↗
                    </a>
                  </div>
                </div>
              </section>
            </>
          }
          personal={
            <>
              <section className="sec">
                <div className="duo">
                  <div>
                    <h2 className="h">Latest writing</h2>
                    <ul className="rows">
                      {posts.map((p) => (
                        <li key={p.slug}>
                          <span className="mono">{formatDate(p.date, "month")}</span>
                          <span className="t">
                            <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
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
                    <Link className="more lk" href="/blog/">
                      the whole blog →
                    </Link>
                  </div>
                  {books.length > 0 && (
                    <div>
                      <h2 className="h">On the shelf</h2>
                      <div className="shelf">
                        {books.map((b, i) => (
                          <span
                            key={b.title}
                            className="spine"
                            title={`${b.title} · ${b.author}`}
                            style={
                              {
                                "--cloth": b.color,
                                "--h": `${10 + ((i * 7) % 4)}rem`,
                                "--w": `${2.1 + ((i * 3) % 3) * 0.35}rem`,
                              } as React.CSSProperties
                            }
                          >
                            <span>{b.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {favourites.length > 0 && (
                <section className="sec flush">
                  <h2 className="h">Things I go back to</h2>
                  <div className="reel">
                    {favourites.map((f) => (
                      <p key={f.title}>
                        {f.title}
                        <small>{f.note}</small>
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </>
          }
        />

        <section className="sec" id="contact">
          <h2 className="h">Leave a note</h2>
          <p className="sub">
            Hiring for AI/ML, GenAI or data roles, or just building something interesting? Send opens your mail app with
            the note addressed to me.
          </p>
          <Note />
        </section>

        <Footer />
      </main>
    </>
  );
}
