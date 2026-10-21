import Link from "next/link";
import { profile } from "@/lib/profile";
import { DogToggle } from "./dog";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#levels", label: "Journey" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog/", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          Kapil Dev<span>.</span>
        </Link>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="btn primary" href={profile.resume} target="_blank" rel="noopener">
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      © 2026 {profile.name} ·{" "}
      <a href={profile.github} target="_blank" rel="noopener">
        GitHub
      </a>{" "}
      ·{" "}
      <a href={profile.linkedin} target="_blank" rel="noopener">
        LinkedIn
      </a>
      <DogToggle />
    </footer>
  );
}
