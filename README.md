# Portfolio and CV

Luka Stojiljković's portfolio and one-page CV, served from GitHub Pages.

- **Portfolio:** https://lukastojiljkovic.github.io/CV/
- **CV (PDF):** https://lukastojiljkovic.github.io/CV/CV_Luka_Stojiljkovic.pdf

## Structure

```
CV/
├── index.html                  Portfolio (single page)
├── css/styles.css              Styles, light and dark themes
├── js/main.js                  Theme toggle and current-section highlight
├── img/                        Project screenshots (WebP)
├── fonts/                      Geist and Geist Mono, self-hosted (SIL OFL 1.1, see fonts/OFL.txt)
├── favicon.png
├── CV_Luka_Stojiljkovic.tex    CV source
└── CV_Luka_Stojiljkovic.pdf    Compiled CV
```

## Design

A wireframe layout: off-white background, hairline frames, monochrome type and one green accent for
links, focus and availability. The theme follows the system setting until you switch it in the header,
and the choice is remembered per browser.
There is no build step and no third-party request at runtime.

## Run locally

Serve the folder and open it in a browser:

```sh
python -m http.server 8000
```

## Build the CV

```sh
pdflatex CV_Luka_Stojiljkovic.tex
```

Needs a LaTeX distribution with `sourcesanspro`, `titlesec`, `enumitem`, `tabularx` and `hyperref`
(MiKTeX installs missing packages on first run). The PDF must stay one page.

## Contact

stojiljkovic.d.luka@gmail.com · [GitHub](https://github.com/lukastojiljkovic) ·
[LinkedIn](https://linkedin.com/in/luka-stojiljkovi%C4%87)
