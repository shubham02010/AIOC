"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const uuidNoHyphenRegex = /^[0-9a-f]{8}[0-9a-f]{4}([1-5])[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i;

type UuidAnalysis = {
  valid: boolean;
  version?: string;
  variant?: string;
  format?: string;
  error?: string;
};

export function UuidValidator() {
  const [input, setInput] = useState("f47ac10b-58cc-4372-a567-0e02b2c3d479");

  const analysis = useMemo<UuidAnalysis>(() => {
    const trimmed = input.trim();
    if (!trimmed) return { valid: false, error: "Enter a UUID to validate." };

    const withHyphens = uuidRegex.exec(trimmed);
    if (withHyphens) {
      const ver = withHyphens[1];
      return {
        valid: true,
        version: `Version ${ver} (${ver === "4" ? "Randomly Generated" : ver === "1" ? "Time-based" : ver === "5" ? "SHA-1 Name-based" : "Name-based"})`,
        variant: "RFC 4122 / DCE 1.1",
        format: "Standard hyphenated (8-4-4-4-12)"
      };
    }

    const noHyphens = uuidNoHyphenRegex.exec(trimmed);
    if (noHyphens) {
      const ver = noHyphens[1];
      return {
        valid: true,
        version: `Version ${ver}`,
        variant: "RFC 4122",
        format: "Compact non-hyphenated 32 hex digits"
      };
    }

    return {
      valid: false,
      error: "String does not conform to RFC 4122 UUID layout (expected 32 hex digits with optional hyphens)."
    };
  }, [input]);

  return (
    <section className="json-tool" aria-label="UUID Validator tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Status: </span>
          <strong style={{ color: analysis.valid ? "var(--accent)" : "var(--danger)" }}>
            {analysis.valid ? "Valid RFC 4122 UUID" : "Invalid UUID"}
          </strong>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel" style={{ minHeight: 110 }}>
          <div className="editor-header"><span>UUID / GUID Input</span></div>
          <textarea
            className="code-editor"
            style={{ height: 80 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste UUID to validate..."
            spellCheck="false"
          />
        </div>
      </div>

      <div className={`tool-notice ${analysis.valid ? "success" : "error"}`} style={{ marginTop: 12 }}>
        <span className="notice-icon">{analysis.valid ? <Icon name="check" size={15} /> : "!"}</span>
        <div>
          <strong>{analysis.valid ? "UUID Syntax Valid" : "UUID Error"}</strong>
          <p>{analysis.valid ? `${analysis.version} • ${analysis.format}` : analysis.error}</p>
        </div>
      </div>
    </section>
  );
}
