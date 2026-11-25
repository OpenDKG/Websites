# Claim review

Status: current public site. Wording and launch approval remain owner decisions.

Every product statement on the site should appear here with a basis. “Owner direction” means the user explicitly approved the positioning; it is not independent verification. “Vendor docs” means the capability is described by the third party and is attributed on the page.

## OpenDKG

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| Home, footer | OpenDKG is an independent open-source initiative. | https://github.com/OpenDKG/.github | Public fact |
| Home | OpenDKG is an umbrella for several independent projects; not all are security tools. | https://wiki.dkgswarm.com/working/projects/portfolio and public project status | Public fact |
| Home, transparency | No partnership or endorsement is implied by third-party integration. | https://github.com/OpenDKG/.github and https://github.com/OpenDKG/.github/blob/main/GOVERNANCE.md | Public governance |
| Home | The site uses no cookies, analytics, or third-party requests. | Implementation: no scripts, no external fonts, no images or calls | Local verification |
| Home, 2026-11-16 (corrected) | OpenDKG is a small collaborative initiative; its work includes open-source applications, connectors and tools, from everyday utilities to privacy, security and community tools. The three featured projects are current examples, not the whole scope. Their starting problems are agent file, command and network access; repeated assistant work; and scam reports trapped in one Telegram group. | https://github.com/OpenDKG profile README ("applications, connectors and tools"; "everyday utilities, integrations, automation, community tools, developer tools and privacy or security features"; "No particular technology or product defines the entire initiative"); https://opendkg.org/axiom/, https://dkgswarm.com/, https://tracabot.com/ | Public org profile + public project descriptions; owner-approved positioning |
| Home metadata, 2026-11-16 (corrected) | Title and descriptions describe broad scope (privacy, security, everyday use; open-source applications, connectors and tools) and do not define the initiative by the three examples. | Same org profile; project pages | Public org profile; owner-approved positioning |
| Home, 2026-11-16 | Axiom, DKG Swarm and TRACaBot are the featured projects; links point to their public sites. | The three public sites above; https://github.com/OpenDKG/dkgswarm | Public fact |
| Home, 2026-11-16 | The projects are separate, not one product; source is public where available; this page only links to them, sets no cookies and loads nothing from third parties. | Org profile https://github.com/OpenDKG; public repositories; implementation: no scripts, forms, cookies or external requests | Public fact + local verification |
| Home, 2026-11-16 | DKG Swarm's source and the organization's contribution and governance rules are public on GitHub. | https://github.com/OpenDKG/dkgswarm; https://github.com/OpenDKG/.github (CONTRIBUTING.md, GOVERNANCE.md) | Public fact |
| Home, 2026-11-16 | No cookies, analytics or third-party requests. | Live audit 2026-11-16: four same-origin requests (`/`, `/home.css`, `/assets/opendkg-logo.png`, `/favicon-opendkg.png`), no scripts | Local verification |

## Axiom

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| Axiom, home | Axiom is a Windows network monitor and firewall manager. | https://wiki.dkgswarm.com/projects/axiom/overview | Public fact |
| Axiom, home | Axiom manages only its own Windows Firewall rules; Windows remains the enforcement authority. | https://wiki.dkgswarm.com/projects/axiom/overview | Public fact |
| Axiom, home | Core monitoring and firewall management are local; optional integrations are separate. | https://wiki.dkgswarm.com/projects/axiom/overview | Public fact |
| Axiom, home | Axiom is an independent project documented in the OpenDKG portfolio. | https://wiki.dkgswarm.com/projects/axiom/overview and https://wiki.dkgswarm.com/working/projects/portfolio | Public fact |
| Axiom | GPL-3.0-or-later. | https://wiki.dkgswarm.com/projects/axiom/overview | Public fact |
| Axiom | Windows is the current platform. | https://wiki.dkgswarm.com/projects/axiom/overview | Public fact |
| Axiom, home, transparency | Axiom is in active development with public builds and source; releases may be previews, and the project is not audited or production-ready. | https://github.com/OpenDKG/Axiom and https://github.com/OpenDKG/Axiom/releases/latest (checked 2026-11-21: `v1.4.8`, non-draft, non-prerelease) | Public repository + release metadata; owner direction 2026-11-21 supersedes the 2026-11-14 launch placeholder |
| Axiom, home, Blackbox, transparency | The Axiom package includes Guardian Agent Blackbox as an optional agent guardrail. | Owner direction, 2026-11-14 | Owner-approved package direction; not an independent runtime test |
| Axiom | Axiom does not replace Windows security or guarantee protection. | Public project limits and vendor/owner boundary; no absolute claims permitted | Editorial boundary |
| Axiom | Agent blocking is a separate layer and depends on Blackbox and the agent host. | https://wiki.dkgswarm.com/projects/axiom/overview and Blackbox vendor docs | Public fact + vendor description |
| Home, Axiom, 2026-11-21 (supersedes 2026-11-16) | AI agent security; public builds in active development. Windows x64 installer and portable ZIP; Ubuntu 24.04 amd64 and Intel macOS previews (the macOS build is ad-hoc signed and its network extension needs separate activation); checksums in `SHA256SUMS.txt`; not audited or production-ready; firewall, DNS or agent-hook changes can interrupt connectivity or block tools. Source at https://github.com/OpenDKG/Axiom (`GPL-3.0-or-later`); downloads at https://github.com/OpenDKG/Axiom/releases/latest. | Release metadata and asset names checked 2026-11-21 via the public GitHub API; risk caveat quoted from the public repository README | Public repository + release fact; owner-approved 2026-11-21 |

Note, 2026-11-16: the public Axiom site now states Windows, macOS and Linux. Homepage copy follows that public source. The Windows-only rows above describe the 2026-11-14 draft and are not used on the homepage.

Note, 2026-11-21: the 2026-11-16 "unreleased / no public download or application repository yet" row is superseded by the dated release row above. Public source and the `releases/latest` link are approved for the homepage, `/axiom/#download` and transparency pages.

**Do not publish without a new approval:** “flagship,” “protects you from AI,” “blocks every agent,” an unqualified “works on macOS/Linux” (those are previews), a pinned Axiom version or pinned asset URL, the private canonical upstream repository, private screenshots, or any claim that a planned deeper integration is implemented. Public source (`https://github.com/OpenDKG/Axiom`) and the `releases/latest` link are approved; the 2026-11-16 prohibition on a public source/download link is lifted.

## Guardian Agent Blackbox

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| Blackbox, home | Guardian Agent Blackbox is an open-source runtime guard for AI agents, built by Umanitek. | https://umanitek.ai/blackbox and https://github.com/umanitek/agent-blackbox | Vendor/public fact |
| Blackbox | MIT-licensed. | https://github.com/umanitek/agent-blackbox | Public repository fact |
| Blackbox | Watches prompts, tool calls, commands, files, packages, and skills. | https://github.com/umanitek/agent-blackbox/blob/main/README.md | Vendor docs |
| Blackbox | Covers prompt injection, vulnerable dependencies, dangerous commands, sensitive-file access, secret exposure, and suspicious skills. | https://umanitek.ai/blackbox and README | Vendor docs, attributed |
| Blackbox | Audit mode is the default; blocking is opt-in. | README | Vendor docs |
| Blackbox | Fails open; a guard fault does not stop the agent. | README | Vendor docs |
| Blackbox | Community and heuristic findings are flag-only; a block needs block mode, severity, and a trusted source. | README | Vendor docs |
| Blackbox | Hermes works out of the box; OpenClaw uses a bundled bridge; a local DKG node is used for threat graphs. | README | Vendor docs |
| Blackbox | OpenDKG is not Umanitek; no partnership or endorsement is claimed. | No partnership evidence found; Axiom documentation disclaims an official partnership | Editorial boundary |

**Do not publish:** “stops all prompt injection,” “immune,” “OpenDKG partner,” “official OpenDKG guard,” Umanitek logos or dashboard art, or a claim that Umanitek endorses OpenDKG.

## DKGSwarm

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| DKGSwarm, home | DKGSwarm is an OpenDKG project, MIT-licensed, live at dkgswarm.com. | https://github.com/OpenDKG/dkgswarm and https://wiki.dkgswarm.com/projects/dkgswarm/overview | Public fact |
| DKGSwarm | Remote MCP connector for shared OriginTrail/TRAC context. | https://wiki.dkgswarm.com/projects/dkgswarm/overview | Public fact |
| DKGSwarm | Reader and writer are separate; writer access uses an operator-issued single-use code; curator promotion is separate. | https://wiki.dkgswarm.com/projects/dkgswarm/architecture | Public fact |
| DKGSwarm | Single context graph; other graphs require explicit opt-in. | https://wiki.dkgswarm.com/projects/dkgswarm/overview and architecture | Public fact |
| DKGSwarm | Does not publish Verifiable Memory on-chain; no signed task dispatch. | https://wiki.dkgswarm.com/projects/dkgswarm/overview | Public fact |
| DKGSwarm | Not a security guard; graph text is untrusted; no prompt-injection immunity. | https://wiki.dkgswarm.com/projects/dkgswarm/overview and architecture | Public fact |
| Home, 2026-11-16 | MCP connector for AI assistants; shared source-linked memory built on OriginTrail; free reader access; contributing needs approval; source at github.com/OpenDKG/dkgswarm. | https://dkgswarm.com/ ("Free reader access", "contributions need approval"); https://github.com/OpenDKG/dkgswarm | Public site copy + public repository |

## TRACaBot

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| TRACaBot, home | Independent, MIT-licensed Telegram anti-scam bot. | https://github.com/brxtrac/tracabot and https://wiki.dkgswarm.com/projects/tracabot/overview | Public fact |
| TRACaBot | Silent observe/log by default; manual commands optional. | https://github.com/brxtrac/tracabot | Public repo |
| TRACaBot | Automatic removal is opt-in and evidence-gated. | https://github.com/brxtrac/tracabot | Public repo |
| TRACaBot | Shared and verified-graph records are flag-only in the installed adapter. | https://github.com/brxtrac/tracabot | Public repo |
| TRACaBot | Current development is separate; this page links only public history. | https://github.com/brxtrac/tracabot and https://wiki.dkgswarm.com/projects/tracabot/overview | Public fact |
| Home, TRACaBot, 2026-11-16 (corrected) | For Telegram group admins; flags impersonators and scam patterns, keeps evidence for review, shares reviewed findings with other groups; with granted admin rights and settings it can delete messages or remove people on its own; removing someone as they join is a separate opt-in. | https://github.com/brxtrac/tracabot README: enforcement uses the exact granted rights (delete requires `can_delete_messages=true`; ban/restrict rights also required); "Automatic removal is a separate, explicit opt-in (`TRACABOT_JOIN_AUTO_REMOVE=true`)" | Public repo; no manual-approval or catch-all claim |

**Do not publish:** “stops all scams,” “automatically bans scammers,” “OpenDKG-owned,” or a link to the private development repository.

## DKG Graph Local

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| `/graph/`, home, `/apps/` | Zero-gas neuro-symbolic knowledge vault powered by OriginTrail DKG v10.1.2 Working Memory, WASM Graph Computer, Privacy Split proof certificates, and loopback MCP `:3847` for 12 AI clients. | https://github.com/OpenDKG/DKG-Graph-Local (`README.md`, `docs/ARCHITECTURE.md`) | Public fact |
| `/graph/`, home, `/apps/` | Native Rust auto-sync watched folders recursively monitor local directories and debounce `.md`, `.markdown`, `.txt`, `.pdf`, and `.docx` background re-indexing with persistent `watched-dirs.json`. | https://github.com/OpenDKG/DKG-Graph-Local (`apps/desktop/src-tauri/src/watcher.rs`, `README.md`) | Public fact |
| `/graph/`, home, `/apps/` | Optional wallet keys are encrypted with AES-256-GCM using an OS Keychain / Windows Credential Manager master key (`keyring` + in-memory `k256` EIP-191 signing, with local keyfile fallback); private keys are never returned by GET endpoints or logged to Blackbox. | https://github.com/OpenDKG/DKG-Graph-Local (`apps/desktop/src-tauri/src/keychain.rs`, `packages/core-engine/src/dkg/walletStore.ts`, `README.md`) | Public fact |
| `/graph/` | `v0.5.0-pre` (`GPL-3.0-or-later`), Windows x64 tested with Tauri 2 desktop shell and native dark/light titlebar sync; macOS and Linux desktop packages planned for `v1.0.0`. | https://github.com/OpenDKG/DKG-Graph-Local (`README.md`, Platform Support roadmap) | Public fact |

## Excluded projects

RepNet and TracaPlot are not presented as launched products. RepNet has no verified public repository, license, or implementation state. TracaPlot is not in the public portfolio.

## Forbidden-claim review

Run before publishing:

```sh
grep -RInE "guarantee|immune|unhackable|certified|trusted by|blocks all|prevents all|military-grade|bank-level|partner|official" public
```

Each hit needs a documented reason or removal. “No partnership” and “not official” are allowed negative statements; review them in context.

## Axiom site (vendored)

`public/axiom/` is synced automatically from https://github.com/OpenDKG/Axiom-Website `main` by `opendkg-sync[bot]` (`rsync --delete`), most recently at `1f0ff20` (2026-11-21). Axiom product, platform, evidence and download claims are maintained and reviewed in that repository. The 2026-11-21 `#download`/`#platforms` release-availability copy is applied upstream there and arrives here through the sync. The only downstream-local changes remain `canonical`, `og:url` and an absolute `og:image` for the `/axiom/` path. Do not edit `public/axiom/` directly without mirroring the change upstream first.


## Homepage roadmap preview (MKT-003)

| Page | Claim | Basis | Status |
| --- | --- | --- | --- |
| Home `#roadmap` | Three milestone phases (Now / Next / Later) summarise public project status only; no release dates are promised. | Public status labels on `/`, `/apps/`, `/axiom/`, `/desktop/`, `/graph/`, `/veritytrail/`, `dkgswarm.com`, `tracabot.com` | Public fact + editorial boundary |
| Home `#roadmap` | Axiom is an active-development release; clean-machine QA has not closed and nothing is labelled stable or QA-cleared. | `OpenDKG/Axiom` release metadata; OPS-001 QA gate status (still open); public `README.md` limits | Public fact; owner-approved gate |
| Home `#roadmap` | DKG Graph Local macOS and Linux desktop packages are planned for `v1.0.0`; Windows x64 is the tested build today. | https://github.com/OpenDKG/DKG-Graph-Local (`README.md`, Platform Support roadmap) | Public fact |
| Home `#roadmap` | VerityTrail is an RC `0.1.0` in active development; release-candidate hardening precedes a stable build. | `/veritytrail/` public status label | Public site copy |
| Home `#roadmap` | Later items are direction only, not a promise or schedule. | Editorial boundary | Editorial boundary |

**Do not publish without a new approval:** a dated roadmap, a roadmap item described as shipped, any claim that Axiom has passed QA, or any private, unannounced product name in a milestone.
