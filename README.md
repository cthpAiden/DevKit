# 🧰 DevKit — In-Browser Developer Tools

A small, fast toolbox of everyday developer utilities. **Everything runs 100% in your
browser** — no accounts, no servers, no uploads. Your data never leaves your machine.

> 🔗 **Live demo:** `https://<your-username>.github.io/devkit/`
> _(update this link after your first deploy)_

## Tools (16)

**Text & Docs**
| Tool | What it does |
| --- | --- |
| 📝 Markdown Preview | Live GitHub-flavored Markdown → sanitized HTML |
| 📊 Text Stats | Character / word / line counts + reading time |
| 🔤 Case Converter | camelCase, snake_case, kebab-case, and more |
| 🔀 Text Diff | Compare two texts line by line (LCS diff) |
| 🅰️ Lorem Ipsum | Generate placeholder text |

**Data & Format**
| Tool | What it does |
| --- | --- |
| 🧩 JSON Formatter | Pretty-print, minify, and validate JSON |
| 🗄️ SQL Formatter | Beautify SQL queries across dialects |
| 🔢 Base Converter | Binary ⇄ octal ⇄ decimal ⇄ hex |
| 🕐 Timestamp | Unix time ⇄ human-readable dates |

**Encoding & Security**
| Tool | What it does |
| --- | --- |
| 🔁 Base64 / URL | Encode & decode Base64 and URL-encoding (Unicode-safe) |
| 🎫 JWT Decoder | Inspect a JWT's header and payload |
| 🔐 Hash & UUID | SHA-1/256/384/512 hashes and random UUIDs |
| 🔑 Password Generator | Strong random passwords via the crypto RNG |

**Web**
| Tool | What it does |
| --- | --- |
| 🔍 Regex Tester | Live match highlighting + capture groups |
| 🌐 URL Inspector | Break a URL into parts and query parameters |
| 🎨 Color Converter | HEX ⇄ RGB ⇄ HSL |

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Router** (HashRouter — deep links survive a page refresh on GitHub Pages)
- Client-side libraries: `sql-formatter`, `marked`, `dompurify`, plus the browser's
  built-in **Web Crypto API** for hashing.

## Run locally

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build locally
```

## Deploy to GitHub Pages (free)

1. Create a public GitHub repo and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push
   to `main`. Your site goes live at `https://<your-username>.github.io/<repo>/`.

The app uses a relative asset base (`base: './'` in `vite.config.ts`), so it works under any
repository name without extra configuration.

## Adding a new tool

The whole app is driven by one array in [`src/tools/registry.tsx`](src/tools/registry.tsx):

1. Create a new component in `src/tools/` (use an existing one as a template).
2. Add a single entry to the `tools` array.

The sidebar, routes, and home page all update automatically — no other changes needed.

## License

MIT — do whatever you like.
