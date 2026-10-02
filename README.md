# Portfolio and CV

Luka Stojiljković's portfolio and one-page CV, served from GitHub Pages.

- **Portfolio:** https://lukastojiljkovic.github.io/CV/
- **CV (PDF):** https://lukastojiljkovic.github.io/CV/CV_Luka_Stojiljkovic.pdf

## Structure

```
CV/
├── index.html                  Portfolio (single page)
├── css/styles.css              Styles, light and dark themes
├── js/main.js                  Theme toggle, the BANKA_2 diagram legend and current-section highlight
├── img/                        Project screenshots (WebP), app icons and the social preview
├── fonts/                      Archivo, variable (SIL OFL 1.1, see fonts/OFL.txt)
├── favicon.png
├── DESIGN.md                   The design system: tokens, rules and components
├── PRODUCT.md                  Who the site is for and what it has to prove
├── CV_Luka_Stojiljkovic.tex    CV source
└── CV_Luka_Stojiljkovic.pdf    Compiled CV
```

## Design

The site is one brochure in a series modelled on Massimo Vignelli's Unigrid system for the US
National Park Service: a black title band over white paper on a 12-column grid, headings hung from
heavy rules, and one colour per publication. BANKA_2 is shown as a diagram of its real services;
point at a service to read what it does. The four app websites belong to the same series, each in
its app's icon colour. DESIGN.md records the system. The theme follows the system setting until you
switch it in the header, and the choice is remembered per browser.
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

stojiljkovic.d.luka@gmail.com, [GitHub](https://github.com/lukastojiljkovic),
[LinkedIn](https://linkedin.com/in/luka-stojiljkovi%C4%87)
