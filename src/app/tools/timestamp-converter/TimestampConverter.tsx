"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

export function TimestampConverter() {
  const [inputDate, setInputDate] = useState(() => new Date().toISOString());
  const [parsed, setParsed] = useState<{
    valid: boolean;
    iso?: string;
    utc?: string;
    local?: string;
    seconds?: number;
    millis?: number;
    error?: string;
  }>({ valid: true });
  const [copiedKey, setCopiedKey] = useState("");

  useEffect(() => {
    if (!inputDate.trim()) {
      setParsed({ valid: false, error: "Enter a date string or timestamp." });
      return;
    }
    let dateObj: Date;
    const num = Number(inputDate.trim());
    if (!isNaN(num) && inputDate.trim().length > 5) {
      dateObj = new Date(num > 1e11 ? num : num * 1000);
    } else {
      dateObj = new Date(inputDate.trim());
    }

    if (isNaN(dateObj.getTime())) {
      setParsed({ valid: false, error: "Could not parse date string." });
      return;
    }

    setParsed({
      valid: true,
      iso: dateObj.toISOString(),
      utc: dateObj.toUTCString(),
      local: dateObj.toString(),
      seconds: Math.floor(dateObj.getTime() / 1000),
      millis: dateObj.getTime()
    });
  }, [inputDate]);

  const setNow = () => setInputDate(new Date().toISOString());

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="Timestamp Converter tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Status: <strong style={{ color: parsed.valid ? "var(--accent)" : "var(--danger)" }}>{parsed.valid ? "Parsed Successfully" : "Invalid Date"}</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-primary" type="button" onClick={setNow}><Icon name="clock" size={15} /> Set Current Time</button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel" style={{ minHeight: 100 }}>
          <div className="editor-header"><span>Date String / ISO / Timestamp Input</span></div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 60 }}
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            placeholder="e.g. 2026-09-01T15:50:00Z or 1788277951"
            spellCheck="false"
          />
        </div>
      </div>

      {parsed.valid ? (
        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {[
            { key: "iso", label: "ISO 8601 String", val: parsed.iso || "" },
            { key: "sec", label: "Unix Timestamp (Seconds)", val: String(parsed.seconds || "") },
            { key: "ms", label: "Unix Timestamp (Milliseconds)", val: String(parsed.millis || "") },
            { key: "utc", label: "UTC Standard String", val: parsed.utc || "" },
            { key: "local", label: "Local Timezone String", val: parsed.local || "" },
          ].map((item) => (
            <div key={item.key} className="editor-panel" style={{ minHeight: 64 }}>
              <div className="editor-header">
                <span>{item.label}</span>
                <div className="output-actions">
                  <button type="button" onClick={() => copy(item.val, item.key)}>
                    {copiedKey === item.key ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                    {copiedKey === item.key ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div style={{ padding: "8px 12px", fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", wordBreak: "break-all" }}>
                {item.val}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="tool-notice error" style={{ marginTop: 12 }}>
          <span className="notice-icon">!</span>
          <div>
            <strong>Date Parsing Error</strong>
            <p>{parsed.error}</p>
          </div>
        </div>
      )}
    </section>
  );
}
