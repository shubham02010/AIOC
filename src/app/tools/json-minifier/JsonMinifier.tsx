"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

const example = `{
  "app": "AIOC",
  "version": "1.0.0",
  "settings": {
    "theme": "dark",
    "compact": true
  },
  "tags": [
    "developer",
    "tools",
    "speed"
  ]
}`;

type Notice = { type: "success" | "error" | "idle"; title: string; detail: string };

export function JsonMinifier() {
  const [input, setInput] = useState(example);
  const [output, setOutput] = useState("");
  const [notice, setNotice] = useState<Notice>({
    type: "idle",
    title: "Ready to minify",
    detail: "Paste formatted JSON and click Minify."
  });
  const [copied, setCopied] = useState(false);

  const minify = () => {
    if (!input.trim()) {
      setNotice({ type: "error", title: "Empty input", detail: "Please provide JSON text to minify." });
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      const saved = Math.max(0, input.length - minified.length);
      const percent = input.length > 0 ? ((saved / input.length) * 100).toFixed(1) : "0";
      setNotice({
        type: "success",
        title: "Minified successfully",
        detail: `Reduced size by ${saved.toLocaleString()} bytes (${percent}% savings).`
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Invalid JSON syntax.";
      setNotice({ type: "error", title: "Invalid JSON", detail: msg });
      setOutput("");
    }
  };

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

  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "minified.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="json-tool" aria-label="JSON Minifier tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Original: <strong style={{ color: "var(--text)" }}>{input.length.toLocaleString()} chars</strong></span>
          <span className="control-label" style={{ marginLeft: 12 }}>Minified: <strong style={{ color: "var(--text)" }}>{output.length.toLocaleString()} chars</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => { setInput(""); setOutput(""); setNotice({ type: "idle", title: "Cleared", detail: "Input and output cleared." }); }}>Clear</button>
          <button className="button button-primary" type="button" onClick={minify}>Minify JSON <kbd>⌘↵</kbd></button>
        </div>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header">
            <span>Input (Formatted JSON)</span>
            <span>{input.length.toLocaleString()} chars</span>
          </div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); minify(); } }}
            spellCheck="false"
            placeholder="Paste formatted JSON here..."
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Output (Minified JSON)</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
              <button type="button" onClick={download} disabled={!output}><Icon name="download" size={15} />Download</button>
            </div>
          </div>
          <pre className="code-output">{output || <span className="output-placeholder">Minified JSON output will appear here.</span>}</pre>
        </div>
      </div>
      <div className={`tool-notice ${notice.type}`} role="status" aria-live="polite">
        <span className="notice-icon">{notice.type === "error" ? "!" : <Icon name="check" size={15} />}</span>
        <div>
          <strong>{notice.title}</strong>
          <p>{notice.detail}</p>
        </div>
      </div>
    </section>
  );
}
