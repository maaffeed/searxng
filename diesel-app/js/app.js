/* Diesel & Pump Drive-Train Reference — main app logic
 * Vanilla JS, no build step.
 */
(function () {
  const main = document.getElementById("main");
  const tabs = document.querySelectorAll(".tab");
  const searchInput = document.getElementById("globalSearch");
  const STORAGE_KEY_NP = "dpdt.nameplates.v1";
  const STORAGE_KEY_CL = "dpdt.checklist.v1";

  // -------- helpers --------
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const specTable = (rows) =>
    `<table class="spec-table">
      ${rows.map(([k, v]) => `<tr><td class="k">${escapeHtml(k)}</td><td class="v">${escapeHtml(v)}</td></tr>`).join("")}
    </table>`;

  // -------- section builders --------
  function sectionOverview() {
    return `
    <section class="section active" data-name="overview">
      <h2>Overview — Diesel-Driven Pump Skid Reference</h2>
      <div class="card">
        <p>This reference covers the four mechanical hearts of a typical oil &amp; gas pumping skid —
        the <b>diesel engine</b>, the <b>fluid coupling</b>, the <b>gearbox</b>, and the <b>pump</b> —
        plus the <b>electrical protection</b> layer that keeps the whole train alive (sensors,
        switches, shutdowns, and the SIS logic that ties them together).</p>
        <pre class="ascii-art">${AUXILIARY.driveTrain.layout}</pre>
      </div>

      <div class="grid three">
        <div class="card tight">
          <h3>Engines covered</h3>
          <ul class="clean">
            <li>Detroit Diesel <b>Series 92</b> — 6V/8V/12V/16V two-stroke</li>
            <li>Detroit Diesel <b>Series 60</b> — 11.1/12.7/14.0 L four-stroke (DDEC)</li>
            <li>Detroit Diesel <b>Series 71</b> — 4-71/6-71/8V-71/12V-71/16V-71 two-stroke</li>
          </ul>
        </div>
        <div class="card tight">
          <h3>Drive-train auxiliaries</h3>
          <ul class="clean">
            <li><b>Guinard</b> centrifugal/multistage/reciprocating pumps</li>
            <li><b>Transfluid</b> hydrodynamic coupling (KSL / KPTO / CSD / HSD)</li>
            <li>Parallel-shaft <b>gearbox</b> (API 613/677 — Lufkin / Flender / Renold)</li>
          </ul>
        </div>
        <div class="card tight">
          <h3>Electrical protection focus</h3>
          <ul class="clean">
            <li>Sensors: PT, TT, ST, VT, LSL, FE, BE (4–20 mA, Pt100, MPU)</li>
            <li>Switches: ESD-PB, ASV, FSV, governor, intrinsically-safe selectors</li>
            <li>SIS: hardwired safety relay + PLC voting (SIL 2 / IEC 61511)</li>
            <li>HazLoc: Ex d / Ex ia per ATEX 2014/34/EU + IECEx</li>
          </ul>
        </div>
      </div>

      <div class="callout info">
        Use the <b>tabs</b> above to drill into each component, or use the <b>search bar</b>
        (top-right) to find a sensor tag, fault, vendor, or keyword across the whole reference.
      </div>
    </section>`;
  }

  function sectionEngine(key) {
    const e = ENGINES[key];
    return `
    <section class="section" data-name="${key}">
      <h2>${escapeHtml(e.title)}</h2>
      <p class="tag-row">${e.family.split(",").map((s) => `<span class="pill">${escapeHtml(s.trim())}</span>`).join("")}</p>

      <div class="card">
        <p>${escapeHtml(e.intro)}</p>
      </div>

      <h3>Configurations &amp; Power Ratings</h3>
      <div class="card">
        <table class="spec-table">
          <tr><th>Model</th><th>Power</th><th>Displacement</th><th>Dry Weight</th></tr>
          ${e.configs.map((c) => `<tr>
            <td class="v">${escapeHtml(c.name)}</td>
            <td>${escapeHtml(c.power)}</td>
            <td>${escapeHtml(c.disp)}</td>
            <td>${escapeHtml(c.dryWt)}</td>
          </tr>`).join("")}
        </table>
      </div>

      <h3>Technical Specifications</h3>
      <div class="card">${specTable(e.specs)}</div>

      <h3>Typical Pump-Skid Applications</h3>
      <div class="card">
        <ul class="clean">${e.pumpApps.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
      </div>

      <h3>Famous For</h3>
      <div class="callout">${escapeHtml(e.famousFor)}</div>

      <h3>Known Failure Modes &amp; Field Cautions</h3>
      <div class="card">
        <ul class="clean">${e.knownIssues.map((i) => `<li><span class="badge warn">CAUTION</span>${escapeHtml(i)}</li>`).join("")}</ul>
      </div>
    </section>`;
  }

  function sectionGuinard() {
    const g = AUXILIARY.guinard;
    return `
    <section class="section" data-name="guinard">
      <h2>${escapeHtml(g.title)}</h2>
      <p class="tag-row"><span class="pill">${escapeHtml(g.family)}</span></p>
      <div class="card"><p>${escapeHtml(g.intro)}</p></div>
      <h3>Typical Construction &amp; Ratings</h3>
      <div class="card">${specTable(g.typical)}</div>
      <h3>Electrical Protection on Guinard Skids</h3>
      <div class="card">
        <ul class="clean">${g.electricalProtection.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
      </div>
      <h3>Famous For</h3>
      <div class="callout">${escapeHtml(g.famousFor)}</div>
      <h3>Reading the Nameplate</h3>
      <div class="callout info">${escapeHtml(g.nameplateHints)}</div>
    </section>`;
  }

  function sectionTransfluid() {
    const t = AUXILIARY.transfluid;
    return `
    <section class="section" data-name="transfluid">
      <h2>${escapeHtml(t.title)}</h2>
      <p class="tag-row"><span class="pill">${escapeHtml(t.family)}</span></p>
      <div class="card"><p>${escapeHtml(t.intro)}</p></div>
      <h3>Product Families</h3>
      <div class="card">
        <table class="spec-table">
          <tr><th>Code</th><th>Description</th></tr>
          ${t.types.map((x) => `<tr><td class="v">${escapeHtml(x.code)}</td><td>${escapeHtml(x.desc)}</td></tr>`).join("")}
        </table>
      </div>
      <h3>Typical Data</h3>
      <div class="card">${specTable(t.typical)}</div>
      <h3>How It Works</h3>
      <div class="card"><p>${escapeHtml(t.howItWorks)}</p></div>
      <h3>Electrical Protection</h3>
      <div class="card"><ul class="clean">${t.electricalProtection.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
      <h3>Famous For</h3>
      <div class="callout">${escapeHtml(t.famousFor)}</div>
      <h3>Reading the Nameplate</h3>
      <div class="callout info">${escapeHtml(t.nameplateHints)}</div>
    </section>`;
  }

  function sectionGearbox() {
    const g = AUXILIARY.gearbox;
    return `
    <section class="section" data-name="gearbox">
      <h2>${escapeHtml(g.title)}</h2>
      <p class="tag-row"><span class="pill">${escapeHtml(g.family)}</span></p>
      <div class="card"><p>${escapeHtml(g.intro)}</p></div>
      <h3>Typical Data</h3>
      <div class="card">${specTable(g.typical)}</div>
      <h3>Electrical Protection</h3>
      <div class="card"><ul class="clean">${g.electricalProtection.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
      <h3>Famous For</h3>
      <div class="callout">${escapeHtml(g.famousFor)}</div>
      <h3>Reading the Nameplate</h3>
      <div class="callout info">${escapeHtml(g.nameplateHints)}</div>
    </section>`;
  }

  function sectionElectrical() {
    const E = ELECTRICAL;
    const sensorCat = (cat, label) => {
      const list = E.sensors.filter((s) => s.cat === cat);
      if (!list.length) return "";
      return `
        <h3>${label}</h3>
        <div class="grid three">
          ${list.map((s) => `
            <div class="sensor-card" data-search="${escapeHtml((s.tag + " " + s.name + " " + s.kind + " " + s.vendor + " " + s.action).toLowerCase())}">
              <span class="tag">${escapeHtml(s.tag)}</span>
              <h4>${escapeHtml(s.name)}</h4>
              <p><b>Type:</b> ${escapeHtml(s.kind)}</p>
              <p><b>Range:</b> ${escapeHtml(s.range)}</p>
              <p><b>HazArea:</b> ${escapeHtml(s.hazArea)}</p>
              <p><b>Vendor:</b> ${escapeHtml(s.vendor)}</p>
              <p class="meta"><b>Action:</b> ${escapeHtml(s.action)}</p>
            </div>
          `).join("")}
        </div>`;
    };
    return `
    <section class="section" data-name="electrical">
      <h2>Electrical Protection — Sensors, Switches, &amp; Shutdown Matrix</h2>
      <div class="callout warn">
        Pump-skid protection is designed in <b>two independent layers</b>:
        a hardwired <b>safety loop</b> (relays, force-guided contacts, fail-safe energise-to-run
        circuits) for SIL-rated trips, and a programmable <b>PLC</b> for alarms, sequencing,
        and DCS reporting. The PLC never replaces the hardwired loop.
      </div>

      ${sensorCat("engine", "Engine Sensors")}
      ${sensorCat("pump", "Pump Sensors (API 670 / API 682)")}
      ${sensorCat("transfluid", "Transfluid Coupling Sensors")}
      ${sensorCat("gearbox", "Gearbox Sensors")}
      ${sensorCat("skid", "Skid-Level Gas &amp; Fire Detection")}

      <h3>Switches &amp; Final Elements</h3>
      <div class="grid three">
        ${E.switches.map((s) => `
          <div class="sensor-card" data-search="${escapeHtml((s.tag + " " + s.name + " " + s.kind + " " + (s.vendor || "") + " " + s.action).toLowerCase())}">
            <span class="tag">${escapeHtml(s.tag)}</span>
            <h4>${escapeHtml(s.name)}</h4>
            <p><b>Type:</b> ${escapeHtml(s.kind)}</p>
            ${s.hazArea ? `<p><b>HazArea:</b> ${escapeHtml(s.hazArea)}</p>` : ""}
            ${s.vendor ? `<p><b>Vendor:</b> ${escapeHtml(s.vendor)}</p>` : ""}
            <p class="meta"><b>Action:</b> ${escapeHtml(s.action)}</p>
          </div>
        `).join("")}
      </div>

      <h3>Cause &amp; Effect Matrix (Shutdown Logic)</h3>
      <div class="card">
        <table class="spec-table">
          <tr><th>Fault</th><th>Action</th><th>Delay</th><th>Sensing Device(s)</th></tr>
          ${E.shutdownMatrix.map((r) => `
            <tr data-search="${escapeHtml((r.fault + " " + r.severity + " " + r.devices).toLowerCase())}">
              <td>${escapeHtml(r.fault)}</td>
              <td><span class="badge ${r.severity === "ESD" ? "err" : "warn"}">${escapeHtml(r.severity)}</span></td>
              <td class="v">${escapeHtml(r.delay)}</td>
              <td class="v">${escapeHtml(r.devices)}</td>
            </tr>`).join("")}
        </table>
      </div>

      <h3>Safety Loop Notes</h3>
      <div class="callout info">${escapeHtml(E.notes.trim())}</div>
    </section>`;
  }

  function sectionSchematic() {
    return `
    <section class="section" data-name="schematic">
      <h2>Wiring &amp; Loop Schematic — Typical Diesel-Driven Pump Skid</h2>
      <div class="callout warn">
        Simplified loop diagram for instruction only. Use vendor as-built drawings and
        cause-and-effect matrices for construction.
      </div>

      <h3>Power &amp; Control Block Diagram</h3>
      <pre class="ascii-art">
                                    24 VDC battery (2 × 12 V series)
                                    +------------------------------+
                                    |                              |
                                    |  Charging Alt (50–100 A)     |
                                    |                              |
   +-------------+   crank +24V    +-------------+   excite        +---------+
   | Start Mtr   |<----------------| Start Relay |---------------->| Alt     |
   +-------------+                  +-------------+                  +---------+
            ^
            |  crank command (HS-START / RUN)
   +--------------+
   |  Engine ECM  |  DDEC IV/V  -- J1939 to Local Panel HMI
   |  (S60 only)  |  or Murphy Centurion C4 for mechanical 92/71
   +--------------+
        |       |
        v       v
   +-----+   +-----+
   |Fuel |   |Air  |   <-- SOLENOID + AIR-SHUTOFF VALVE
   | SV  |   |Shut |       (de-energise to trip)
   +-----+   +-----+
        ^       ^
        |       |
   +--------------------------+
   |  HARDWIRED SAFETY LOOP  |  (24 VDC, energise-to-run)
   |  PSL-102, TSH-104,      |
   |  ESD-PB, LSL-106,       |
   |  PT-202 PSHH, FE/BE     |
   +--------------------------+
        |
        | duplicate I/O via IS barriers (Pepperl+Fuchs / MTL)
        v
   +--------------------------+
   |   PLC  (Allen-Bradley   |--- Modbus TCP / DH+ / EthernetIP --> DCS
   |   GuardLogix or SIL2    |
   |   Siemens S7-1500F)      |
   +--------------------------+
            |
            v
   +---------------+
   |   Local HMI   |  pump-skid graphic, alarm list, trends
   +---------------+
      </pre>

      <h3>Field Loop — Engine Low-Oil-Pressure Trip (Example)</h3>
      <pre class="ascii-art">
   PT-101 (4-20 mA, Ex ia)        IS Barrier KFD2          PLC AI card
   +--------+   2-wire loop      +------------+           +--------------+
   | XMTR   |---(+)---(+)------->|  Safe-side |---4-20--->|  SIL2 input  |
   |  HART  |---(-)---(-)<-------|  galv. iso |<----------|  channel     |
   +--------+                    +------------+           +--------------+
            |
            | (mechanical pressure tap to Murphy 20P backup)
            v
   +-----------+                                    Safety relay (PNOZ)
   | PSL-102   |   NO contact held closed           +-----------------+
   |  Swichgage|--------------(+24 V)-------------->| RUN coil        |--->  FSV
   +-----------+                                    +-----------------+      ASV
      </pre>

      <h3>Cable Schedule (typical)</h3>
      <div class="card">
        <table class="spec-table">
          <tr><th>Tag</th><th>Cable Type</th><th>Pairs / Cores</th><th>Gland</th><th>Notes</th></tr>
          <tr><td>PT-101</td><td>1P × 1.5 mm² ITC, OS, blue (IS)</td><td>1 pair + drain</td><td>Ex e / Ex ia</td><td>Segregate from non-IS</td></tr>
          <tr><td>PSL-102</td><td>2C × 1.5 mm² SWA</td><td>2 cores</td><td>Ex d brass</td><td>To safety relay</td></tr>
          <tr><td>TT-103</td><td>3C × 1.0 mm² PT100, IS blue</td><td>3-wire RTD</td><td>Ex ia</td><td>Head-mount Tx preferred</td></tr>
          <tr><td>ST-105</td><td>2C × 1.0 mm² OS, coax preferred</td><td>1 pair + screen</td><td>Ex e</td><td>Dual MPU 1oo2 voting</td></tr>
          <tr><td>FSV</td><td>2C × 2.5 mm² SWA</td><td>2 cores</td><td>Ex d</td><td>24 VDC, freewheel diode at coil</td></tr>
          <tr><td>FE-501</td><td>4C × 1.5 mm² SWA + screen</td><td>Power + 4-20 mA</td><td>Ex d</td><td>SIL2 gas detector</td></tr>
        </table>
      </div>
    </section>`;
  }

  function sectionNameplates() {
    return `
    <section class="section" data-name="nameplates">
      <h2>Nameplate Library</h2>
      <p class="tag-row">
        <span class="pill">Detroit engine plate</span>
        <span class="pill">Guinard pump plate</span>
        <span class="pill">Transfluid coupling plate</span>
        <span class="pill">Gearbox plate</span>
      </p>

      <div class="callout info">
        Upload photos of the equipment <b>nameplates</b> you have on site. They are stored in your
        browser only (localStorage) — no upload server. Add a caption for each so the data is
        searchable from the top bar.
      </div>

      <label for="npFile" class="nameplate-drop" id="npDrop">
        <div>📷 &nbsp; Drag photos here, or click to choose images</div>
        <div style="font-size: 0.8rem; margin-top: 0.4rem;">JPEG / PNG / WebP up to ~4 MB each</div>
      </label>
      <input id="npFile" type="file" accept="image/*" multiple hidden />

      <div class="nameplate-gallery" id="npGallery"></div>

      <h3>What to look for on each plate</h3>
      <div class="grid two">
        <div class="card tight">
          <h4>Detroit Diesel</h4>
          <ul class="clean">
            <li>Model code (e.g. <code>8V92TA</code>)</li>
            <li>Serial number (8 digits, starts with the model letter)</li>
            <li>Build date / build location (DDC plate or Roman-numeral month)</li>
            <li>Power rating + RPM stamp</li>
            <li>Injector size code (N50, N60, N70…) — on rocker cover plate</li>
          </ul>
        </div>
        <div class="card tight">
          <h4>Guinard pump</h4>
          <ul class="clean">
            <li>TYPE / N° série / ANNÉE</li>
            <li>DÉBIT (Q in m³/h) · HMT (H in m) · VITESSE (RPM)</li>
            <li>PUISSANCE ABSORBÉE (kW)</li>
            <li>Seal-cartridge plate — API 682 plan and material code</li>
          </ul>
        </div>
        <div class="card tight">
          <h4>Transfluid</h4>
          <ul class="clean">
            <li>Model (e.g. <code>KSL 27</code>, <code>KPTO 32 D</code>)</li>
            <li>Serial + Year</li>
            <li>Max input speed (RPM) and rated power (kW)</li>
            <li>Oil grade &amp; volume — fusible-plug temp (140 °C)</li>
          </ul>
        </div>
        <div class="card tight">
          <h4>Gearbox</h4>
          <ul class="clean">
            <li>Type (e.g. Flender <code>H2SH</code>, Lufkin <code>N-3000</code>)</li>
            <li>Ratio (i = …)</li>
            <li>Input/Output RPM &amp; power</li>
            <li>Service factor (SF) and AGMA class</li>
          </ul>
        </div>
      </div>
    </section>`;
  }

  function sectionChecklist() {
    return `
    <section class="section" data-name="checklist">
      <h2>Commissioning &amp; Pre-Start Checklist</h2>
      <div class="callout warn">
        Tick each item before first crank. State persists in your browser (localStorage).
        Use <b>Reset</b> at the bottom to clear for the next skid.
      </div>
      <div id="checklistContainer"></div>
      <div style="margin-top: 1rem;">
        <button id="resetChecklist" class="tab">Reset checklist</button>
        <span id="checklistProgress" style="margin-left: 1rem; color: var(--muted); font-size: 0.85rem;"></span>
      </div>
    </section>`;
  }

  // -------- mount --------
  function render() {
    main.innerHTML =
      sectionOverview() +
      sectionEngine("detroit92") +
      sectionEngine("detroit60") +
      sectionEngine("detroit71") +
      sectionGuinard() +
      sectionTransfluid() +
      sectionGearbox() +
      sectionElectrical() +
      sectionSchematic() +
      sectionNameplates() +
      sectionChecklist();

    mountTabs();
    mountNameplates();
    mountChecklist();
    mountSearch();
  }

  function mountTabs() {
    tabs.forEach((btn) =>
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document
          .querySelectorAll(".section")
          .forEach((s) => s.classList.toggle("active", s.dataset.name === btn.dataset.tab));
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
    );
  }

  // -------- nameplates (localStorage) --------
  function mountNameplates() {
    const drop = document.getElementById("npDrop");
    const fileInput = document.getElementById("npFile");
    const gallery = document.getElementById("npGallery");
    if (!drop || !fileInput || !gallery) return;

    const load = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY_NP) || "[]"); }
      catch { return []; }
    };
    const save = (arr) => localStorage.setItem(STORAGE_KEY_NP, JSON.stringify(arr));

    const renderGallery = () => {
      const items = load();
      gallery.innerHTML = items.map((it, i) => `
        <div class="np-thumb" data-i="${i}">
          <button class="del" title="Delete">×</button>
          <img src="${escapeHtml(it.src)}" alt="nameplate ${i}" />
          <div class="np-meta">
            <input type="text" data-i="${i}" value="${escapeHtml(it.caption || "")}" placeholder="Caption (e.g. 8V92TA s/n 06R12345)" />
          </div>
        </div>
      `).join("");
      gallery.querySelectorAll("button.del").forEach((b) => {
        b.addEventListener("click", () => {
          const i = +b.parentElement.dataset.i;
          const items = load();
          items.splice(i, 1);
          save(items);
          renderGallery();
        });
      });
      gallery.querySelectorAll("input[type=text]").forEach((inp) => {
        inp.addEventListener("change", () => {
          const i = +inp.dataset.i;
          const items = load();
          if (items[i]) { items[i].caption = inp.value; save(items); }
        });
      });
    };

    const handleFiles = (files) => {
      const items = load();
      const max = 4 * 1024 * 1024;
      Array.from(files).forEach((f) => {
        if (!f.type.startsWith("image/")) return;
        if (f.size > max) { alert(`${f.name} exceeds 4 MB`); return; }
        const r = new FileReader();
        r.onload = () => {
          items.push({ src: r.result, caption: "", added: Date.now() });
          save(items);
          renderGallery();
        };
        r.readAsDataURL(f);
      });
    };

    drop.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => handleFiles(e.target.files));
    drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("drag"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("drag"));
    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      drop.classList.remove("drag");
      handleFiles(e.dataTransfer.files);
    });

    renderGallery();
  }

  // -------- checklist --------
  const CHECKLIST = [
    { cat: "ENGINE",    text: "Coolant filled to surge tank cold mark; SCA/DCA-4 concentration verified (1.2–3.0 units)" },
    { cat: "ENGINE",    text: "Engine oil at full mark; correct grade per OEM (CJ-4 for S60, CF-2 for 92/71)" },
    { cat: "ENGINE",    text: "Air filter elements clean; restriction indicator reset" },
    { cat: "ENGINE",    text: "Air-shutoff valve (AMOT/Chalwyn) latched; manual lever free to move" },
    { cat: "ENGINE",    text: "Fuel system primed and bled; secondary filter element new" },
    { cat: "ENGINE",    text: "Mechanical governor leak-free; linkage moves through full travel" },
    { cat: "ENGINE",    text: "Battery banks at 25.6+ V; tight terminals; charging alternator wired" },
    { cat: "ELEC",      text: "PT-101 / PSL-102 — pressure tap fittings tight, electrical continuity verified" },
    { cat: "ELEC",      text: "TT-103 / TSH-104 — thermowells fitted and torqued; cable glands sealed" },
    { cat: "ELEC",      text: "ST-105 — MPU air gap 0.5–1.0 mm to flywheel teeth; signal verified by hand barring" },
    { cat: "ELEC",      text: "VS-107 — vibration switch reset; latch-free movement verified" },
    { cat: "ELEC",      text: "ESD pushbutton(s) — twist-reset, function test (trips fuel SV + ASV)" },
    { cat: "ELEC",      text: "FSV — energise-to-run test; full closure on power loss" },
    { cat: "ELEC",      text: "ASV — solenoid pilot test; air valve slams shut on trip" },
    { cat: "ELEC",      text: "Safety relay (PNOZ/PSR/GuardLogix) — input matrix verified line-by-line" },
    { cat: "ELEC",      text: "All Ex glands tightened to manufacturer torque (e.g. 25 N·m for M25)" },
    { cat: "ELEC",      text: "IS barriers seated; safe-area cabinet earth bar < 1 Ω to skid ground" },
    { cat: "PUMP",      text: "Suction strainer cleaned, mesh size verified to API 610 / pump curve" },
    { cat: "PUMP",      text: "Discharge PSV pop pressure tested and tagged; isolation valve car-sealed open" },
    { cat: "PUMP",      text: "Seal-flush plan installed and primed (Plan 23/52/53 reservoir filled)" },
    { cat: "PUMP",      text: "Bearing Pt100s wired to correct AI cards; calibration tag attached" },
    { cat: "PUMP",      text: "Alignment to coupling within 0.05 mm rim / 0.05 mm face (cold)" },
    { cat: "PUMP",      text: "All bolts torqued and paint-marked; suction/discharge gaskets new" },
    { cat: "TRANSFLUID",text: "Oil filled to dipstick mark; correct ISO grade (VG 32 / VG 46)" },
    { cat: "TRANSFLUID",text: "Fusible plug inspected — no signs of previous discharge (alloy intact)" },
    { cat: "TRANSFLUID",text: "Cooler clean — air-side fins blown out, water-side flushed" },
    { cat: "TRANSFLUID",text: "Oil temperature transmitter calibrated; trip setpoint stamped on cabinet" },
    { cat: "GEARBOX",   text: "Sump oil filled to sight glass mid-level; magnetic plug clean" },
    { cat: "GEARBOX",   text: "Oil pump primed; pressure transmitter zeroed" },
    { cat: "GEARBOX",   text: "Vibration baseline captured (housing accel, full pump load — engineer's notebook)" },
    { cat: "GEARBOX",   text: "Backlash check on input pinion within OEM spec" },
    { cat: "SKID",      text: "Skid earth bar bonded to plant ground grid; resistance < 1 Ω" },
    { cat: "SKID",      text: "Gas detectors gas-bumped (10 % LEL CH₄, 25 ppm H₂S)" },
    { cat: "SKID",      text: "Flame detector functional check with test flame / lamp" },
    { cat: "SKID",      text: "Fire extinguishers (CO₂ + dry chemical) inspected and tagged" },
    { cat: "SKID",      text: "Drip tray clean; bund integrity verified (no cracks)" },
    { cat: "SKID",      text: "Permit-to-work board updated; lockout/tagout removed" },
  ];

  function mountChecklist() {
    const container = document.getElementById("checklistContainer");
    const progress = document.getElementById("checklistProgress");
    const resetBtn = document.getElementById("resetChecklist");
    if (!container) return;

    const load = () => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY_CL) || "{}"); }
      catch { return {}; }
    };
    const save = (obj) => localStorage.setItem(STORAGE_KEY_CL, JSON.stringify(obj));

    const updateProgress = () => {
      const state = load();
      const done = Object.values(state).filter(Boolean).length;
      progress.textContent = `${done} / ${CHECKLIST.length} complete`;
    };

    const renderItems = () => {
      const state = load();
      container.innerHTML = CHECKLIST.map((it, i) => `
        <label class="checklist-item ${state[i] ? "done" : ""}" data-i="${i}"
               data-search="${escapeHtml((it.cat + " " + it.text).toLowerCase())}">
          <input type="checkbox" ${state[i] ? "checked" : ""} />
          <div><span class="ci-cat">[${escapeHtml(it.cat)}]</span>${escapeHtml(it.text)}</div>
        </label>
      `).join("");
      container.querySelectorAll(".checklist-item").forEach((row) => {
        const i = +row.dataset.i;
        const input = row.querySelector("input");
        input.addEventListener("change", () => {
          const state = load();
          state[i] = input.checked;
          save(state);
          row.classList.toggle("done", input.checked);
          updateProgress();
        });
      });
      updateProgress();
    };

    resetBtn.addEventListener("click", () => {
      if (!confirm("Reset all checklist ticks?")) return;
      save({});
      renderItems();
    });

    renderItems();
  }

  // -------- search --------
  function mountSearch() {
    if (!searchInput) return;
    const debounce = (fn, ms) => {
      let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };
    const run = (q) => {
      const term = q.trim().toLowerCase();
      // unhighlight previous
      document.querySelectorAll("mark.hl").forEach((m) => {
        const t = document.createTextNode(m.textContent);
        m.parentNode.replaceChild(t, m);
      });

      if (!term) {
        document.querySelectorAll(".sensor-card, tr[data-search], .checklist-item").forEach((c) => c.style.display = "");
        return;
      }

      // Filter cards/rows that have data-search
      document.querySelectorAll(".sensor-card, tr[data-search], .checklist-item").forEach((c) => {
        const hay = c.dataset.search || c.textContent.toLowerCase();
        c.style.display = hay.includes(term) ? "" : "none";
      });

      // Highlight matches inside currently visible section text
      const active = document.querySelector(".section.active");
      if (!active) return;
      const walker = document.createTreeWalker(active, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) =>
          n.parentNode &&
          !["SCRIPT", "STYLE", "INPUT", "TEXTAREA"].includes(n.parentNode.nodeName) &&
          n.nodeValue.toLowerCase().includes(term)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP,
      });
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach((n) => {
        const idx = n.nodeValue.toLowerCase().indexOf(term);
        if (idx < 0) return;
        const before = n.nodeValue.slice(0, idx);
        const match = n.nodeValue.slice(idx, idx + term.length);
        const after = n.nodeValue.slice(idx + term.length);
        const frag = document.createDocumentFragment();
        if (before) frag.appendChild(document.createTextNode(before));
        const mark = document.createElement("mark");
        mark.className = "hl";
        mark.textContent = match;
        frag.appendChild(mark);
        if (after) frag.appendChild(document.createTextNode(after));
        n.parentNode.replaceChild(frag, n);
      });
    };
    searchInput.addEventListener("input", debounce((e) => run(e.target.value), 180));
  }

  // -------- go --------
  render();
})();
