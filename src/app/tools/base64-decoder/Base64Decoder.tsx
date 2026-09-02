"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

function base64ToUtf8(str: string): string {
  let cleaned = str.trim().replace(/-/g, "+").replace(/_/g, "/");
  while (cleaned.length % 4) {
    cleaned += "=";
  }
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function Base64Decoder() {
  const [input, setInput] = useState("SGVsbG8sIFdvcmxkISBBSU9DIERldmVsb3BlciBUb29scyAyMDI2");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) {
      setError("");
      return "";
    }
    try {
      const decoded = base64ToUtf8(input);
      setError("");
      return decoded;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Base64 string.");
      return "";
    }
  }, [input]);

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="Base64 Decoder tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Status: <strong style={{ color: error ? "var(--danger)" : "var(--accent)" }}>{error ? "Invalid Base64" : "Valid Base64"}</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Base64 Encoded Input</span></div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste Base64 string here..."
            spellCheck="false"
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Decoded Plain Text</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          {error ? (
            <div style={{ padding: 15, color: "var(--danger)", fontSize: 12, fontFamily: "var(--mono)" }}>{error}</div>
          ) : (
            <pre className="code-output">{output || <span className="output-placeholder">Decoded UTF-8 string will appear here...</span>}</pre>
          )}
        </div>
      </div>
    </section>
  );
}
