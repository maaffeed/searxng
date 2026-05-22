# Diesel & Pump Drive-Train Reference App

A single-page web app — no build step, no server — that describes the
mechanical and **electrical-protection** stack of a typical diesel-driven
oil & gas pump skid:

| Component       | Coverage                                                             |
|-----------------|----------------------------------------------------------------------|
| Diesel engine   | Detroit Diesel Series **92**, **60**, **71** (all common variants)   |
| Pump            | **Guinard** centrifugal / multistage / reciprocating (API 610)       |
| Fluid drive     | **Transfluid** KSL / KPTO / CSD / HSD hydrodynamic couplings         |
| Gearbox         | Parallel-shaft API 613 / 677 (Flender, Lufkin, Renold, etc.)         |
| Electrical      | Sensors, switches, ESD, ASV, FSV, SIS logic, cause-&-effect matrix   |

## Open it

Just open `index.html` in any modern browser:

```
xdg-open diesel-app/index.html   # Linux
open diesel-app/index.html       # macOS
start diesel-app/index.html      # Windows
```

No internet required, no install. State (nameplates + checklist ticks) is
stored locally in your browser via `localStorage`.

## Tabs

- **Overview** – block diagram of the drive train.
- **Detroit 92 / 60 / 71** – architecture, specs, applications, failure modes.
- **Guinard / Transfluid / Gearbox** – construction, ratings, electrical protection, how to read the nameplate.
- **Electrical Protection** – every PT/TT/ST/LSL/FE/BE/VT plus the switches
  (ASV, FSV, ESD-PB) with vendor, range, hazardous-area class, and the
  resulting safety action. Includes the full cause-and-effect (shutdown) matrix.
- **Wiring / Schematic** – ASCII single-line, loop example, cable schedule.
- **Nameplates** – upload your photographed nameplates here (drag-and-drop).
  They stay in your browser — nothing is sent over the network.
- **Commissioning Checklist** – pre-start ticks; persists per browser.

## Search

Top-right global search filters sensor cards, switch cards, matrix rows
and checklist items, and highlights matches inside paragraphs of the
active tab.

## Adding your own nameplates

1. Open the **Nameplates** tab.
2. Drag your photographed plates onto the dashed drop area, or click to choose files.
3. Type a caption (e.g. `8V-92TA s/n 06R12345 — Skid A2`) on each thumbnail.

Send me the photos in chat and I will transcribe the data into the engine
/ pump / coupling / gearbox sections so the values become searchable and
become part of the static reference.

## Files

```
diesel-app/
├── index.html
├── css/style.css
├── js/app.js
└── data/
    ├── engines.js       # Detroit 92 / 60 / 71 data
    ├── electrical.js    # sensors, switches, shutdown matrix
    └── auxiliary.js     # Guinard, Transfluid, gearbox
```
