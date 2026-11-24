# DKG Graph Local Website (`/graph/`)

Static marketing and documentation landing page for **DKG Graph Local**, served at `https://opendkg.org/graph/` as part of the OpenDKG Pages build.

## Structure

- `index.html` — Single-page site adapted from the OpenDKG/Axiom layout and styled for DKG Graph Local.
- `assets/theme.css` — Dark Glass Sapphire-Ice & Mint stylesheet loaded after the shared base layers (`site.css`, `titanium.css`, `refinements.css`, `silver-home.css`, `silver-effects.css`, `nav-donate.css`, `privacy-notice.css`).
- `assets/site.js` & `assets/privacy-notice.js` — Deferred client scripts for mobile navigation toggle, footer year, and localStorage dismissal of the zero-cookie privacy notice.
- `assets/app-screenshot.png`, `assets/hero-banner.png`, `assets/app-icon.png`, `assets/icon-32.png`, `assets/icon-128.png` — Product visuals and icons.
- `assets/fonts/` — Self-hosted `Manrope-var.ttf` and `SpaceGrotesk-var.ttf` variable fonts.

## Static & Privacy Guarantees

- Zero build step required — pure HTML, CSS, and vanilla JS.
- Zero external CDNs, remote fonts, inline `<script>` tags, inline data URIs, cookies, or analytics trackers.
- Honest `v0.5.0-pre` (`GPL-3.0-or-later`) status: documents Windows x64 availability and `v1.0.0` roadmap plans for macOS and Linux.
