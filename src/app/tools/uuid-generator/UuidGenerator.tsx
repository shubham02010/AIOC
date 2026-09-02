"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

function generateV4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback RFC 4122 v4 generator
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
    const num = Number(c);
    return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
  });
}

export function UuidGenerator() {
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let val = generateV4();
      if (!hyphens) val = val.replace(/-/g, "");
      if (uppercase) val = val.toUpperCase();
      list.push(val);
    }
    setUuids(list);
  };

  useEffect(() => {
    generate();
  }, [quantity, uppercase, hyphens]);

  const outputText = uuids.join("\n");

  const copy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  const download = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "uuids.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="json-tool" aria-label="UUID Generator tool">
      <div className="tool-controls" style={{ flexWrap: "wrap" }}>
        <div className="control-group">
          <span className="control-label">Quantity:</span>
          <label className="select-wrap">
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              <option value="1">1 UUID</option>
              <option value="5">5 UUIDs</option>
              <option value="10">10 UUIDs</option>
              <option value="25">25 UUIDs</option>
              <option value="50">50 UUIDs</option>
            </select>
            <Icon name="chevron-down" size={15} />
          </label>
        </div>
        <div className="control-group" style={{ gap: 14 }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
            <span>Uppercase</span>
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} />
            <span>Include Hyphens</span>
          </label>
        </div>
        <div className="tool-action-group">
          <button className="button button-primary" type="button" onClick={generate}><Icon name="refresh" size={15} /> Generate New</button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel output-panel" style={{ minHeight: 300 }}>
          <div className="editor-header">
            <span>Generated UUIDs (v4 Cryptographically Secure)</span>
            <div className="output-actions">
              <button type="button" onClick={copy}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy All"}</button>
              <button type="button" onClick={download}><Icon name="download" size={15} />Download .txt</button>
            </div>
          </div>
          <pre className="code-output" style={{ color: "var(--accent)" }}>{outputText}</pre>
        </div>
      </div>
    </section>
  );
}
