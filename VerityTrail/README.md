# VerityTrail Website (`/veritytrail/`)

Static project website for **VerityTrail** (served at `https://opendkg.org/veritytrail/`), styled in the **Graphite Dark & Steel Blue** theme from the desktop application (`TrailPalette.axaml`) on top of the shared OpenDKG static layout system.

## Structure

```text
VerityTrail/
├── index.html                   Main landing page
├── README.md                    This documentation
└── assets/
    ├── veritytrail-mark.svg     Standalone 3-node V BrandMark SVG (favicon, lockup, hub)
    ├── veritytrail-banner.svg   Graphite Dark 5-step pipeline banner SVG (1400x420)
    ├── app-screenshot.png       Desktop VM Lab screenshot (1920x1039)
    ├── theme.css                Graphite Dark & Steel Blue overrides loaded after silver-effects.css
    ├── site.css                 Base layout & responsive grid
    ├── titanium.css             Dark surface base rules
    ├── refinements.css          Typography & spacing refinements
    ├── silver-home.css          Home cards & ecosystem map layout
    ├── silver-effects.css       Hairline dividers & hover transitions
    ├── nav-donate.css           Header donate link alignment
    ├── privacy-notice.css       Zero-cookie bottom privacy notice styling
    ├── site.js                  Mobile menu toggle & dynamic copyright year
    ├── privacy-notice.js        Dismissible localStorage-backed privacy notice
    ├── fonts/                   Self-hosted Manrope & Space Grotesk variable fonts
    ├── icons/                   Self-hosted UI & platform icons
    └── brands/                  Partner brand marks (OriginTrail, Umanitek, Agent Blackbox)
```

## Privacy & Security Constraints

- Zero inline `<script>` tags (`site.js` and `privacy-notice.js` are loaded with `defer`)
- Zero external fonts, CDNs, or `data:` URIs
- Zero cookies or analytics trackers
- All internal asset references resolve locally with exact casing
