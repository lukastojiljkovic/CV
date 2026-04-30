<div align="center">

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│    L.S // SYS_OPERATIVE                                  │
│                                                          │
│    > whoami_                                             │
│    LUKA D. STOJILJKOVIĆ                                  │
│    — СТОЈИЉКОВИЋ                                         │
│                                                          │
│    NODE   Belgrade · Београд                             │
│    REG    RAF // CS · final yr                           │
│    STATUS [● OPEN_TO_ROLES]                              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Personal portfolio + machine-readable CV.** &nbsp;Cyberpunk terminal aesthetic, fully responsive, no framework.

[**`> OPEN portfolio ↗`**](https://lukastojiljkovic.github.io/CV/) &nbsp;·&nbsp;
[**`> OPEN CV.pdf ↗`**](https://lukastojiljkovic.github.io/CV/CV_Luka_Stojiljkovic.pdf) &nbsp;·&nbsp;
[**`> OPEN github ↗`**](https://github.com/lukastojiljkovic)

![HTML5](https://img.shields.io/badge/HTML5-ff2bd6?style=flat-square&logo=html5&logoColor=05030d&labelColor=05030d)
![CSS3](https://img.shields.io/badge/CSS3-00f0ff?style=flat-square&logo=css3&logoColor=05030d&labelColor=05030d)
![JavaScript](https://img.shields.io/badge/JS-ffb547?style=flat-square&logo=javascript&logoColor=05030d&labelColor=05030d)
![LaTeX](https://img.shields.io/badge/LaTeX-b7ff5c?style=flat-square&logo=latex&logoColor=05030d&labelColor=05030d)
![GitHub Pages](https://img.shields.io/badge/PAGES-8a52ff?style=flat-square&logo=github&logoColor=05030d&labelColor=05030d)

</div>

---

## `// SYNOPSIS`

Single-page portfolio rendered as if you booted a terminal in a corp tower of a cyberpunk megacity. The page **is** the document — there's no SPA, no React, no build step. Just three hand-tuned files and a font import. Same source compiles into a clean, ATS-friendly LaTeX CV that ships next to the site.

> *"Twenty-five operators on the team. Authored the majority of every tier &amp; shipped a fully self-hosted LLM banking assistant on top."*

---

## `// SECTOR_MAP`

```
┌─ LOG_001 ─── EDUCATION
├─ LOG_002 ─── WORK_HISTORY
├─ LOG_003 ─── SOFTWARE_ENGINEERING       [LEAD_PROJECT: BANKA_2]
├─ LOG_004 ─── AI__ML__DEEP_LEARNING      [8 cardsets]
├─ LOG_005 ─── MISC                       [4 cardsets]
├─ LOG_006 ─── TECH_STACK
└─ LOG_007 ─── META
```

---

## `// FILE_TREE`

```
CV/
├── index.html                       — the portfolio (3 fonts, 7 sections)
├── css/styles.css                   — cyberpunk terminal stylesheet
├── js/main.js                       — theme cycle · scroll-spy · build stamp
├── favicon.png                      — node sigil
├── CV_Luka_Stojiljkovic.tex         — LaTeX source for the CV
├── CV_Luka_Stojiljkovic.pdf         — compiled CV (machine-readable)
└── README.md                        — you are here
```

---

## `// AESTHETIC`

| signal       | implementation                                                                   |
|--------------|----------------------------------------------------------------------------------|
| typography   | `Major Mono Display` (display) · `Rajdhani` (HUD) · `JetBrains Mono` (mono)      |
| palette      | electric cyan `#00f0ff` · hot magenta `#ff2bd6` · sodium amber · lime status     |
| atmosphere   | radial neon gradients · CRT scanlines · subtle grid mask · grain overlay         |
| headline     | RGB-split glitch on `STOJILJKOVIĆ` (cyan + magenta strokes, random shift)        |
| live-state   | scroll-spy on sysbar · pulsing `OPEN_TO_ROLES` LED · animated `> whoami_` cursor |
| accessibility| keyboard-first focus · `aria-current` on nav · respects `prefers-reduced-motion` |

The page has a `light` opt-in mode that re-themes the same layout into a daylight neon billboard variant — different palette, no scanlines, no glow.

---

## `// LOCAL_BOOT`

No build step. Just open `index.html` directly, or serve the folder:

```sh
> python -m http.server 8000
> open http://localhost:8000
```

---

## `// CV_BUILD`

The CV is written in LaTeX. Compile with `pdflatex`:

```sh
> pdflatex CV_Luka_Stojiljkovic.tex
```

Requires the `sourcesanspro` package and the standard `hyperref` / `fontawesome5` / `paracol` collection.

---

## `// CONTACT`

```
[ e ]   stojiljkovic.d.luka@gmail.com
[tel]   +381 64 90 40 342
[git]   github.com/lukastojiljkovic
[ in]   linkedin.com/in/luka-stojiljković
```

---

<div align="center">

`// END_OF_TRANSMISSION ─────────────── L.S // SYS_OPERATIVE`

</div>
