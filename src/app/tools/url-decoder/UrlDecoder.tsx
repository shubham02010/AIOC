"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

export function UrlDecoder() {
  const [input, setInput] = useState("https%3A%2F%2Fexample.com%2Fsearch%3Fq%3DAIOC%20developer%20tools%20%26%20format%3Djson");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const output = useMemo(() => {
    if (!input) {
      setError("");
      return "";
    }
    try {
      const decoded = decodeURIComponent(input);
      setError("");
      return decoded;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Malformed URI sequence.");
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
    <section className="json-tool" aria-label="URL Decoder tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Status: <strong style={{ color: error ? "var(--danger)" : "var(--accent)" }}>{error ? "Malformed URI" : "Valid Percent Encoding"}</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Encoded Input</span><span>{input.length} chars</span></div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste percent-encoded URL..."
            spellCheck="false"
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Decoded Output</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          {error ? (
            <div style={{ padding: 15, color: "var(--danger)", fontSize: 12, fontFamily: "var(--mono)" }}>Error: {error}</div>
          ) : (
            <pre className="code-output">{output || <span className="output-placeholder">Decoded plain URL will appear here...</span>}</pre>
          )}
        </div>
      </div>
    </section>
  );
}
