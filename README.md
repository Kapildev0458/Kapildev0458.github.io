# Kapil Dev · Portfolio

Next.js (App Router) + React + TypeScript, plain CSS. Exported as a static site and deployed to GitHub Pages at devkapil.in.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Edit content

Everything you'd normally change lives in `lib/` and `content/`:

| File | What it holds |
|---|---|
| `lib/profile.ts` | Name, email, links, status line |
| `lib/roles.ts` | The hero role switch: headline, intro, sample output card per role |
| `lib/projects.ts` | Project cards and which roles each one shows under |
| `lib/levels.ts` | The level-up journey, including the "next level" in progress |
| `lib/skills.ts` | Skill groups |
| `lib/blog.ts` | "Coming up" post titles (`plannedPosts`) |
| `content/blog/*.md` | Blog posts (frontmatter: `title`, `date`, `summary`, optional `draft: true`) |

## Deploy

1. Push this project to the `main` branch of `Kapildev0458.github.io`.
2. In the repo on GitHub: Settings → Pages → Source → **GitHub Actions**.
3. Each push runs `.github/workflows/deploy.yml`, which builds and publishes `out/`. `public/CNAME` keeps the custom domain.
