"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function Base64Encoder() {
  const [input, setInput] = useState("Hello, World! AIOC Developer Tools 2026");
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      let encoded = utf8ToBase64(input);
      if (urlSafe) {
        encoded = encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      return encoded;
    } catch {
      return "Error encoding string to Base64.";
    }
  }, [input, urlSafe]);

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
    <section className="json-tool" aria-label="Base64 Encoder tool">
      <div className="tool-controls">
        <div className="control-group">
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} />
            <span>URL-Safe Base64 (replace + / with - _)</span>
          </label>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Plain Text / Raw String</span><span>{input.length} chars</span></div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text to encode into Base64..."
            spellCheck="false"
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Base64 Encoded Output</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <pre className="code-output">{output || <span className="output-placeholder">Base64 result will appear here...</span>}</pre>
        </div>
      </div>
    </section>
  );
}
