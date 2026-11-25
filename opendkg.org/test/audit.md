# Local review

Date: 2026-11-14
Site source: `public/`
Server: `python3 -m http.server 8080 -d public`
Environment: Node 22.23.1, Python 3.12.3, Playwright 1.56.1 (Chromium 141), axe-core 4.10.2, html-validate 9.

This is a local template review, not a production audit. It does not establish WCAG conformance, production LCP, or product security.

## Automated results

| Check | Command | Result |
| --- | --- | --- |
| Internal routes, anchors, exact case, metadata, sitemap | `node scripts/check-links.mjs public` | 7 pages, 162 links, 0 issues |
| Checker fixture tests | `node --test test/*.test.mjs` | 3/3 pass |
| HTML validation | `npx --yes html-validate@9 'public/**/*.html'` | 0 errors |
| External link spot-check | `node scripts/check-links.mjs public --external` | 11 unique external links, 0 failures at review time |
| Axe at 1280 px | Playwright + `@axe-core/playwright`, WCAG 2.0/2.1 A/AA tags | 0 violations on home, Axiom, Blackbox, DKGSwarm, TRACaBot, transparency |
| Axe at 390 px | Same | 0 violations on the same six pages |

## Manual and browser results

| Check | Result |
| --- | --- |
| Horizontal overflow | None at 320, 390, 768, 1280, 1440 px across 7 pages |
| External requests | None; the page loads only local CSS, font, and icon |
| Console/page errors | None |
| Missing route | `/missing-page/` returns HTTP 404 under the local server |
| Directory route behavior | `/axiom` → 301 `/axiom/`; `/DKGSwarm` → 301 `/DKGSwarm/`; canonicals use the trailing slash |
| Keyboard | First Tab reveals the skip link; next tab stops show a 3 px focus outline |
| Reduced motion | No CSS animations remain; computed `animation-name` is `none` |
| Page assets | 3 resources, ~51.7 KB transfer in the local test; well under the 250 KB budget |
| LCP | Not measured. Do not claim a production LCP from this review |

Screenshots (local, ignored by git): `test/screenshots/{home,axiom,blackbox,DKGSwarm,tracabot,transparency,404}-{320,390,768,1280,1440}.png` — 35 files.

## What this review does not cover

- No real screen reader, switch device, or assistive-technology session.
- No Safari, Firefox, iOS, Android, or physical-device testing; Chromium only.
- No production server, CSP, Cloudflare Access, Nginx redirect, or header testing.
- No Lighthouse/field data; the local transfer number is not a production measurement.
- No independent verification of Axiom runtime behavior or Umanitek Blackbox behavior.
- No legal review of trademarks, licensing, or the Axiom package relationship.
- The wiki pages used for research are behind Cloudflare Access; they are not linked from the public site. Public pages link only public GitHub/Umanitek sources.

## Deployment-only checks still required

- `/axiom` and `/DKGSwarm` trailing-slash behavior behind the production proxy.
- Custom `404.html` mapping and HTTP 404 status.
- CSP `font-src 'self'` for the self-hosted font.
- `robots.txt` interaction with Cloudflare’s injected content-signals file.
- Canonical URLs and sitemap on the final domain.
- Real-browser and assistive-technology checks.

## Homepage refresh — 2026-11-16 (production)

Scope: homepage only. Deployed files: `public/index.html`, `public/home.css`, `public/404.html` to `<server-root>/opendkg.org/public/`. The live `/axiom/` site is separately deployed from the Axiom website source; this repository's `public/axiom/` is a placeholder and was not published. A full deployment of `public/` is not a safe replacement for the live Axiom site.

| Check | Command / method | Result |
| --- | --- | --- |
| Source routes, anchors, metadata, sitemap | `node scripts/check-links.mjs public` | 7 pages, 154 links, 0 issues |
| Checker fixture tests | `node --test test/*.test.mjs` | 3/3 pass |
| Live homepage and assets | `curl -I https://opendkg.org/`, `/home.css` | 200; CSP unchanged; CSS 200 |
| Live missing file | `https://opendkg.org/definitely-missing-page` | HTTP 404 with themed `404.html` |
| Redirects | `www`, `http`, `/axiom` | 301 to apex, HTTPS, `/axiom/` |
| External links | GitHub org, dkgswarm.com, tracabot.com, contribution guide | 200 at review time |
| Browser audit | Chromium 149, widths 320/390/768/1280/1440 | No horizontal overflow; no console, CSP or page errors |
| Requests | CDP network log | Three same-origin requests; no scripts, fonts or trackers |
| Keyboard | CDP Tab sequence | Skip link first; visible focus on links and buttons |
| Axiom unchanged | Served-tree SHA-256 before/after | Only the three homepage files changed; Axiom files identical |

Screenshots: `<evidence-root>/after/live/` (home at 320, 390, 768, 1280, 1440; 404 at 320, 390, 1440). Before screenshots: `<evidence-root>/before/shots/`. Rollback copies: `<evidence-root>/rollback/`.

Axiom copy is limited to the public Axiom page. No public Axiom application repository or live download was found on 2026-11-16, so the homepage describes Axiom as in development and links “Explore Axiom”; it does not imply a release.

Known limitation: `/sitemap.xml` returns 404 on the live site. This predates the refresh (the served directory never contained a sitemap) and is not referenced by the homepage; the repository sitemap lists undeployed routes and was not published.

## OpenDKG logo update — 2026-11-16 (production)

Scope: homepage and themed 404 brand marks plus favicon. The organization's current logo is `assets/open-dkg-final.png` in the public `OpenDKG/.github` repository (shown in the profile README and matching the organization avatar), not the older `opendkg-icon.svg` / `opendkg-logo.svg` files. The mark is self-hosted as `public/assets/opendkg-logo.png` (cropped to its content box and resized; no recolouring) and the favicon as `public/favicon-opendkg.png`. The previous inline titanium SVG mark and `favicon.svg` reference were replaced on these two pages only; other source pages are undeployed and unchanged.

| Check | Command / method | Result |
| --- | --- | --- |
| Routes and assets | `node scripts/check-links.mjs public` | 7 pages, 158 links, 0 issues |
| Checker fixture tests | `node --test test/*.test.mjs` | 3/3 pass |
| HTML validation | `npx html-validate@9 public/index.html public/404.html` | 0 errors |
| Live logo and favicon | `curl` with a browser UA | 200 `image/png`; bodies match deployed SHA-256 |
| Live homepage and 404 | Chromium 149 at 320/390/768/1440 | Logo 89×60 CSS px, no overflow, no CSP or console errors |
| Requests | CDP network log | Four same-origin requests; no GitHub hotlink, fonts or trackers |
| Axiom unchanged | Served-tree SHA-256 before/after | Only the intended files changed; Axiom files identical |

Evidence, provenance and rollback: `<evidence-root>/logo/`. Known limitation: Cloudflare held the previous `/home.css` at the edge for its 4-hour TTL after deployment. The new markup sizes the logo with `width`/`height` attributes, so it renders correctly with either the old or the new stylesheet.

## Homepage copy revision — 2026-11-16 (production)

Scope: homepage and 404 wording only. Deployed files: `public/index.html`, `public/404.html`. `public/home.css`, the logo, favicon, Axiom tree and all other routes were not changed. No CSS deploy, so the 4-hour `/home.css` edge cache was not involved.

| Check | Command / method | Result |
| --- | --- | --- |
| Source routes, anchors, metadata, sitemap | `node scripts/check-links.mjs public` | 7 pages, 158 links, 0 issues |
| Checker fixture tests | `node --test test/*.test.mjs` | 3/3 pass |
| HTML validation | `npx html-validate@9 public/index.html public/404.html` | 0 errors |
| Live homepage / 404 | `curl` with a browser UA | `/` 200 body `8c030b0a…`; missing path 404 body `2449f9a2…` |
| Unchanged assets | `curl` + SHA-256 | `/home.css` `10ca5136…`; logo `e77005d4…`; favicon `57fdd5c2…` |
| Headers | `curl -I` | Home CSP, `nosniff`, `DENY`, `strict-origin-when-cross-origin` unchanged; no `Set-Cookie` |
| Redirects | `curl` | `http` → HTTPS 301; `www` → apex 301; `/axiom` → `/axiom/` 301 |
| External links | `curl` with a browser UA | GitHub org, dkgswarm repo, contribution guide, dkgswarm.com, tracabot.com, `/axiom/` all 200 |
| Axiom unchanged | Served-tree SHA-256 before/after | 25 Axiom files byte-identical; only `index.html` and `404.html` changed |
| Browser audit | Chromium 149, widths 320/390/768/1280/1440 | No horizontal overflow; no console, CSP or page errors on home; no scripts; four same-origin requests |
| Keyboard | CDP Tab sequence | Skip link first; visible focus on nav, buttons and text links |
| 200% zoom | CDP Ctrl+`+`, 1440 and 780 px windows | Home 24/24 and 22/24 links (two nav links hidden at 390 CSS px); 404 10/10 and 9/10; no overflow, clipping or focus problems |

Screenshots: `<evidence-root>/copy-2026-11-16/shots-live/` (home at 320, 390, 768, 1280, 1440; 404 at 320, 390, 768, 1440) and `zoom-shots/`. Before/after copy, claims and rollback: same directory.

Known limits: Chromium-only checks; no real screen reader or non-Chromium browser. `/sitemap.xml` still returns 404 on the live site; that predates this change and the repository sitemap was not published because it lists undeployed routes. No commit, push, DNS, proxy, CSP, cache or container change.

## Homepage copy correction — 2026-11-16 (production)

Reviewer-requested corrections within the same homepage/404 scope. Deployed files: `public/index.html`, `public/404.html` only. `public/home.css`, the logo, favicon, Axiom tree and all other routes were not changed. The first-pass section above is retained as history; its live hashes are superseded here.

| Check | Command / method | Result |
| --- | --- | --- |
| Source routes, anchors, metadata, sitemap | `node scripts/check-links.mjs public` | 7 pages, 158 links, 0 issues |
| Checker fixture tests | `node --test test/*.test.mjs` | 3/3 pass |
| HTML validation | `npx html-validate@9 public/index.html public/404.html` | 0 errors |
| Live homepage / 404 | `curl` with a browser UA | `/` 200 body `51b226ea…`; missing path 404 body `83fe6b89…` |
| Unchanged assets | `curl` + SHA-256 | `/home.css` `10ca5136…`; logo `e77005d4…`; favicon `57fdd5c2…` |
| Headers | `curl -I` | Home CSP hash `c31c2783…`, `nosniff`, `DENY`, `strict-origin-when-cross-origin` unchanged; no `Set-Cookie` |
| Redirects | `curl` | `http` → HTTPS 301; `www` → apex 301; `/axiom` → `/axiom/` 301 |
| External links | `curl` with browser UA and strict TLS | GitHub org, dkgswarm repo, contribution guide, dkgswarm.com, tracabot.com, `/axiom/` all 200 |
| Axiom unchanged | Served-tree SHA-256 before/after | 25 Axiom files byte-identical; live body `1cee7478…`; only `index.html` and `404.html` changed |
| Browser audit | Chromium 149, widths 320/390/768/1280/1440 | No horizontal overflow; no console, CSP or page errors on home; no scripts; four same-origin requests |
| Keyboard | CDP Tab sequence | Skip link first; visible focus on nav, buttons and text links |
| 200% zoom | CDP Ctrl+`+`, 1440 and 780 px windows | Home 24/24 and 22/24 links (two nav links hidden at 390 CSS px); 404 10/10 and 9/10; no overflow, clipping or focus problems |

Screenshots and raw results: `<evidence-root>/copy-2026-11-16/correction-2/` (`shots-live/`, `zoom-shots/`, `audit-live-home.json`, `audit-live-404.json`). Correction diff: `correction.patch`. Rollback copies: `correction-2/rollback/`.

Known limits unchanged: Chromium-only checks; no real screen reader or non-Chromium browser. `/sitemap.xml` remains a pre-existing live 404 and was not published. No commit, push, DNS, proxy, CSP, cache or container change.

## TRACaBot wording fix — 2026-11-16 (production)

Reviewer-requested single-sentence correction. Only `public/index.html` changed; `404.html`, CSS, logo, favicon, Axiom tree and all other routes unchanged.

Final card text: “With the admin rights and settings you grant, it can delete messages or remove people on its own. Removing someone as they join is a separate choice you turn on.” No confidence tiers.

| Check | Result |
| --- | --- |
| Source routes, anchors, metadata | `node scripts/check-links.mjs public` → 7 pages, 158 links, 0 issues |
| Checker fixtures | `node --test test/*.test.mjs` → 3/3 pass |
| HTML validation | `npx html-validate@9 public/index.html public/404.html` → 0 errors |
| Live homepage / 404 | `/` 200 body `2fafc50b…`; missing path 404 body `83fe6b89…` (unchanged) |
| Served tree | Only `index.html` changed; Axiom files byte-identical |
| Wrapping | 320/390/1440 px: no horizontal overflow; paragraph reads without clipping |

Evidence: `<evidence-root>/copy-2026-11-16/correction-2/final-tracabot/`.

## Cloudflare Pages migration and Axiom subtree — 2026-11-17

The site now deploys from this repository. Cloudflare Pages builds `main` and serves `public/`; the earlier local Nginx Proxy Manager host and its local deployment timer were retired and are not referenced by anything here.

- `public/axiom/` replaced the placeholder with a squashed subtree of the Axiom site's upstream source at `bb298e4`, plus `canonical`, `og:url` and an absolute `og:image` for the `/axiom/` path on `index.html` and `pentesting.html`.
- `public/_headers` restores the previous response headers and CSP on the new host, with a separate policy for `/axiom/*` that allows its script, inline styles and self-hosted fonts.
- `public/sitemap.xml` lists the published routes, including `/axiom/pentesting.html`.
- `scripts/check-links.mjs` skips the vendored `public/axiom/` tree; that project keeps its own script, fonts and checks.

| Check | Result |
| --- | --- |
| Source routes, anchors, metadata | `node scripts/check-links.mjs public` → 6 pages, 136 links, 0 issues (Axiom skipped by design) |
| Checker fixtures | `node --test test/*.test.mjs` → 3/3 pass |

Known limits: the vendored Axiom tree is not validated by this repository's checker, and its own checks are run in the Axiom repository. Live Cloudflare Pages behavior, including `_headers` application and 404 handling, is verified after deployment, not by these local checks.

## Axiom release availability copy — 2026-11-22 (prepared, not deployed)

Scope: `public/index.html`, `public/axiom/index.html`, `public/transparency/index.html`, `test/claims.md`, new `test/axiom-release.test.mjs`. No commit, push, DNS, Cloudflare, CSP, auth or deployment change in this pass.

Verified before writing: `https://github.com/OpenDKG/Axiom` is public (`GPL-3.0-or-later`); `https://github.com/OpenDKG/Axiom/releases/latest` resolved to `v1.4.8` (non-draft, non-prerelease, published 2026-11-21T21:45Z) with `Axiom-Setup.exe`, `Axiom-1.4.8-win-x64.zip`, `axiom-firewall_1.4.8+linux.preview1_amd64.deb`, `Axiom-1.4.8-25-osx-x64-adhoc.zip`, `SHA256SUMS.txt` and `SOURCE-COMMIT.txt`.

| Check | Command / method | Result |
| --- | --- | --- |
| Source routes, anchors, metadata | `node scripts/check-links.mjs public` | 7 pages, 155 links, 0 issues |
| Checker fixtures + new regression test | `node --test test/*.test.mjs` | 9/9 pass (3 existing fixture tests, 6 Axiom availability tests) |
| External links | `node scripts/check-links.mjs public --external` | 14/15 fetched clean; `https://umanitek.ai/blackbox` timed out (pre-existing link, unchanged here) |
| Release and source URLs | `curl -sSL -o /dev/null -w '%{http_code}'` | `releases/latest` 200 → `/releases/tag/v1.4.8`; `github.com/OpenDKG/Axiom` 200 |
| Browser render (managed odkgbrowser) | `open_url` on a temporary local static server | `/` and `/axiom/#download` render the new copy; screenshots in `<browser-state>/screenshots/` |
| Responsive 320/390/768/1280/1440 px | managed odkgbrowser | **Unverified**: the bridge exposes no viewport control. Not reported as passing. |
| Console and CSP errors | managed odkgbrowser | **Unverified**: the bridge exposes no console capture, and `_headers` CSP applies only on Cloudflare Pages after deploy. |

Known limits: `scripts/check-links.mjs` intentionally skips the vendored `public/axiom/` tree, so the new test reads those pages directly. The external check is network-flaky. The temporary preview server was stopped; no persistent or public preview service was left running. Live behaviour, `_headers`, `/donate/`, video cards and `404.html` still need a post-deploy check.
