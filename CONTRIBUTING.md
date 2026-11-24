# Contributing to opendkg.org

This repository is a small static site. Keep changes small, reviewable, and limited to the website.

## Workflow

1. Create a branch named `site/<page>-<short-change>`, for example `site/axiom-launch-cta`.
2. Change one page or one shared concern per pull request where practical.
3. Run the local checks:
   ```sh
   node scripts/check-links.mjs public
   node --test test/*.test.mjs
   ```
4. Open a pull request with:
   - what changed and why;
   - any claim changes and their sources;
   - screenshots at 320, 390, 768, 1280, and 1440 px for visual changes;
   - confirmation that no private material or secrets were added.
5. Ask one other maintainer to review. Shared CSS, header, footer, and claim policy changes should also get the design or documentation owner’s review.

Do not force-push a shared branch. Do not change repository visibility, deployment, DNS, Nginx, Cloudflare, or organization permissions as part of a website PR.

## Page ownership suggestions

| Area | Suggested owner |
| --- | --- |
| `public/axiom/` | Axiom maintainer or project liaison |
| `public/blackbox/` | Axiom/Blackbox liaison |
| `public/DKGSwarm/` | DKGSwarm maintainer |
| `public/tracabot/` | TRACaBot maintainer |
| `public/transparency/`, `test/claims.md` | Claims/documentation reviewer |
| `public/styles.css`, header/footer | Design owner |

These are suggestions for coordination, not access control. Multiple people can work on separate page directories at the same time; shared files need coordination.

## Content rules

- Read `test/claims.md` before changing product copy. Add or update the claim row for anything that states a capability, status, ownership, or limitation.
- Do not copy private Axiom source, private screenshots, private repository links, or internal release details.
- Do not add customer names, testimonials, metrics, certifications, or partnership claims without a public source and owner approval.
- Attribute vendor-described behavior to the vendor.
- Keep Axiom package direction separate from independently verified runtime behavior.
- Do not use Umanitek logos or dashboard art without written permission. Text attribution and links to official documentation are the current approach.
- No cookies, analytics, third-party scripts, external fonts, or tracking pixels.
- Do not add inline styles or scripts; the production CSP is strict.

## Adding a page

1. Create a directory with an `index.html` under `public/`.
2. Reuse the shared header/footer and `styles.css`.
3. Add a unique title, description, canonical, Open Graph tags, and one `h1`.
4. Add the route to `public/sitemap.xml`, the header/footer navigation if it is a primary project, and `scripts` test expectations if needed.
5. Add claim rows for any product statements.
6. Run the checks and review at the five responsive widths.

## License

By contributing original website code, you agree it may be distributed under the repository’s Apache-2.0 license. Do not contribute third-party product prose or assets without permission; third-party material must keep its own license and attribution.
