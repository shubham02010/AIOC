"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

export function NumberBaseConverter() {
  const [decInput, setDecInput] = useState("255");
  const [copiedKey, setCopiedKey] = useState("");

  const values = useMemo(() => {
    const raw = decInput.trim();
    if (!raw) return { dec: "", bin: "", hex: "", oct: "", valid: true };
    try {
      // support BigInt parsing
      const big = BigInt(raw);
      return {
        dec: big.toString(10),
        bin: big.toString(2),
        hex: big.toString(16).toUpperCase(),
        oct: big.toString(8),
        valid: true
      };
    } catch {
      return { dec: "", bin: "", hex: "", oct: "", valid: false, error: "Invalid decimal integer." };
    }
  }, [decInput]);

  const setFromBin = (bin: string) => {
    if (!bin.trim()) { setDecInput(""); return; }
    try {
      const big = BigInt("0b" + bin.trim());
      setDecInput(big.toString(10));
    } catch {
      // keep current input
    }
  };

  const setFromHex = (hex: string) => {
    if (!hex.trim()) { setDecInput(""); return; }
    try {
      const big = BigInt("0x" + hex.trim());
      setDecInput(big.toString(10));
    } catch {
      // keep current input
    }
  };

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
    <section className="json-tool" aria-label="Number Base Converter tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Status: <strong style={{ color: values.valid ? "var(--accent)" : "var(--danger)" }}>{values.valid ? "Valid Number" : "Invalid Integer"}</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setDecInput("")}>Clear</button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <div className="editor-panel" style={{ minHeight: 75 }}>
          <div className="editor-header">
            <span>Decimal (Base 10)</span>
            <div className="output-actions">
              <button type="button" onClick={() => copy(values.dec, "dec")} disabled={!values.dec}>
                {copiedKey === "dec" ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}{copiedKey === "dec" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 44, padding: "0 12px" }}
            value={decInput}
            onChange={(e) => setDecInput(e.target.value)}
            placeholder="Type decimal number..."
            spellCheck="false"
          />
        </div>

        <div className="editor-panel" style={{ minHeight: 75 }}>
          <div className="editor-header">
            <span>Binary (Base 2)</span>
            <div className="output-actions">
              <button type="button" onClick={() => copy(values.bin, "bin")} disabled={!values.bin}>
                {copiedKey === "bin" ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}{copiedKey === "bin" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 44, padding: "0 12px" }}
            value={values.bin}
            onChange={(e) => setFromBin(e.target.value)}
            placeholder="Type binary sequence (101010)..."
            spellCheck="false"
          />
        </div>

        <div className="editor-panel" style={{ minHeight: 75 }}>
          <div className="editor-header">
            <span>Hexadecimal (Base 16)</span>
            <div className="output-actions">
              <button type="button" onClick={() => copy(values.hex, "hex")} disabled={!values.hex}>
                {copiedKey === "hex" ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}{copiedKey === "hex" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 44, padding: "0 12px" }}
            value={values.hex}
            onChange={(e) => setFromHex(e.target.value)}
            placeholder="Type hexadecimal (FF)..."
            spellCheck="false"
          />
        </div>

        <div className="editor-panel" style={{ minHeight: 75 }}>
          <div className="editor-header">
            <span>Octal (Base 8)</span>
            <div className="output-actions">
              <button type="button" onClick={() => copy(values.oct, "oct")} disabled={!values.oct}>
                {copiedKey === "oct" ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}{copiedKey === "oct" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <input
            type="text"
            className="code-editor"
            style={{ height: 44, padding: "0 12px", color: "var(--accent)" }}
            value={values.oct}
            readOnly
            placeholder="Octal value..."
          />
        </div>
      </div>
    </section>
  );
}
