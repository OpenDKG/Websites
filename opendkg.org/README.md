# opendkg.org

Source for the public OpenDKG website, hosted in the `OpenDKG/Websites` monorepo under `opendkg.org/`. This is a static HTML/CSS site with no runtime dependencies and no JavaScript.

**Deployment:** Cloudflare Pages builds `OpenDKG/Websites` from `main` by running `node scripts/build.mjs` from the repository root and serving `dist/`. The build script copies `opendkg.org/public/` into `dist/` and copies `../axiom/` into `dist/axiom/` (excluding Axiom repository housekeeping files). A push to `main` is a production change. Do not create a manual `opendkg.org/public/axiom/` directory — edit `../axiom/` directly.

## What is here

```text
public/                 Deployable site root (Cloudflare Pages output)
  index.html            Home
  home.css              Home and 404 styles
  axiom/                Axiom site, synced from OpenDKG/Axiom-Website
  blackbox/             Guardian Agent Blackbox (third-party)
  DKGSwarm/             DKGSwarm (exact-case route)
  tracabot/             TRACaBot
  transparency/         Ownership, status, sources, limits
  404.html              Custom not-found page
  styles.css            Shared styles for the project pages
  _headers              Cloudflare Pages response headers and CSP
  assets/               OpenDKG logo and icon
  favicon.svg, favicon-opendkg.png
  robots.txt
  sitemap.xml
scripts/
  check-links.mjs       Route, anchor, metadata, and sitemap checks
test/
  check-links.test.mjs  Fixture tests for the checker
  claims.md             Claim-to-source review checklist
  audit.md              Review results and limitations
```

## Routes

| Route | File |
| --- | --- |
| `/` | `public/index.html` |
| `/axiom/` | `public/axiom/index.html` |
| `/DKGSwarm/` | `public/DKGSwarm/index.html` |
| `/blackbox/` | `public/blackbox/index.html` |
| `/tracabot/` | `public/tracabot/index.html` |
| `/transparency/` | `public/transparency/index.html` |
| `/404.html` | `public/404.html` |

`DKGSwarm` is intentionally capitalized. Directory routes use a trailing slash in links and canonicals so the canonical URL matches the file served by a static server. The production server may redirect `/axiom` to `/axiom/`; verify that behavior when deploying.

`RepNet` and `TracaPlot` are deliberately excluded. They do not have verified public product pages to link.

## Local preview

Build `dist/` from the repository root (`OpenDKG/Websites`) and serve it with a standard static server:

```sh
node scripts/build.mjs
python3 -m http.server 8080 -d dist
```

Open `http://127.0.0.1:8080/`.

## Checks

Run from the repository root (`OpenDKG/Websites`):

```sh
node scripts/build.mjs
node opendkg.org/scripts/check-links.mjs dist
node --test opendkg.org/test/*.test.mjs
```

The checker validates:

- every internal `href` and `src` target exists;
- anchors resolve to an `id` or `name` in the target page;
- route casing is exact;
- each page has a title, description, canonical, one `h1`, a skip link, and `<main id="main">`;
- no scripts, inline styles, dead `href="#"`, insecure `http://`, or TODO/FIXME text;
- titles, descriptions, and canonicals are unique;
- every non-404 page appears in `sitemap.xml`.

`dist/axiom/` is skipped: it is a separate project site with its own script and fonts.

External links are listed but not fetched by default. To spot-check them:

```sh
node opendkg.org/scripts/check-links.mjs dist --external
```

External sites can block automated requests; record failures rather than treating them as proof of a broken link.

Optional review tools, if available in the environment:

```sh
npx --yes html-validate "dist/**/*.html"
npx --yes lighthouse http://127.0.0.1:8080/ --chrome-flags="--headless"
```

These are review tools, not repository dependencies.

## Deployment

Cloudflare Pages builds `main` of `OpenDKG/Websites` with `node scripts/build.mjs` and serves `dist/`. A push to `main` is a production change.

`public/_headers` holds the response headers:

- `/*` sends `nosniff`, `DENY`, `strict-origin-when-cross-origin`, and the site CSP: no scripts, and styles, fonts, and images from this origin only.
- `/axiom/*` replaces the CSP with the Axiom policy, which allows the Axiom site's script, inline styles, self-hosted fonts, and `youtube-nocookie.com` embeds.

A missing path serves `public/404.html` with HTTP 404. The `www` to apex redirect lives in Cloudflare, not in this repository.

## Axiom integration

The Axiom website lives in `../axiom/` in this monorepo and is assembled into `dist/axiom/` at build time by `scripts/build.mjs`. Keep `axiom/index.html` and `axiom/pentesting.html` canonicals, `og:url`, and absolute `og:image` paths pointing to `https://opendkg.org/axiom/`. The Axiom project keeps its own README and content rules; `opendkg.org/scripts/check-links.mjs` skips `axiom/`.

## Content rules

- Public claims must be traceable in `test/claims.md`.
- Do not add private Axiom source, private screenshots, private repository links, customer data, or unverified metrics.
- Do not claim certifications, partnerships, endorsements, or absolute protection.
- Attribute vendor-described capabilities to the vendor.
- Axiom’s package direction and Blackbox’s independently documented behavior are different kinds of evidence. Keep that distinction.
- No cookies, analytics, third-party scripts, external fonts, or tracking pixels.
- No Umanitek logos or dashboard art without written permission.

## Page ownership suggestions

These are coordination suggestions, not access control:

| Area | Suggested owner |
| --- | --- |
| `public/axiom/` | Axiom maintainer or project liaison |
| `public/blackbox/` | Axiom/Blackbox liaison |
| `public/DKGSwarm/` | DKGSwarm maintainer |
| `public/tracabot/` | TRACaBot maintainer |
| `public/transparency/`, `test/claims.md` | Claims/documentation reviewer |
| `public/styles.css`, header/footer | Design owner |

See [CONTRIBUTING.md](CONTRIBUTING.md) for the small PR workflow.

## License

Original website code in this repository is licensed under Apache-2.0. Original site copy is © OpenDKG. Third-party marks, product names, product prose, and assets are excluded; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

This repository does not license Axiom, Guardian Agent Blackbox, DKGSwarm, TRACaBot, or any third-party product code.

## Ownership

OpenDKG is an independent open-source initiative. Axiom is an independent project documented in the OpenDKG portfolio. Guardian Agent Blackbox is a Umanitek product. No partnership or endorsement is implied by this repository or the site.
