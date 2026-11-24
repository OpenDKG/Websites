# OpenDKG Websites

Public monorepo for the OpenDKG umbrella website (`opendkg.org`) and the Axiom project website (`opendkg.org/axiom/`).

## Repository layout

```text
opendkg.org/            Main OpenDKG site (HTML/CSS, CSP headers, link checker, tests)
  public/               Static source files served at /
  scripts/              Site link and metadata checker
  test/                 Automated tests, claim checklist, and audit notes
axiom/                  Axiom project site, built into /axiom/
scripts/
  build.mjs             Assembles opendkg.org/public/ and axiom/ into dist/
dist/                   Generated Cloudflare Pages output (gitignored)
```

## Local build and preview

Build `dist/` using Node.js (no external dependencies required):

```sh
node scripts/build.mjs
python3 -m http.server 8080 -d dist
```

Open `http://127.0.0.1:8080/`.

## Checks

```sh
node scripts/build.mjs
node opendkg.org/scripts/check-links.mjs dist
node --test opendkg.org/test/*.test.mjs
```

## Deployment (Cloudflare Pages)

Cloudflare Pages builds directly from `main` in this repository:

- **Build command:** `node scripts/build.mjs`
- **Build output directory:** `dist`
- **Root directory:** *(empty / repository root)*

Every push to `main` builds `opendkg.org/public/` and `axiom/` together into `dist/` (excluding Axiom repository housekeeping files such as `README.md`, `.gitignore`, `.gitattributes`, and `.github/`) and deploys to `https://opendkg.org/`.

## License

Original website code in this repository is licensed under Apache-2.0; see [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
