# OpenDKG Desktop Website (`/desktop/`)

Static project website for **OpenDKG Desktop**, served at `https://opendkg.org/desktop/`.

## Structure

- `index.html` — Responsive landing page covering the `127.0.0.1:4820` local AI gateway, 3-layer agent memory, Spend Guard, self-custody DKG v10 wallets on Base, OT-RFC-27 ecosystem loop, and `v0.5.0` pre-1.0 milestone status.
- `assets/theme.css` — Obsidian Dark Teal theme overrides loaded after the shared base stylesheets (`site.css`, `titanium.css`, `refinements.css`, `silver-home.css`, `silver-effects.css`, `nav-donate.css`, `privacy-notice.css`).
- `assets/site.js` — Mobile navigation drawer and footer year script.
- `assets/privacy-notice.js` — Dismissible zero-cookie privacy notice (`localStorage` preference only).
- `assets/fonts/`, `assets/icons/`, `assets/brands/` — Self-hosted Manrope and Space Grotesk variable fonts, platform/brand icons, and desktop screenshots (`app-screenshot.png`, `banner.png`, `logo.png`, `icon.svg`).

## Privacy & Build Constraints

- Pure static HTML/CSS/JS — no build step, no external CDNs, no external fonts, no inline `<script>` tags, no `data:` URIs, and no cookies or analytics.
