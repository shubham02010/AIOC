"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

export function UrlEncoder() {
  const [input, setInput] = useState("https://example.com/search?q=AIOC developer tools & format=json");
  const [mode, setMode] = useState<"component" | "uri">("component");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "component" ? encodeURIComponent(input) : encodeURI(input);
    } catch {
      return "Error encoding URL.";
    }
  }, [input, mode]);

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
    <section className="json-tool" aria-label="URL Encoder tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Encoding mode:</span>
          <label className="select-wrap">
            <select value={mode} onChange={(e) => setMode(e.target.value as "component" | "uri")}>
              <option value="component">encodeURIComponent (Strict: encodes & = ? / :)</option>
              <option value="uri">encodeURI (Preserves valid URL structure)</option>
            </select>
            <Icon name="chevron-down" size={15} />
          </label>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Plain URL / Component</span><span>{input.length} chars</span></div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter URL to encode..."
            spellCheck="false"
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Encoded Output</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <pre className="code-output">{output || <span className="output-placeholder">Encoded URL will appear here...</span>}</pre>
        </div>
      </div>
    </section>
  );
}
