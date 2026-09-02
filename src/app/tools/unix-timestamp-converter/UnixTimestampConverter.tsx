"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

export function UnixTimestampConverter() {
  const [epochInput, setEpochInput] = useState<string>(() => Math.floor(Date.now() / 1000).toString());
  const [nowSec, setNowSec] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [copiedKey, setCopiedKey] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNowSec(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const num = Number(epochInput.trim());
  const isValid = !isNaN(num) && epochInput.trim() !== "";
  const isMillis = num > 1e11;
  const dateObj = isValid ? new Date(isMillis ? num : num * 1000) : null;
  const isDateValid = dateObj ? !isNaN(dateObj.getTime()) : false;

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
    <section className="json-tool" aria-label="Unix Timestamp Converter tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Current Epoch: </span>
          <strong style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 13 }}>{nowSec}</strong>
          <span className="pulse" style={{ marginLeft: 6 }} />
        </div>
        <div className="tool-action-group">
          <button className="button button-secondary" type="button" onClick={() => setEpochInput(nowSec.toString())}>Use Current Second</button>
          <button className="button button-primary" type="button" onClick={() => setEpochInput((nowSec * 1000).toString())}>Use Current Millisecond</button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel" style={{ minHeight: 100 }}>
          <div className="editor-header">
            <span>Unix Timestamp (Seconds or Milliseconds)</span>
            <span>{isMillis ? "Milliseconds mode detected" : "Seconds mode detected"}</span>
          </div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 60 }}
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            placeholder="Enter epoch number, e.g. 1788277951"
            spellCheck="false"
          />
        </div>
      </div>

      {isDateValid && dateObj ? (
        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {[
            { key: "utc", label: "GMT / UTC Time", val: dateObj.toUTCString() },
            { key: "iso", label: "ISO 8601 String", val: dateObj.toISOString() },
            { key: "local", label: "Local System Time", val: dateObj.toString() },
            { key: "sec", label: "Unix Epoch (Seconds)", val: Math.floor(dateObj.getTime() / 1000).toString() },
            { key: "ms", label: "Unix Epoch (Milliseconds)", val: dateObj.getTime().toString() },
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
            <strong>Invalid Epoch Number</strong>
            <p>Please enter a valid numeric Unix timestamp in seconds or milliseconds.</p>
          </div>
        </div>
      )}
    </section>
  );
}
