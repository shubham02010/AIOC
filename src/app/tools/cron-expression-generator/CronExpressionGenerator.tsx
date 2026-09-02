"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

function describeCron(min: string, hr: string, dom: string, mon: string, dow: string): string {
  if (min === "*" && hr === "*" && dom === "*" && mon === "*" && dow === "*") {
    return "Runs every single minute.";
  }
  if (min.startsWith("*/") && hr === "*" && dom === "*" && mon === "*" && dow === "*") {
    const interval = min.replace("*/", "");
    return `Runs every ${interval} minutes.`;
  }
  if (min === "0" && hr === "*" && dom === "*" && mon === "*" && dow === "*") {
    return "Runs at the start of every hour.";
  }
  if (min === "0" && hr === "0" && dom === "*" && mon === "*" && dow === "*") {
    return "Runs every day at midnight (00:00).";
  }
  if (min === "0" && hr === "9" && dom === "*" && mon === "*" && dow === "1") {
    return "Runs every Monday at 09:00 AM.";
  }
  return `Schedule: Minute [${min}], Hour [${hr}], Day of Month [${dom}], Month [${mon}], Day of Week [${dow}].`;
}

const presets = [
  { label: "Every minute", cron: "* * * * *" },
  { label: "Every 5 minutes", cron: "*/5 * * * *" },
  { label: "Every 15 minutes", cron: "*/15 * * * *" },
  { label: "Every hour at :00", cron: "0 * * * *" },
  { label: "Every day at midnight", cron: "0 0 * * *" },
  { label: "Every day at 9 AM", cron: "0 9 * * *" },
  { label: "Every Monday at 9 AM", cron: "0 9 * * 1" },
  { label: "1st of month at midnight", cron: "0 0 1 * *" },
];

export function CronExpressionGenerator() {
  const [min, setMin] = useState("0");
  const [hr, setHr] = useState("9");
  const [dom, setDom] = useState("*");
  const [mon, setMon] = useState("*");
  const [dow, setDow] = useState("*");
  const [copied, setCopied] = useState(false);

  const cronString = `${min.trim() || "*"} ${hr.trim() || "*"} ${dom.trim() || "*"} ${mon.trim() || "*"} ${dow.trim() || "*"}`;

  const description = useMemo(() => {
    return describeCron(min.trim(), hr.trim(), dom.trim(), mon.trim(), dow.trim());
  }, [min, hr, dom, mon, dow]);

  const loadPreset = (expr: string) => {
    const parts = expr.split(" ");
    if (parts.length === 5) {
      setMin(parts[0]);
      setHr(parts[1]);
      setDom(parts[2]);
      setMon(parts[3]);
      setDow(parts[4]);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cronString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="Cron Expression Generator tool">
      <div className="tool-controls" style={{ flexWrap: "wrap" }}>
        <div className="control-group">
          <span className="control-label">Quick Presets:</span>
          <label className="select-wrap">
            <select onChange={(e) => { if (e.target.value) loadPreset(e.target.value); }}>
              <option value="">Select a preset schedule...</option>
              {presets.map((p) => (
                <option key={p.cron} value={p.cron}>{p.label} ({p.cron})</option>
              ))}
            </select>
            <Icon name="chevron-down" size={15} />
          </label>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginTop: 12 }}>
        {[
          { label: "Minute (0-59)", val: min, set: setMin, ph: "* or 0-59" },
          { label: "Hour (0-23)", val: hr, set: setHr, ph: "* or 0-23" },
          { label: "Day of Month (1-31)", val: dom, set: setDom, ph: "* or 1-31" },
          { label: "Month (1-12)", val: mon, set: setMon, ph: "* or 1-12" },
          { label: "Day of Week (0-6)", val: dow, set: setDow, ph: "* or 0-6" },
        ].map((field, idx) => (
          <div key={idx} className="editor-panel">
            <div className="editor-header"><span>{field.label}</span></div>
            <input
              type="text"
              className="code-editor"
              style={{ height: 50, textAlign: "center", fontSize: 14 }}
              value={field.val}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.ph}
              spellCheck="false"
            />
          </div>
        ))}
      </div>

      <div className="editor-panel output-panel" style={{ marginTop: 12, minHeight: 140 }}>
        <div className="editor-header">
          <span>Cron Expression Output</span>
          <div className="output-actions">
            <button type="button" onClick={copy}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy Cron"}</button>
          </div>
        </div>
        <div style={{ padding: "16px 18px" }}>
          <pre className="code-output" style={{ fontSize: 22, color: "var(--accent)", margin: 0 }}>{cronString}</pre>
          <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="clock" size={16} />
            <span>{description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
