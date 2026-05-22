/* Diesel engine data — Detroit Diesel Series 92, 60, 71
 * Compiled from public OEM-style references for skid/oilfield pump-drive use.
 * Always verify with the OEM service manual (6SE, 7SE, 6V-92, DDEC IV/V).
 */
window.ENGINES = {
  detroit92: {
    title: "Detroit Diesel Series 92",
    family: "Two-stroke cycle, V-configuration, Roots-blown / turbocharged",
    intro: `The Series 92 is a two-stroke-cycle V-design diesel introduced by Detroit Diesel
    in 1974, with 92 cubic-inches displacement per cylinder. Configurations include 6V-92, 8V-92,
    12V-92, and 16V-92. Naturally-aspirated (N), turbocharged (T), turbocharged-aftercooled (TA),
    and turbocharged-intercooled-aftercooled (TIB / TTA) variants exist. The engine uses unit
    injectors (mechanical or DDEC electronic), uniflow scavenging via a gear-driven Roots blower,
    and a wet-sump oil system. It is widely used as a prime mover for oilfield mud pumps,
    fracturing pumps, cementing units, and electric-set generators because of high power density,
    rapid throttle response, and field-proven serviceability.`,
    configs: [
      { name: "6V-92TA",   power: "270–350 BHP @ 2100 RPM", disp: "552 in³ / 9.05 L",  dryWt: "~1,720 lb" },
      { name: "8V-92TA",   power: "365–500 BHP @ 2100 RPM", disp: "736 in³ / 12.06 L", dryWt: "~2,200 lb" },
      { name: "12V-92TA",  power: "550–780 BHP @ 2100 RPM", disp: "1104 in³ / 18.1 L", dryWt: "~3,650 lb" },
      { name: "16V-92TA",  power: "740–1050 BHP @ 2100 RPM",disp: "1472 in³ / 24.1 L", dryWt: "~5,100 lb" },
    ],
    specs: [
      ["Cycle", "2-stroke, uniflow scavenged, Roots blower"],
      ["Cylinders", "6V / 8V / 12V / 16V — 60° or 65° vee bank"],
      ["Bore × Stroke", "4.84 in × 5.00 in (123 × 127 mm)"],
      ["Displacement / cyl", "92 in³ (1.51 L)"],
      ["Compression ratio", "17.0:1 (TA) / 18.7:1 (N)"],
      ["Injection", "Mechanical unit injector (N/T/TA) or DDEC II/III/IV electronic"],
      ["Fuel pump", "Gear-type, 50–70 psi return-line regulated"],
      ["Governor", "Limiting-speed mechanical (DW), Variable-speed mechanical (TT), or DDEC ECM"],
      ["Cooling", "Liquid, gear-driven centrifugal pump, thermostatic 170–185 °F"],
      ["Lube system", "Pressure-fed, gear pump, full-flow + bypass filters, oil cooler"],
      ["Starting", "24 VDC electric, or pneumatic (Ingersoll-Rand TDI / Gali) for HazLoc skids"],
      ["Rated speed (pump duty)", "1800–2100 RPM continuous"],
      ["Idle", "550–650 RPM"],
      ["Overspeed trip", "Mechanical 2350–2450 RPM (factory) — independent of governor"],
    ],
    pumpApps: [
      "Oilfield triplex/quintuplex mud pumps (National 12-P-160, Gardner-Denver PZ-11, Emsco F-1600)",
      "Hydraulic fracturing units (rated for continuous duty cycle at 0.85 load factor)",
      "Cementing units (twin-engine HT-400 type)",
      "Crude / multiphase pump skids on production stations",
      "Genset prime mover at compressor stations",
    ],
    famousFor: `Compact size-to-power, two-stroke instant response (no four-stroke cam dwell),
    field-rebuildable in-frame (cylinder kits), and tolerance to dusty/hot oilfield environments
    when fitted with two-stage air cleaners and Donaldson pre-cleaners.`,
    knownIssues: [
      "Liner cavitation if SCA/coolant DCA-4 not maintained — runaway erosion through water jacket.",
      "Blower seal leaks → engine runaway on its own oil mist (mandatory air-shutoff valve).",
      "Injector tip carbon at low-load duty (idle creep on standby pumps) — schedule weekly load tests.",
      "DDEC II/III ECM moisture ingress on outdoor skids — pot the connectors, use Deutsch backshells.",
    ],
  },

  detroit60: {
    title: "Detroit Diesel Series 60",
    family: "Four-stroke cycle, inline-6, electronically controlled (DDEC)",
    intro: `Introduced in 1987, the Series 60 was the first production heavy-duty diesel
    designed from the outset around electronic engine controls (DDEC). It is a four-stroke,
    inline-6, overhead-camshaft engine with electronic unit injectors (EUI) — replacing the
    classic two-stroke architecture of the 92/71. Displacement variants are 11.1 L, 12.7 L, and
    14.0 L. The engine is widely re-purposed in oil & gas service as a power-pack for produced-water
    pumps, fuel-gas boost compressors, and crude-transfer skids — chosen for its low BSFC
    (≤ 195 g/kWh), Tier-2 emissions capability, and integral electronic protection.`,
    configs: [
      { name: "S60 11.1L",  power: "330–425 BHP @ 1800–2100 RPM", disp: "677 in³ / 11.1 L", dryWt: "~2,500 lb" },
      { name: "S60 12.7L",  power: "365–515 BHP @ 1800–2100 RPM", disp: "778 in³ / 12.7 L", dryWt: "~2,650 lb" },
      { name: "S60 14.0L",  power: "455–615 BHP @ 1800–2100 RPM", disp: "855 in³ / 14.0 L", dryWt: "~2,800 lb" },
    ],
    specs: [
      ["Cycle", "4-stroke, OHC, EUI electronic unit injectors"],
      ["Cylinders", "Inline 6, integral cylinder bores (parent bore) — no liners on 11.1 L"],
      ["Bore × Stroke", "5.12 × 5.51 in (130 × 140 mm) — 12.7 L"],
      ["Compression ratio", "15.0:1 (12.7 L) / 16.5:1 (14.0 L)"],
      ["Injection", "EUI camshaft-driven, ECM-pulsed, 28 000 psi peak"],
      ["Fuel pump", "Gear, 60–75 psi"],
      ["ECM", "DDEC II → DDEC IV / V (DDEC VI on EGR variants)"],
      ["Aspiration", "Turbocharged, air-to-air aftercooled (charge-air cooler)"],
      ["Cooling", "Liquid, thermostatic 87 °C (188 °F)"],
      ["Lube", "Gear pump, full-flow + bypass, plate cooler, 38–45 L sump"],
      ["Starting", "24 VDC electric"],
      ["Rated continuous", "1800 RPM for pump/generator duty"],
      ["Overspeed", "ECM cutout at 2300 RPM + mechanical fuel-rack stop"],
    ],
    pumpApps: [
      "Multiphase pump units (Bornemann, Leistritz screw pumps)",
      "Triplex injection pumps on water-flood projects",
      "Centrifugal crude-export pumps in series with VFD-driven boost stages",
      "Glycol regeneration reboiler pump-pack",
      "Skid-mounted compressor lube/seal-oil supply units",
    ],
    famousFor: `DDEC's robust J1587/J1939 data link, oil-saver mode, progressive shutdown,
    and the most comprehensive electronic protection package of any Detroit engine generation.
    Integrated SEO (Stop Engine Override) and CEL (Check Engine Light) logic make it the engine
    of choice when API 7B-11 / IEC 60079 protection is mandated on the pump skid.`,
    knownIssues: [
      "EGR cooler cracking (DDEC VI) — leaks coolant into intake → hydrolock risk.",
      "Oil-pressure-regulator stuck open at cold start — false low-oil shutdown.",
      "Turbo actuator (VGT) sticking with sulfated diesel — apply API CJ-4 oil only.",
      "Camshaft lobe wear if EUI rocker shims neglected past 750 h.",
    ],
  },

  detroit71: {
    title: "Detroit Diesel Series 71",
    family: "Two-stroke cycle, inline & V-configuration, Roots-blown",
    intro: `The Series 71 is the original General Motors / Detroit Diesel two-stroke family,
    in production from 1938 (!) until the late 1990s. With 71 cubic inches per cylinder, it
    is offered in 1-71, 2-71, 3-71, 4-71, 6-71, 8V-71, 12V-71, and 16V-71 configurations.
    It is the workhorse engine of legacy oilfield service rigs, marine standby fire pumps,
    cementing skids, and pipeline crude-transfer pumps. The 71's almost indestructible cast-iron
    block, exposed-injector rack, and mechanical limiting-speed governor make it ideal for
    Class-I-Division-2 sites where electronic engine controls were historically not permitted.`,
    configs: [
      { name: "4-71",    power: "140 BHP @ 2100 RPM",  disp: "284 in³ / 4.65 L", dryWt: "~1,450 lb" },
      { name: "6-71",    power: "238 BHP @ 2300 RPM",  disp: "426 in³ / 6.98 L", dryWt: "~2,100 lb" },
      { name: "8V-71",   power: "318 BHP @ 2300 RPM",  disp: "568 in³ / 9.30 L", dryWt: "~2,500 lb" },
      { name: "12V-71",  power: "475 BHP @ 2300 RPM",  disp: "852 in³ / 13.96 L",dryWt: "~3,900 lb" },
      { name: "16V-71",  power: "635 BHP @ 2300 RPM",  disp: "1136 in³ / 18.6 L",dryWt: "~5,400 lb" },
    ],
    specs: [
      ["Cycle", "2-stroke, uniflow, Roots blower (gear-driven from front gear train)"],
      ["Bore × Stroke", "4.25 × 5.00 in (108 × 127 mm)"],
      ["Displacement / cyl", "71.0 in³ (1.16 L)"],
      ["Compression ratio", "17:1 (N) / 18.7:1 (T)"],
      ["Injection", "Mechanical unit injector (N50–N90 size by power)"],
      ["Governor", "Mechanical limiting-speed (DW), Variable-speed (TT), or hydraulic (PSG)"],
      ["Fuel pump", "Gear, 45–65 psi"],
      ["Cooling", "Liquid, thermostatic 170–185 °F, gear-driven coolant pump"],
      ["Lube", "Pressure-fed, gear pump, full-flow + bypass filter elements"],
      ["Starting", "24 VDC electric / pneumatic / hydraulic"],
      ["Continuous rating (pump duty)", "1800 RPM"],
      ["Overspeed", "Mechanical 2500–2600 RPM (factory-set), independent air-shutoff valve"],
    ],
    pumpApps: [
      "Skid-mounted Guinard / FMC / Halliburton triplex pumps for waterflood",
      "Marine fire pumps on FPSO / production platforms (UL-1247 / NFPA-20)",
      "Pipeline pig-launcher driver / utility air compressor packages",
      "Drilling rig auxiliary pump for hydraulic koomey accumulator charging",
    ],
    famousFor: `Bullet-proof mechanical simplicity, the unmistakable 'Detroit scream', and
    runaway-on-own-oil risk — making the AMOT/Chalwyn air-intake shutoff valve mandatory for
    Class I Div 2 oil & gas sites.`,
    knownIssues: [
      "Engine runaway on blower oil seal failure — install positive air shutoff (Chalwyn / AMOT 8500).",
      "Liner pitting/cavitation if coolant SCA drifts below 1.2 units.",
      "Loose injector rack screws → uneven cylinder loading → torsional vibration into the gearbox.",
      "Oil-pan studs leak — Loctite 518 anaerobic sealant on rebuild.",
    ],
  },
};
