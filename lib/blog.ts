import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Posts are Markdown files in content/blog with a small frontmatter block:
// ---
// title: ...
// date: 2026-10-21
// summary: ...
// draft: true   (optional, hides the post)
// ---

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
  body: string;
};

const dir = path.join(process.cwd(), "content", "blog");

function parse(slug: string, raw: string): Post {
  const text = raw.replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const fields: Record<string, string> = {};
  if (match) {
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) fields[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return {
    slug,
    title: fields.title ?? slug,
    date: fields.date ?? "",
    summary: fields.summary ?? "",
    draft: fields.draft === "true",
    body: match ? match[2] : text,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, f), "utf8")))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}

export function formatDate(date: string, style: "day" | "month" = "day"): string {
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return date;
  return style === "month"
    ? d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" })
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// Shown under "Coming up" in the writing section until the posts exist.
export const plannedPosts = [
  "Detecting AI-generated documents with ViTs and image forensics",
  "Putting a team's AI agents behind one MCP gateway",
  "Learning system design as an ML engineer",
];
