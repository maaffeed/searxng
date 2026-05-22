/* Auxiliary equipment: Guinard pump, Transfluid fluid drive, Gearbox.
 * Built from public OEM literature for skid-mounted oil & gas pump-sets.
 */

window.AUXILIARY = {
  guinard: {
    title: "Guinard Pumps (Pompes Guinard)",
    family: "French OEM — centrifugal, multistage, and reciprocating pumps for oil, gas, water-flood, and refinery service",
    intro: `Guinard (now part of the SPX FLOW / ClydeUnion Pumps family after multiple ownership
    changes through Weir, Sulzer-Bingham etc.) is a long-standing French pump manufacturer well
    represented on legacy oilfield and refinery sites. The brand is associated with API 610
    BB-type (between-bearing) and OH-type (overhung) centrifugal pumps for crude transfer, water
    injection, and product loading — and with high-pressure reciprocating units for cementing and
    well-stimulation. On older Algerian, Libyan, and Middle-Eastern fields, Guinard pumps are
    commonly found direct-coupled to Detroit Diesel engines via a Transfluid fluid coupling and a
    speed-increasing gearbox.`,
    typical: [
      ["Series", "API 610 BB3 / BB5 (multistage barrel) for HP injection — BB2 for crude export"],
      ["Materials", "S-6 / S-8 / C-6 per API 610 Table H — duplex for sour service"],
      ["Speed range", "1500–3600 RPM input — geared up from 1800 RPM engine output"],
      ["Capacity", "50–2500 m³/h"],
      ["Head", "Up to 2500 m TDH (multistage)"],
      ["Suction", "Single or double, axial entry"],
      ["Bearings", "Anti-friction (BB3 small frames) or hydrodynamic sleeve + tilting-pad thrust (BB5)"],
      ["Seals", "API 682 cartridge mechanical — Plan 11 / 13 / 23 / 52 / 53A/B/C per service"],
      ["Coupling", "Spacer-type flexible disc (Falk Steelflex / Rexnord Thomas)"],
    ],
    electricalProtection: [
      "Suction pressure transmitter (PT-201) — low-low trip for dry-running protection.",
      "Discharge pressure transmitter (PT-202) + mechanical relief valve sized for shut-off head.",
      "Bearing Pt100s on DE + NDE per API 670.",
      "Vibration probes — radial X/Y on BB5 frames per API 670 (proximity 8 mm probes, 5 mm offset).",
      "Seal-flush Plan 52/53 reservoir level + pressure switches — buffer-fluid loss alarm.",
      "Stator winding / casing thermowells where steam-traced for waxy crudes.",
      "Anti-static bonding strap to the skid earth bar — mandatory for ATEX zone 1 sites.",
    ],
    famousFor: `Robust, repairable French engineering, widely paired with diesel-engine prime
    movers on remote production stations. Spare-part interchange with later ClydeUnion / SPX
    designs is common. Care must be taken with original imperial vs metric impeller dimensions
    when retrofitting modern wear rings.`,
    nameplateHints: `Guinard nameplates typically list: TYPE (e.g. CN, CD, MN, RS, DVMX series),
    DIMENSION / SIZE in API form "Disch × Suct × Imp" (inches), N° DE FABRICATION (serial),
    DÉBIT / CAPACITY (m³/h), HAUTEUR DIFFÉRENTIELLE / DIFFERENTIAL HEAD (m), VITESSE / SPEED (RPM),
    ÉPREUVE HYDRO (hydrotest bar), TEMPÉRATURE SERVICE (°C), MASSE SPÉCIFIQUE (SG), PALIER
    RADIAL / BUTÉE (bearing designations), DATE FABRICATION. Photograph BOTH the pump body plate
    and the mechanical-seal cartridge plate — the seal plate carries the API 682 plan code.`,
    seriesGuide: [
      ["CN / CD",   "Single-stage end-suction (OH1/OH2). General service, water and light hydrocarbon transfer."],
      ["MN / MX",   "Multi-stage horizontal split-case (BB3). Mid-pressure water-flood / fire-water."],
      ["DVM / DVMX","Multi-stage 'diffuseur vertical' barrel (API 610 BB5). High-head injection — typical Q = 50–800 m³/h, H up to ~2500 m. The 'X' suffix indicates the extractible (cartridge) version for in-situ rotor removal."],
      ["RS",        "Reciprocating (triplex/quintuplex) — cementing, mud, well-stimulation."],
      ["VTP",       "Vertical turbine pump for sump / sea-water lift."],
    ],
    onSitePlates: [
      {
        title: "Guinard DVMX · 3×4×9 · S/N 467 537 (1994)",
        img: "assets/nameplates/guinard-dvmx-467537.jpg",
        rows: [
          ["Type / Size",          "DVMX · 3 × 4 × 9 (Disch × Suct × Imp, inches)"],
          ["Item / Repère Client", "PN 203"],
          ["Serial / N° Fab",      "467 537"],
          ["Year",                 "1994"],
          ["Capacity",             "145 m³/h"],
          ["Differential Head",    "650 m"],
          ["Hydrotest",            "190 bar"],
          ["Speed",                "4 000 RPM"],
          ["Pumping Temp",         "38 °C"],
          ["Fluid SG",             "0.84  (light hydrocarbon — condensate / naphtha)"],
          ["Radial Bearing",       "SKF 7215 (75 mm bore, angular-contact)"],
          ["Thrust Bearing",       "SKF 7312"],
          ["Hydraulic power",      "≈ 216 kW (calculated ρgQH)"],
          ["Estimated shaft power","≈ 300 kW / 400 BHP at η = 0.72"],
          ["Gearbox ratio needed", "≈ 2.2 : 1 (1800 RPM engine) or 1.9 : 1 (2100 RPM)"],
          ["Engine fit",           "Detroit 8V-92TA (365–500 BHP) — comfortable margin"],
        ],
      },
      {
        title: "Roplan / John Crane mechanical seal (cartridge)",
        img: "assets/nameplates/roplan-johncrane-seal.jpg",
        rows: [
          ["Brand",     "Roplan · John Crane (Smiths Group). Roplan AB Sweden, acquired by John Crane 2009"],
          ["Type",      "Cartridge pusher seal (Roplan RP/AKM family, equivalent to JC Type 5860 / Type 28)"],
          ["Stamp",     "F1 0793… (build code — remainder corroded/painted over)"],
          ["Likely arrangement", "Single cartridge (API 682 Plan 11 or Plan 23) on light-HC service @ 38 °C"],
          ["Faces",     "Typically SiC vs Carbon (light HC) or SiC vs SiC (sour service)"],
          ["Elastomers","FKM/Viton or FFKM/Kalrez per H₂S content"],
          ["Field action", "Replace as full cartridge — do NOT split. Check sleeve hook-up tolerance to the shaft."],
        ],
      },
    ],
  },

  transfluid: {
    title: "Transfluid Fluid Coupling / Fluid Drive",
    family: "Hydrodynamic (Föttinger principle) fluid coupling — Transfluid S.p.A., Italy",
    intro: `Transfluid is an Italian manufacturer (Milan, founded 1957) of hydrodynamic
    couplings, hydraulic clutches, and complete drop-in transmissions for diesel-engine driven
    pumps, compressors, fans, and marine propulsion. A Transfluid coupling sits between the
    diesel engine flywheel and the gearbox/pump and provides: soft start, torsional damping,
    overload protection (slip), and optional variable-speed control (scoop-tube types). The
    most common families in oil & gas pump-skid service are the KSL (constant-fill), KPTO
    (variable-fill with scoop tube), and CSD/HSD (clutch-equipped) series.`,
    types: [
      { code: "KSL",   desc: "Constant-fill, fixed slip ~ 2–3 % — for fixed-speed pump duty (most common)." },
      { code: "KPT/KPTO", desc: "Variable-fill with scoop tube — output speed varies 0–98 % of input." },
      { code: "CSD",   desc: "Hydraulic clutch + coupling — engage/disengage under load." },
      { code: "HSD",   desc: "Heavy-duty CSD with integral oil cooler — for cyclic frac/cement duty." },
    ],
    typical: [
      ["Working fluid", "Mineral oil ISO VG 32 or 46 (synth on hot-climate skids)"],
      ["Slip (KSL)", "1.8 – 3 % at rated power"],
      ["Cooling", "Internal centrifugal cooler OR external air-blast oil cooler"],
      ["Heat exchanger", "Shell-and-tube water-cooled, or Behr/Akg air-blast on dry sites"],
      ["Working oil temp", "Normal 60–85 °C, alarm 95 °C, trip 110 °C"],
      ["Fusible plug", "Eutectic alloy 140 °C — discharges oil if cooling fails (last-line protection)"],
      ["Input speed", "Up to 2400 RPM (model dependent)"],
      ["Power range", "30 to 8000 kW depending on size"],
    ],
    howItWorks: `The pump-impeller (driven by the engine) accelerates oil radially outward.
    Oil crosses the small clearance gap and strikes the turbine-runner blades (driving the
    pump/gearbox). Torque transfers without mechanical contact. Slip (the rotational difference
    between impeller and runner) becomes heat — dissipated by an oil cooler. The fusible plug
    is a brass plug filled with a 140 °C alloy; if the oil overheats it melts, dumping the
    working oil and disengaging the drive — the diesel engine then revs free.`,
    electricalProtection: [
      "TT-301 — working-oil temperature (Pt100) on the cooler outlet.",
      "LSL-303 — oil-level low switch on the header / expansion tank.",
      "ST-302 — output speed pickup, paired with the engine MPU for slip calculation.",
      "Optional PT — internal working pressure on KPTO / CSD types.",
      "Cooling-water flow switch (FSL-304) when a water-cooled HE is fitted.",
      "Fusible-plug 'oil-on-ground' detection — a hydrocarbon leak sensor under the skid drip-tray.",
    ],
    famousFor: `Soft-starting heavy reciprocating pumps without stressing the diesel engine,
    and tolerating sudden load spikes (e.g. choke-down on a triplex pump) by simply slipping
    momentarily. KPTO scoop-tube versions provide infinitely variable speed at constant engine
    RPM — used on water-injection trains where flow modulation is required without a VFD.`,
    nameplateHints: `Transfluid plates list MODEL (e.g. KSL 27, KPTO 32 D), SERIAL, YEAR,
    INPUT/OUTPUT FLANGE codes, MAX SPEED, NOMINAL POWER (kW), and OIL VOLUME. Note the fusible
    plug temperature (stamped on the plug itself, not on the main plate).`,
  },

  gearbox: {
    title: "Reduction / Speed-Increasing Gearbox",
    family: "Parallel-shaft (API 613) — pump-drive service",
    intro: `Between the Transfluid coupling and the pump shaft sits a gearbox — usually a
    single-stage parallel-shaft speed-increaser (for centrifugal pumps that run faster than the
    engine) or a speed-reducer (for triplex/quintuplex reciprocating pumps that run slower).
    The most common manufacturers seen in this configuration include Lufkin, Flender (Siemens),
    Renold, Allen Gears, Hansen / Sumitomo, and Cotta. API 613 / API 677 covers the design and
    inspection requirements for special-purpose and general-purpose gear units in the petroleum
    industry.`,
    typical: [
      ["Type", "Helical, parallel-shaft, hydrodynamic-bearing (API 613)"],
      ["Ratio", "1.5:1 (speed-up to 2700 RPM) ... 5:1 (reducer to 360 RPM for triplex)"],
      ["Lubrication", "Splash (small frames) or forced — engine-driven shaft pump + cooler"],
      ["Bearings", "Sleeve + tilt-pad thrust (API 613) or rolling (API 677)"],
      ["Cooling", "Plate-and-frame water cooler OR air-blast on dry sites"],
      ["Mounting", "Foot-mounted on common baseplate with engine + coupling"],
      ["Service factor", "1.4 minimum on pump duty per AGMA"],
      ["Vibration", "ISO 8579-2 — class 2 or better"],
    ],
    electricalProtection: [
      "TT-401 — sump-oil temperature.",
      "PT-402 — oil-pressure transmitter at the bearing manifold (forced-lube units).",
      "PSL — low oil-pressure switch, hardwired backup trip.",
      "VT-403 — housing vibration accelerometers (HSS and LSS bearings).",
      "TT — bearing-metal Pt100s embedded in the journal pads (API 670).",
      "Oil-mist breather + sight-glass with magnetic plug for chip detection.",
    ],
    famousFor: `Quiet, reliable speed matching between the engine and the pump. Failure modes
    are mostly preventable through condition monitoring — oil analysis (ISO 4406 cleanliness,
    PQ wear-particle index) and vibration trending. A correctly aligned gearbox runs decades
    in oilfield service; misalignment is the #1 root cause of premature bearing failure.`,
    nameplateHints: `Gearbox plates show TYPE (e.g. Flender H2SH-10, Lufkin N-3000), RATIO,
    INPUT/OUTPUT RPM, INPUT/OUTPUT POWER (kW or HP), SERVICE FACTOR, SERIAL, BUILD YEAR. The
    oil-fill plate carries the recommended ISO grade (commonly VG 220 or VG 320 mineral).`,
    siteExample: {
      title: "Sizing example — derived from the on-site Guinard DVMX (Tag PN 203)",
      rows: [
        ["Driven pump",       "Guinard DVMX 3×4×9 · 4 000 RPM · ≈ 300 kW shaft @ η 0.72"],
        ["Engine candidate",  "Detroit 8V-92TA · rated 1800–2100 RPM · 365–500 BHP"],
        ["Coupling",          "Transfluid KSL or KPTO (size 27/32) — power ≈ 350 kW class"],
        ["Required step-up ratio", "≈ 2.2 : 1 (1800 input) ··· 1.9 : 1 (2100 input)"],
        ["Likely gearbox",    "Single-stage parallel-shaft helical, API 613 — e.g. Flender H1SH-1 / Lufkin N-1000-class"],
        ["Service factor",    "≥ 1.4 (AGMA — centrifugal pump duty)"],
        ["Cooling",           "Forced-lube w/ shaft pump + plate cooler (or air-blast on dry sites)"],
        ["Vibration grade",   "ISO 8579-2 class 2"],
      ],
    },
  },

  driveTrain: {
    description: `A typical Detroit-Diesel-driven pump skid for oilfield service uses the
    following drive train (left to right):`,
    layout: `
    +---------+    +-----------+    +-----------+    +---------+    +--------+
    | Engine  |==>>| Flywheel  |==>>| Transfluid|==>>| Gearbox |==>>|  Pump  |
    | Det 92/ |    | + Damper  |    |  Coupling |    | (API613)|    |(Guinard|
    |  60/71  |    |           |    |   KSL/    |    |         |    |API 610)|
    +---------+    +-----------+    +-----KPTO--+    +---------+    +--------+
         |              |                |                |              |
       ECM/         Torsional        Slip-trip       Vib + Oil       Seal-plan
       Murphy       analysis         + Fusible       Pt + flow       support
       panel                          plug                            system
    `,
  },
};
