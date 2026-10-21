import Link from "next/link";
import { profile } from "@/lib/profile";
import { DogToggle } from "./dog";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/projects/", label: "projects" },
  { href: "/blog/", label: "writing" },
  { href: "/#contact", label: "contact" },
];

export function Nav() {
  return (
    <header className="bar">
      <Link className="home" href="/">
        {profile.name}
      </Link>
      <nav className="nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <span className="gap" />
        <a href={profile.resume} target="_blank" rel="noopener">
          résumé ↗
        </a>
      </nav>
      <ThemeToggle />
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <span className="mono">{profile.email}</span>
      <div className="links">
        <a className="lk" href={profile.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a className="lk" href={profile.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <a className="lk" href={profile.resume} target="_blank" rel="noopener">
          Résumé
        </a>
        <DogToggle />
      </div>
      <span className="mono">© 2026 {profile.name}</span>
    </footer>
  );
}
