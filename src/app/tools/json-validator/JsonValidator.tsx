"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

const example = `{
  "name": "AIOC JSON Validator",
  "valid": true,
  "features": ["Line number calculation", "Column calculation", "Strict parse check"],
  "rules": {
    "quotes": "double",
    "trailingCommas": false
  }
}`;

type Notice = { type: "success" | "error" | "idle"; title: string; detail: string };

function jsonError(error: unknown, value: string): Notice {
  const message = error instanceof Error ? error.message : "Invalid JSON structure.";
  const positionMatch = /position (\d+)/i.exec(message);
  const position = positionMatch ? Number(positionMatch[1]) : -1;
  
  if (position >= 0 && position <= value.length) {
    const before = value.slice(0, position);
    const line = before.split("\n").length;
    const column = position - before.lastIndexOf("\n");
    return {
      type: "error",
      title: "Syntax Error Found",
      detail: `${message.split(" at position")[0]} at line ${line}, column ${column}.`
    };
  }

  return {
    type: "error",
    title: "Invalid JSON Syntax",
    detail: message
  };
}

export function JsonValidator() {
  const [input, setInput] = useState(example);
  const [notice, setNotice] = useState<Notice>({
    type: "success",
    title: "Valid JSON",
    detail: "The input JSON is valid and formatted correctly."
  });
  const [stats, setStats] = useState<{ keys: number; depth: number; type: string }>({ keys: 5, depth: 3, type: "object" });
  const [copied, setCopied] = useState(false);

  const analyze = (data: unknown, currentDepth = 1): { keys: number; maxDepth: number } => {
    if (typeof data !== "object" || data === null) {
      return { keys: 0, maxDepth: currentDepth };
    }
    let count = 0;
    let max = currentDepth;
    for (const key in data) {
      count++;
      const val = (data as Record<string, unknown>)[key];
      if (typeof val === "object" && val !== null) {
        const res = analyze(val, currentDepth + 1);
        count += res.keys;
        if (res.maxDepth > max) max = res.maxDepth;
      }
    }
    return { keys: count, maxDepth: max };
  };

  const validate = () => {
    if (!input.trim()) {
      setNotice({ type: "error", title: "Empty input", detail: "Please enter JSON text to validate." });
      return;
    }
    try {
      const parsed = JSON.parse(input) as unknown;
      const type = Array.isArray(parsed) ? "array" : typeof parsed;
      const { keys, maxDepth } = analyze(parsed);
      setStats({ keys, depth: maxDepth, type });
      setNotice({
        type: "success",
        title: "JSON is 100% Valid",
        detail: `Successfully parsed root ${type}. Total nodes: ${keys}, Max depth: ${maxDepth}.`
      });
    } catch (error) {
      setNotice(jsonError(error, input));
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="JSON Validator tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Root type: <strong style={{ color: "var(--text)" }}>{stats.type}</strong></span>
          <span className="control-label" style={{ marginLeft: 12 }}>Keys/Nodes: <strong style={{ color: "var(--text)" }}>{stats.keys}</strong></span>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => { setInput(""); setNotice({ type: "idle", title: "Input cleared", detail: "Paste JSON to validate." }); }}>Clear</button>
          <button className="button button-secondary" type="button" onClick={copy}>{copied ? "Copied" : "Copy JSON"}</button>
          <button className="button button-primary" type="button" onClick={validate}>Validate JSON <kbd>⌘↵</kbd></button>
        </div>
      </div>
      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel" style={{ minHeight: 380 }}>
          <div className="editor-header">
            <span>JSON Payload</span>
            <span>{input.length.toLocaleString()} characters</span>
          </div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); validate(); } }}
            spellCheck="false"
            placeholder="Paste JSON payload to validate..."
          />
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
