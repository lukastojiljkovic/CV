---
name: Luka Stojiljković, portfolio
description: One brochure in a Unigrid-style identity program, shared by the portfolio and the four app websites.
colors:
  band-black: "#000000"
  paper-white: "#ffffff"
  ink: "#0d0e0c"
  ink-secondary: "#4a4f47"
  hairline: "#d5d9d1"
  band-secondary: "#c4c8c0"
  open-green: "#3ddc84"
  tile: "#eef1ea"
  tile-lifted: "#e0e5d8"
  route-red: "#c8102e"
  nexus-ochre: "#8a6410"
  refreshify-blue: "#1a5fbf"
  pwrschdlr-orange: "#b5470b"
  permadel-red: "#b3202f"
  perfwindow-teal: "#0a756c"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 6.4vw, 5.75rem)"
    fontWeight: 720
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 104"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 720
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 720
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title-small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    letterSpacing: "-0.015em"
  roles:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.1vw, 1.875rem)"
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    fontFeature: "\"tnum\""
  headline-close:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 720
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title-module:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 720
    lineHeight: 1
    letterSpacing: "-0.025em"
  title-app:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 720
    letterSpacing: "-0.02em"
  title-column:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  email:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 2rem)"
    fontWeight: 650
  sub:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.4
  ui:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
  small:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0px"
  button: "2px"
spacing:
  gutter: "24px"
  gutter-narrow: "16px"
  margin: "clamp(20px, 3.4vw, 48px)"
  section: "clamp(80px, 9vw, 128px)"
  rule-heavy: "6px"
  rule-hair: "1px"
components:
  button-light:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.band-black}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-light-hover:
    backgroundColor: "{colors.band-secondary}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-app:
    backgroundColor: "{colors.refreshify-blue}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  label:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
---

# Design System: Luka Stojiljković, portfolio

## Overview

**Creative North Star: "The Unigrid Brochure"**

Every surface is one publication in an identity program modelled on Massimo Vignelli's 1977 Unigrid system for the US National Park Service. A true black title band sits over white paper on a strict 12-column grid. Headings hang from heavy rules, and rows are separated by hairlines. Each publication owns exactly one colour. The portfolio's colour is the red of the BANKA_2 request path. Each app website takes its app icon's colour. The page reads like a printed brochure: dense where there are facts, empty where a module has nothing to say, and never boxed.

The memorable element is the system itself. BANKA_2 appears as a plain architecture diagram of its real services: flat square blocks with a heavy top rule, the gateway as the one black block, and red wires for the path every request takes. The red wires draw once on load, and after that nothing moves on its own. Interaction answers the visitor: pointing at a service lifts its block and writes what it does into the legend.

The direction replaced two rejected ones: a Tetris and wide-type gimmick, and a standard SaaS landing template with a headline, buttons and a card grid. A first version drew BANKA_2 as a park map with land, lakes and contours; the user found it unprofessional, and the diagram replaced it.

**Key Characteristics:**
- A black title band at the top and a closing black band at the bottom; white paper between.
- A 12-column grid with modules that change only in whole units at every breakpoint.
- 6px rules over headings, 1px rules between rows; no cards, no shadows.
- One typeface, Archivo, set heavy and tight for display and plain for reading.
- Three values per publication: black, paper and one colour.
- One authored motion: the route draws once.

## Colors

Three values per publication. Black and white carry the structure, and a single colour per publication carries identity.

### Primary
- **Route Red** (#c8102e): The portfolio's publication colour. It marks the request path in the BANKA_2 diagram and text selection, and nothing else on the portfolio is red. It is the one line the eye follows.

### Secondary: one colour per publication
- **Nexus Ochre** (#8a6410), **Refreshify Blue** (#1a5fbf), **Pwrschdlr Orange** (#b5470b), **PermaDel Red** (#b3202f), **PerfWindow Teal** (#0a756c): Each app's icon colour. On the portfolio it drives that app's 6px heading rule and Download button, and tints its screenshot plate (16% into paper). On the app's own website it is the publication colour. Every app has a lighter dark-theme twin (#e5bf62, #64a6f4, #ff9a5c, #f2666e, #34e0d0) that keeps contrast on the dark paper.

### Neutral
- **Band Black** (#000000): The title band and the closing band. It is true black, never a tinted near-black.
- **Paper White** (#ffffff): The page field.
- **Ink** (#0d0e0c): Headings, body text, heavy rules and the top rule of each diagram block.
- **Ink Secondary** (#4a4f47): Facts, labels, stack lines and notes.
- **Hairline** (#d5d9d1): Row separators, quiet link underlines and the line above a service's data store.
- **Tile** (#eef1ea) and **Tile Lifted** (#e0e5d8): The flat fill of a diagram block, and its hover and focus state.
- **Band Secondary** (#c4c8c0): Secondary text and inactive nav links on the black band.
- **Open Green** (#3ddc84): Only the 9px status dot beside "Open to roles".

The dark theme keeps the band black and turns the paper to #141613 and the ink to #eef0ea. Tiles darken to #1f231d, and the route lightens to #ff4d5e. The exact values live in the sidecar.

### Named Rules
**The Three Values Rule.** A publication uses black, paper and its one colour. A second accent on the same publication breaks the series.

**The One Red Line Rule.** Route red is the request path and text selection. It is never a fill, a heading colour or a second accent.

## Typography

**Display Font:** Archivo (variable, wdth 62–125, wght 100–900, self-hosted woff2), with system-ui as the fallback.
**Body Font:** Archivo, the same family.

**Character:** One grotesk carries the whole program, as in the brochures. Display sizes are heavy (720), slightly widened (104%) and tightly tracked. Reading text is plain 400 at a 1.55 line height.

### Hierarchy
- **Display** (720, clamp(3.25rem, 6.4vw, 5.75rem), 0.92): The name in the title band, in two lines, flush left.
- **Headline** (720, clamp(2rem, 3.4vw, 2.75rem), 1): Section titles, each hanging from a 6px ink rule. The closing band sets its sentence larger (clamp(2rem, 4vw, 3.5rem), 1.02), and its email at clamp(1.25rem, 2.6vw, 2rem), 650.
- **Title** (720, 1.75rem, 1.1): Stem Agent and Nexus. BANKA_2 sets it at 2.25rem and each app at 1.625rem.
- **Title Column** (700, 1.25rem): Column heads such as Experience and Education, over a 1px ink rule.
- **Title Small** (700, 1.375rem): Units inside a column, such as an employer or a school.
- **Roles** (650, clamp(1.5rem, 2.1vw, 1.875rem), 1.12): The three roles in the Open to roles block.
- **Body** (400, 1.0625rem, 1.55): Summaries and facts, held to 62–64ch.
- **UI** (600, 0.9375rem): Nav, buttons, link rows, the ledger and the legend's detail line.
- **Small** (400, 0.8125rem, 1.4): Diagram descriptions and project stack lines.
- **Label** (400, 0.875rem): The dated label under every unit heading. Its leading span (years or version) is 700 in ink with tabular numerals, followed by the role or status in Ink Secondary.

### Named Rules
**The Label Follows Rule.** Every unit carries a dated label, and it sits under the heading, never above it. Nothing is set as a kicker or eyebrow over a heading.

**The Sentence Case Rule.** Labels, nav and buttons are sentence case. Nothing is tracked-out all caps.

## Layout

The page is a 12-column grid inside a container of min(100% − 2 × margin, 1344px). The margin is clamp(20px, 3.4vw, 48px) and the gutter 24px. Sections are separated by clamp(80px, 9vw, 128px).

- **Title band:** a topline (mark, nav, Download CV, theme toggle), then the name and sub in columns 1–8 and the Open to roles block in columns 9–12, bottom-aligned. At 1440×900 the band is about 350px, so the whole BANKA_2 diagram sits in the first viewport.
- **BANKA_2:** the legend in columns 1–4 and the diagram in columns 5–12. The diagram is its own seven-column grid: clients, a 32px wire, the gateway, a wire, the services, a wire and the supporting services, on four equal rows with a 12px gap. Modules hang from a shared top line; their bottoms need not align.
- **Primary, secondary, supporting:** BANKA_2 is primary. Selected work is secondary (Stem Agent in columns 1–4, Nexus in 5–12), followed by the four apps (6 + 6). More projects and the stack matrix support. Modules may stay empty on purpose.
- **Breakpoints:**
  - At 1100px the nav hides, and the title and roles take columns 1–7 and 8–12. BANKA_2 stacks: the legend dissolves so the diagram sits between the story and its detail.
  - At 900px everything stacks into one column and the gutter becomes 16px. The project index goes to 2 columns and the stack matrix to 2.
  - At 760px the diagram becomes a single column of blocks, with the request path as a red spine down its left and the supporting services on their own thin grey spine.
  - At 640px the index and matrix go to 1 column.

**The Whole Units Rule.** At every breakpoint modules change by whole grid units. No fractional cell and no module squeezed into a gap.

## Elevation & Depth

The system is flat. There are no shadows. Depth comes from the black band against paper, from flat tiles one step off the paper, and from the rules that give each heading and block weight. The only inset lines are 1px hairlines in the dark theme, at the bottom of the band and around the gateway block, where black meets near-black paper.

**The Flat Brochure Rule.** Grouping comes from grid position, the band and rules, never from boxes. A module is not a card.

## Shapes

Everything is square except buttons, which have a 2px radius as the one concession to touch. Rules are the form language: 6px over headings (in ink, or in the publication colour for an app), 3px over a diagram block and 1px between rows. Diagram wires are square brackets drawn at right angles, 2px for the request path and 1px for the rest; there are no curves or diagonals.

## Components

### Buttons
Plain and confident, 44px tall, 0 18px padding, 650 weight, 2px radius, with no wrapping.
- **Light** (on the band): Paper White with black text. On hover it turns Band Secondary. This is the one primary action, Email me.
- **Line** (on the band): transparent with a 1px border of white at 45% opacity. On hover the border turns solid white. Used for GitHub and LinkedIn.
- **App:** the publication colour with white text (black text in the dark theme). On hover it mixes 14% ink into the colour. Used only for Download.
- **Press:** translateY(1px). **Focus:** a 2px ink outline at a 3px offset (white on the band).

### Text links
The underline is 1px with a 4px offset, in Hairline, turning to the current colour on hover. The closing email is the exception: 2px thick with a 6px offset.

### Navigation
Topline links are Band Secondary at 500 weight. The current section and hover turn white and underlined. The nav hides below 1100px.

### Dated unit
A heading (Title or Title Small), then the dated label, then a summary and facts with disc markers in ink. A stack line in 600 weight Ink Secondary and links follow. Units in a column are divided by Hairline rules.

### Plate
An app screenshot centred on its publication colour, tinted 16% into paper, at a 3:2 aspect ratio. The pad is clamp(12px, 2.2vw, 28px) and the image has a 1px ink outline at 18%. Light and dark screenshots swap with the theme.

### The system diagram (signature)
HTML, not an image, so it reflows with the page. Each service is a button: a Tile block with a 3px ink top rule, its name (700, 1.0625rem), what it does (0.8125rem, Ink Secondary) and, for a service with data, its data store at the foot above a Hairline. The gateway is the one black block. Wires are bracket elements drawn with borders between grid rows. Pointing at, focusing or tapping a block lifts it to Tile Lifted and writes its description into the legend's detail line, which is aria-live. The two red wires draw in once, client side first (0.6s, cubic-bezier(0.16, 1, 0.3, 1), 0.3s and 0.7s delays), and are static under reduced motion.

## Do's and Don'ts

### Do:
- **Do** open every publication with the true black band (#000000) and close it with the same band.
- **Do** hang every section heading from a 6px rule, and separate rows with 1px Hairline rules.
- **Do** give each publication exactly one colour, taken from its icon, and use it for its rules, its plates and its primary button.
- **Do** put a dated label under every unit heading, with the date in 700 tabular numerals.
- **Do** theme the browser surfaces from the palette: text selection in Route Red, scrollbar in Ink Secondary on paper, focus outlines in ink.
- **Do** keep the single authored motion. Interaction may answer the visitor; nothing else moves on its own.
- **Do** draw systems as diagrams of their real parts: square blocks, right-angled wires, the request path in red.

### Don't:
- **Don't** use cards, drop shadows, glass or gradient fills to group content.
- **Don't** set labels, kickers or eyebrows above headings, or set any text in tracked-out capitals.
- **Don't** use a tinted near-black for the band or a cream for the paper.
- **Don't** introduce a second typeface or monospace for labels.
- **Don't** join meta strings with middle dots or append arrows to links and buttons.
- **Don't** fall back to the headline, buttons and card grid template, or to the Tetris and wide-type treatment the user rejected.
- **Don't** illustrate software as landscapes, maps or other metaphors; the user rejected the park map as unprofessional.
