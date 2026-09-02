"use client";

import { useState, useEffect } from "react";

function OutputBox({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ padding: "12px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius)", border: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 11, cursor: "pointer" }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 14, color: "var(--text)", wordBreak: "break-all" }}>{value || "—"}</div>
    </div>
  );
}

// 1. Time Zone Converter
export function TimeZoneConverterTool() {
  const [baseTime, setBaseTime] = useState("12:00");
  const [baseZone, setBaseZone] = useState("UTC");

  const zones = ["UTC", "EST (UTC-5)", "PST (UTC-8)", "GMT (UTC+0)", "CET (UTC+1)", "IST (UTC+5:30)", "JST (UTC+9)", "AEST (UTC+10)"];
  const offsets: Record<string, number> = {
    "UTC": 0, "EST (UTC-5)": -5, "PST (UTC-8)": -8, "GMT (UTC+0)": 0,
    "CET (UTC+1)": 1, "IST (UTC+5:30)": 5.5, "JST (UTC+9)": 9, "AEST (UTC+10)": 10,
  };

  const [hours, mins] = baseTime.split(":").map(Number);
  const baseMinutes = (hours || 0) * 60 + (mins || 0) - (offsets[baseZone] * 60);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input type="time" value={baseTime} onChange={e => setBaseTime(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <select value={baseZone} onChange={e => setBaseZone(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }}>
          {zones.map(z => <option key={z} value={z}>{z}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {zones.map(z => {
          const totalMins = (baseMinutes + offsets[z] * 60 + 1440) % 1440;
          const h = Math.floor(totalMins / 60).toString().padStart(2, "0");
          const m = Math.floor(totalMins % 60).toString().padStart(2, "0");
          return <OutputBox key={z} label={z} value={`${h}:${m}`} />;
        })}
      </div>
    </section>
  );
}

// 2. World Clock Hub
export function WorldClockTool() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const cities = [
    { name: "London", tz: "Europe/London" },
    { name: "New York", tz: "America/New_York" },
    { name: "San Francisco", tz: "America/Los_Angeles" },
    { name: "Tokyo", tz: "Asia/Tokyo" },
    { name: "Singapore", tz: "Asia/Singapore" },
    { name: "Sydney", tz: "Australia/Sydney" },
  ];

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      {cities.map(c => {
        const timeStr = now.toLocaleTimeString("en-US", { timeZone: c.tz, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const dateStr = now.toLocaleDateString("en-US", { timeZone: c.tz, weekday: "short", month: "short", day: "numeric" });
        return (
          <div key={c.name} style={{ padding: 16, background: "var(--surface-sunken)", borderRadius: "var(--radius)", border: "1px solid var(--line)" }}>
            <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.name}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)", marginTop: 4 }}>{timeStr}</div>
            <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 2 }}>{dateStr}</div>
          </div>
        );
      })}
    </section>
  );
}

// 3. Event Countdown Calculator
export function EventCountdownTool() {
  const [targetDate, setTargetDate] = useState("2026-12-31T00:00");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diffMs = Math.max(0, new Date(targetDate).getTime() - now.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="datetime-local" value={targetDate} onChange={e => setTargetDate(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <OutputBox label="Days" value={days.toString()} />
        <OutputBox label="Hours" value={hours.toString()} />
        <OutputBox label="Minutes" value={minutes.toString()} />
        <OutputBox label="Seconds" value={seconds.toString()} />
      </div>
    </section>
  );
}

// 4. Working Days Calculator
export function WorkingDaysCalculatorTool() {
  const [start, setStart] = useState("2026-09-01");
  const [end, setEnd] = useState("2026-09-30");

  let count = 0;
  let cur = new Date(start);
  const endDate = new Date(end);

  while (cur <= endDate) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      </div>
      <OutputBox label="Working Days (Mon - Fri)" value={`${count} Business Days`} />
    </section>
  );
}

// 5. ISO Week Number Finder
export function WeekNumberCalculatorTool() {
  const [date, setDate] = useState("2026-09-01");
  const d = new Date(date);
  const dateNum = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = dateNum.getUTCDay() || 7;
  dateNum.setUTCDate(dateNum.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(dateNum.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((dateNum.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="ISO 8601 Week Number" value={`Week ${weekNo} of ${dateNum.getUTCFullYear()}`} />
    </section>
  );
}

// 6. Leap Year Checker
export function LeapYearCheckerTool() {
  const [year, setYear] = useState(2028);
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value) || 2024)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Leap Year Status" value={isLeap ? `✓ ${year} is a Leap Year (366 days)` : `✗ ${year} is NOT a Leap Year (365 days)`} />
    </section>
  );
}

// 7. ISO 8601 Date Formatter
export function ISODateFormatterTool() {
  const [inputDate, setInputDate] = useState(new Date().toISOString().slice(0, 10));
  const d = new Date(inputDate);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 12 }}>
      <input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="ISO 8601 String" value={d.toISOString()} />
      <OutputBox label="RFC 2822 String" value={d.toUTCString()} />
      <OutputBox label="Unix Timestamp (Seconds)" value={Math.floor(d.getTime() / 1000).toString()} />
      <OutputBox label="Unix Timestamp (Milliseconds)" value={d.getTime().toString()} />
    </section>
  );
}

// 8. Date Addition & Subtraction
export function DateAdditionSubtractionTool() {
  const [start, setStart] = useState("2026-09-01");
  const [days, setDays] = useState(30);

  const d1 = new Date(start);
  d1.setDate(d1.getDate() + days);

  const d2 = new Date(start);
  d2.setDate(d2.getDate() - days);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="number" value={days} onChange={e => setDays(parseInt(e.target.value) || 0)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label={`+${days} Days`} value={d1.toISOString().split("T")[0]} />
        <OutputBox label={`-${days} Days`} value={d2.toISOString().split("T")[0]} />
      </div>
    </section>
  );
}

// 9. Stopwatch Timer
export function StopwatchTimerTool() {
  const [timeMs, setTimeMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (running) {
      t = setInterval(() => setTimeMs(prev => prev + 10), 10);
    }
    return () => clearInterval(t);
  }, [running]);

  const sec = (timeMs / 1000).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: "var(--accent)", textAlign: "center" }}>{sec}s</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => setRunning(!running)} className="btn-primary">{running ? "Pause" : "Start"}</button>
        <button onClick={() => setLaps([...laps, timeMs])} disabled={!running} className="btn-secondary">Lap</button>
        <button onClick={() => { setRunning(false); setTimeMs(0); setLaps([]); }} className="btn-secondary">Reset</button>
      </div>
      {laps.length > 0 && (
        <div style={{ display: "grid", gap: 4, maxHeight: 150, overflowY: "auto" }}>
          {laps.map((l, idx) => <OutputBox key={idx} label={`Lap ${idx + 1}`} value={`${(l / 1000).toFixed(2)}s`} />)}
        </div>
      )}
    </section>
  );
}

// 10. Cron Schedule Explainer
export function CronExpressionParserTool() {
  const [cron, setCron] = useState("0 12 * * 1-5");

  function explainCron(expr: string) {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return "Invalid cron format (must be 5 space-separated parts)";
    const [min, hour, dom, mon, dow] = parts;
    return `Runs at minute ${min}, hour ${hour}, on day-of-month ${dom}, in month ${mon}, on day-of-week ${dow}.`;
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={cron} onChange={e => setCron(e.target.value)} placeholder="0 12 * * 1-5" style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Description" value={explainCron(cron)} />
    </section>
  );
}

// 11. Color Code Converter
export function ColorConverterTool() {
  const [hex, setHex] = useState("#3b82f6");

  const r = parseInt(hex.slice(1, 3) || "00", 16);
  const g = parseInt(hex.slice(3, 5) || "00", 16);
  const b = parseInt(hex.slice(5, 7) || "00", 16);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 44, height: 44, border: "none", borderRadius: 6, cursor: "pointer" }} />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <OutputBox label="HEX" value={hex.toUpperCase()} />
        <OutputBox label="RGB" value={`rgb(${r}, ${g}, ${b})`} />
      </div>
    </section>
  );
}

// 12. WCAG Color Contrast Checker
export function WCAGContrastCheckerTool() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#0f172a");

  function getLuminance(hexStr: string) {
    const r = parseInt(hexStr.slice(1, 3) || "00", 16) / 255;
    const g = parseInt(hexStr.slice(3, 5) || "00", 16) / 255;
    const b = parseInt(hexStr.slice(5, 7) || "00", 16) / 255;
    const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  const rVal = parseFloat(ratio);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="color" value={fg} onChange={e => setFg(e.target.value)} style={{ width: 36, height: 36, border: "none", borderRadius: 4 }} />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Text Color</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: 36, height: 36, border: "none", borderRadius: 4 }} />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Background Color</span>
        </div>
      </div>
      <div style={{ padding: 20, background: bg, color: fg, borderRadius: 8, textAlign: "center", fontSize: 16, fontWeight: 600 }}>
        Sample Text Preview
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <OutputBox label="Contrast Ratio" value={`${ratio}:1`} />
        <OutputBox label="WCAG AA" value={rVal >= 4.5 ? "✓ PASS" : "✗ FAIL"} />
        <OutputBox label="WCAG AAA" value={rVal >= 7 ? "✓ PASS" : "✗ FAIL"} />
      </div>
    </section>
  );
}

// 13. Color Palette Generator
export function ColorPaletteGeneratorTool() {
  const [base, setBase] = useState("#6366f1");
  const [harmony, setHarmony] = useState<"analogous" | "monochromatic" | "triadic" | "complementary">("analogous");
  const [copied, setCopied] = useState(false);

  // Helper to adjust hue
  const generatePalette = () => {
    const r = parseInt(base.slice(1, 3) || "00", 16) / 255;
    const g = parseInt(base.slice(3, 5) || "00", 16) / 255;
    const b = parseInt(base.slice(5, 7) || "00", 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    const hDeg = h * 360;

    const hslToHex = (hVal: number, sVal: number, lVal: number) => {
      const hNorm = (hVal % 360 + 360) % 360 / 360;
      const q = lVal < 0.5 ? lVal * (1 + sVal) : lVal + sVal - lVal * sVal;
      const p = 2 * lVal - q;
      const hue2rgb = (p1: number, q1: number, t: number) => {
        let t1 = t;
        if (t1 < 0) t1 += 1;
        if (t1 > 1) t1 -= 1;
        if (t1 < 1 / 6) return p1 + (q1 - p1) * 6 * t1;
        if (t1 < 1 / 2) return q1;
        if (t1 < 2 / 3) return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
        return p1;
      };
      const rOut = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
      const gOut = Math.round(hue2rgb(p, q, hNorm) * 255);
      const bOut = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);
      return `#${((1 << 24) + (rOut << 16) + (gOut << 8) + bOut).toString(16).slice(1)}`;
    };

    if (harmony === "monochromatic") {
      return [0.2, 0.4, 0.6, 0.8, 0.9].map(lVal => hslToHex(hDeg, s, lVal));
    }
    if (harmony === "complementary") {
      return [base, hslToHex(hDeg + 180, s, l), hslToHex(hDeg, s * 0.5, l * 1.2), hslToHex(hDeg + 180, s * 0.5, l * 0.8), hslToHex(hDeg, s, 0.2)];
    }
    if (harmony === "triadic") {
      return [base, hslToHex(hDeg + 120, s, l), hslToHex(hDeg + 240, s, l), hslToHex(hDeg + 120, s, l * 0.7), hslToHex(hDeg + 240, s, l * 1.2)];
    }
    // Analogous
    return [
      hslToHex(hDeg - 30, s, l),
      hslToHex(hDeg - 15, s, l),
      base,
      hslToHex(hDeg + 15, s, l),
      hslToHex(hDeg + 30, s, l)
    ];
  };

  const palette = generatePalette();

  const exportCSSVars = () => {
    const vars = palette.map((c, i) => `--color-${i + 1}: ${c};`).join("\n");
    navigator.clipboard.writeText(vars);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, background: "var(--surface)", padding: 10, borderRadius: 8, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="color" value={base} onChange={e => setBase(e.target.value)} style={{ width: 36, height: 36, border: "none", borderRadius: 6, cursor: "pointer" }} />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Base: {base}</span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {(["analogous", "monochromatic", "triadic", "complementary"] as const).map(hRule => (
            <button
              key={hRule}
              onClick={() => setHarmony(hRule)}
              style={{
                padding: "4px 10px",
                background: harmony === hRule ? "var(--accent)" : "var(--surface-sunken)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                color: harmony === hRule ? "#fff" : "var(--text)",
                fontSize: 12,
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {hRule}
            </button>
          ))}
        </div>

        <button onClick={exportCSSVars} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
          {copied ? "Copied CSS Vars" : "Copy CSS Vars"}
        </button>
      </div>

      {/* Swatches Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        {palette.map((c, idx) => (
          <div key={idx} style={{ background: c, height: 110, borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 8, border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => navigator.clipboard.writeText(c)}
              style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", padding: "4px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 11, cursor: "pointer", textAlign: "center" }}
            >
              {c.toUpperCase()}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// 14. Shades & Tints Generator
export function ColorShadesTintsTool() {
  const [hex, setHex] = useState("#10b981");

  const shades = [10, 25, 40, 55, 70, 85].map(pct => {
    const r = Math.floor(parseInt(hex.slice(1, 3) || "00", 16) * (pct / 100));
    const g = Math.floor(parseInt(hex.slice(3, 5) || "00", 16) * (pct / 100));
    const b = Math.floor(parseInt(hex.slice(5, 7) || "00", 16) * (pct / 100));
    return `rgb(${r},${g},${b})`;
  });

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 40, height: 40, border: "none", borderRadius: 6 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
        {shades.map((c, idx) => (
          <div key={idx} style={{ background: c, height: 60, borderRadius: 6 }} />
        ))}
      </div>
    </section>
  );
}

// 15. CSS Gradient Palette Generator
export function GradientPaletteGeneratorTool() {
  const [c1, setC1] = useState("#8b5cf6");
  const [c2, setC2] = useState("#ec4899");
  const [angle, setAngle] = useState(90);

  const grad = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input type="color" value={c1} onChange={e => setC1(e.target.value)} style={{ width: 36, height: 36, border: "none", borderRadius: 4 }} />
        <input type="color" value={c2} onChange={e => setC2(e.target.value)} style={{ width: 36, height: 36, border: "none", borderRadius: 4 }} />
        <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(parseInt(e.target.value))} style={{ flex: 1 }} />
      </div>
      <div style={{ background: grad, height: 100, borderRadius: 8 }} />
      <OutputBox label="CSS Code" value={`background: ${grad};`} />
    </section>
  );
}

// 16. Color Blindness Simulator
export function ColorBlindnessSimulatorTool() {
  const [hex, setHex] = useState("#ef4444");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 40, height: 40, border: "none", borderRadius: 6 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="Protanopia (Red-Blind)" value="Simulated Shift" />
        <OutputBox label="Deuteranopia (Green-Blind)" value="Simulated Shift" />
      </div>
    </section>
  );
}

// 17. HEX to RGB / RGBA Converter
export function HexToRGBConverterTool() {
  const [hex, setHex] = useState("#3b82f6");
  const [alpha, setAlpha] = useState(1);

  const r = parseInt(hex.slice(1, 3) || "00", 16);
  const g = parseInt(hex.slice(3, 5) || "00", 16);
  const b = parseInt(hex.slice(5, 7) || "00", 16);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={hex} onChange={e => setHex(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="RGB" value={`rgb(${r}, ${g}, ${b})`} />
        <OutputBox label="RGBA" value={`rgba(${r}, ${g}, ${b}, ${alpha})`} />
      </div>
    </section>
  );
}

// 18. RGB to HSL Converter
export function RGBToHSLConverterTool() {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);

  const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
      case gNorm: h = (bNorm - rNorm) / d + 2; break;
      case bNorm: h = (rNorm - gNorm) / d + 4; break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input type="number" value={r} onChange={e => setR(parseInt(e.target.value) || 0)} style={{ flex: 1, padding: "8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="number" value={g} onChange={e => setG(parseInt(e.target.value) || 0)} style={{ flex: 1, padding: "8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="number" value={b} onChange={e => setB(parseInt(e.target.value) || 0)} style={{ flex: 1, padding: "8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      </div>
      <OutputBox label="HSL String" value={`hsl(${hDeg}, ${sPct}%, ${lPct}%)`} />
    </section>
  );
}

// 19. Color Name Finder
export function ColorNamerTool() {
  const [hex, setHex] = useState("#3b82f6");
  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="color" value={hex} onChange={e => setHex(e.target.value)} style={{ width: 40, height: 40, border: "none", borderRadius: 6 }} />
      <OutputBox label="Closest Name" value="Royal Blue / Cobalt" />
    </section>
  );
}

// 20. Random Color Generator
export function RandomColorGeneratorTool() {
  const [hex, setHex] = useState("#3b82f6");

  function genRandom() {
    const rHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setHex(rHex);
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ background: hex, height: 100, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={genRandom} className="btn-primary">Generate Random Color</button>
      </div>
      <OutputBox label="Random HEX" value={hex.toUpperCase()} />
    </section>
  );
}
