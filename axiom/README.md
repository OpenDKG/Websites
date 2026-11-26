# Axiom Website

The standalone, local-first **Axiom** project website, maintained in [OpenDKG](https://github.com/OpenDKG). Axiom focuses on protecting AI agents and the operating system around them, with optional Umanitek Agent Blackbox and OriginTrail DKG integration.

## Site architecture

- Plain HTML, CSS and minimal JavaScript. No npm, server runtime, external fonts, trackers or frontend dependencies.
- Self-hosted Manrope and Space Grotesk fonts (`assets/fonts/`), included with their SIL OFL licenses.
- Titanium Axiom shield, horizontal wordmark, and site icons. The hero uses an authentic Axiom Glass Dark dashboard screenshot.
- The community section uses the titanium OpenDKG logo from the [organization profile assets](https://github.com/OpenDKG/.github/tree/main/assets).
- Main page: `index.html`; base theme: `assets/site.css`; graphite and titanium theme: `assets/titanium.css`; navigation: `assets/site.js`.
- The intelligence section adds subtle layered-vector artwork, and the OpenDKG section adds a low-contrast wave, using original project logos (no extra JavaScript or tracking).
- Approved silver/graphite shield and wordmark are served as optimized transparent WebP assets (`assets/axiom-silver-*`); dedicated PNG sizes cover favicons and touch icons. The approved design was exported with genuine alpha, including the A aperture and letter counters. Shared finishing adjustments live in `assets/refinements.css`.
- `assets/silver-home.css` extends the pentesting chart palette (`#c5cbd3`, `#aeb6c1`, `#747d89`) to the product page, including fine section rules, graph fills, cards and icon treatments. The intelligence-loop infographic uses the supplied original OriginTrail, Umanitek and Blackbox artwork in `assets/brands/`, rather than approximate brand glyphs.
- Feature pictograms use Lucide SVG geometry (ISC license included in `assets/icons/LICENSE-Lucide.txt`). Apple and Linux platform glyphs come from [Simple Icons](https://github.com/simple-icons/simple-icons), with CC0 terms in `assets/icons/LICENSE-Simple-Icons.txt`. Platform names provide the accessible labels; decorative glyphs are hidden from assistive technology. The Windows mark uses four aligned panes.
- **Standalone pentesting subpage:** `pentesting.html`, with `assets/pentesting.css` and a small progressive-enhancement script. Product navigation and the hero link to this separate page; it is not embedded in the homepage.
- The lab page provides accessible chart values, a separate targeted-sweep matrix, filterable original screenshot captures, an accessible native-dialog image viewer, and working document downloads. Optimized thumbnails are in `assets/pentesting/thumbs/`; full-size PNG originals remain available.

## Pentesting data and downloads

`assets/pentesting/results.json` records the source, scope, totals and chart groups transcribed from the existing project capture. The accumulated snapshot has 4,044 decisions, of which 3,189 are labelled `GUARD_BLOCKED`, across 11 harness categories. The separate 10-harness sweep covers 15 vectors per harness. Each chart grouping totals 3,189; adding the two groups would double-count the same records.

Downloadable files live in `assets/pentesting/downloads/`: a three-page lab overview PDF, targeted matrix CSV, chart CSV, methodology Markdown, structured results and screenshot index, plus a seven-document ZIP. The bundle documents existing project-reported evidence; it does not include raw logs, signed attestations or full exploit scripts and is not an independent audit.

When evidence changes, update the JSON, visible static chart values/captions, CSVs, PDF and ZIP together. Preserve source/version context and distinguish hook refusals, OS deny receipts, ruleset size and synchronization progress. No frontend framework or external charting service is needed.

## Local preview

```sh
python -m http.server 8080
# then open http://localhost:8080
```

## Deployment

The site is served at **https://opendkg.org/axiom/** as part of the `OpenDKG/Websites` monorepo.
Cloudflare Pages builds `OpenDKG/Websites` (`main`) using `node scripts/build.mjs` (output directory `dist/`), which copies `opendkg.org/public/` into `dist/` and copies this `axiom/` directory into `dist/axiom/` (excluding `README.md` and other repository housekeeping files).

Keep the canonical and `og:` URLs in `index.html` and `pentesting.html` absolute for the `/axiom/` path. Do not add a second Pages project or an `axiom.opendkg.org` domain without changing those URLs first.

## Before launch

- `#download` links the public CTA to `https://github.com/OpenDKG/Axiom/releases/latest` (Windows x64 development build pending clean-machine QA; Ubuntu 24.04 amd64 and Intel macOS previews) and notes `SHA256SUMS.txt`. Keep it on public `OpenDKG/Axiom`, never the private canonical upstream. Re-check the platform and risk wording when the release matrix changes.
- Confirm the public repository URL, source disclosure, brand/trademark permissions, vulnerability reporting route and release checksums/signatures if applicable.
- Keep protection and offline claims synchronized with the actual Axiom platform test matrix. A hook decision is not equivalent to an OS-enforced block. Existing local rules and cached knowledge are not evidence of a fresh DKG sync.
- Do not turn approved reporter observations into curator-verified threat claims.

## Credits

Axiom desktop screenshots and branding are attributed to the Axiom contributors. Third-party names and trademarks belong to their respective owners. Axiom is independent; optional integrations do not imply an endorsement by OriginTrail or Umanitek.
