"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

function encodeHtmlEntities(str: string): string {
  return str.replace(/[\u00A0-\u9999<>&"']/g, (i) => `&#${i.charCodeAt(0)};`);
}

function decodeHtmlEntities(str: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

export function HtmlEntityTool() {
  const [input, setInput] = useState("<div class=\"hero\">Hello & Welcome to 'AIOC'!</div>");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return "";
    try {
      return mode === "encode" ? encodeHtmlEntities(input) : decodeHtmlEntities(input);
    } catch {
      return "Error processing HTML entities.";
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
    <section className="json-tool" aria-label="HTML Entity Encoder/Decoder tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Operation:</span>
          <div className="tool-action-group">
            <button className={`button ${mode === "encode" ? "button-primary" : "button-quiet"}`} type="button" onClick={() => setMode("encode")}>Encode Entities</button>
            <button className={`button ${mode === "decode" ? "button-primary" : "button-quiet"}`} type="button" onClick={() => setMode("decode")}>Decode Entities</button>
          </div>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Input String</span><span>{input.length} chars</span></div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Paste raw HTML with < > & \" ' characters..." : "Paste HTML entities like &lt;div&gt; &amp; &quot;..."}
            spellCheck="false"
          />
        </div>
        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>{mode === "encode" ? "Encoded Output" : "Decoded Output"}</span>
            <div className="output-actions">
              <button type="button" onClick={copy} disabled={!output}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy"}</button>
            </div>
          </div>
          <pre className="code-output">{output || <span className="output-placeholder">Processed HTML result will appear here...</span>}</pre>
        </div>
      </div>
    </section>
  );
}
