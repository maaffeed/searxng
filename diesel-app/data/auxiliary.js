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
    nameplateHints: `Guinard nameplates typically list: TYPE (e.g. CN, CD, MN, RS series),
    SERIAL N°, ANNÉE (year), DÉBIT (flow m³/h), HMT (total head, m), VITESSE (RPM), PUISSANCE
    ABSORBÉE (absorbed power kW), and the customer order code. Photograph BOTH the pump body
    plate and the mechanical-seal cartridge plate — the seal plate carries the API 682 plan code.`,
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
