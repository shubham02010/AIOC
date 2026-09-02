"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

const samples: Record<string, string> = {
  simple: `{
  "workspace": "AIOC",
  "version": "2.0",
  "browserFirst": true,
  "metrics": { "tools": 151, "speedMs": 0 }
}`,
  nested: `{
  "user": {
    "id": 101,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "roles": ["admin", "developer"],
    "preferences": { "theme": "dark", "notifications": null }
  },
  "status": "active"
}`,
  array: `[
  { "id": 1, "title": "JSON Formatter", "category": "developer" },
  { "id": 2, "title": "JWT Decoder", "category": "security" },
  { "id": 3, "title": "Regex Tester", "category": "text" }
]`
};

type ViewMode = "code" | "tree" | "raw";
type Notice = { type: "success" | "error" | "idle"; title: string; detail: string };

// Helper recursive transformations
function sortObjectKeys(obj: any, recursive = false): any {
  if (Array.isArray(obj)) {
    return recursive ? obj.map(item => sortObjectKeys(item, true)) : obj;
  }
  if (obj !== null && typeof obj === "object") {
    const keys = Object.keys(obj).sort();
    const sorted: Record<string, any> = {};
    for (const key of keys) {
      sorted[key] = recursive ? sortObjectKeys(obj[key], true) : obj[key];
    }
    return sorted;
  }
  return obj;
}

function removeNullValues(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeNullValues).filter(val => val !== null);
  }
  if (obj !== null && typeof obj === "object") {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== null) cleaned[k] = removeNullValues(v);
    }
    return cleaned;
  }
  return obj;
}

function removeEmptyValues(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyValues).filter(v => v !== "" && v !== null && !(typeof v === "object" && Object.keys(v).length === 0));
  }
  if (obj !== null && typeof obj === "object") {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      const val = removeEmptyValues(v);
      if (val !== "" && val !== null && !(typeof val === "object" && Object.keys(val).length === 0)) {
        cleaned[k] = val;
      }
    }
    return cleaned;
  }
  return obj;
}

export function JsonFormatter() {
  const [input, setInput] = useState(samples.simple);
  const [output, setOutput] = useState(samples.simple);
  const [viewMode, setViewMode] = useState<ViewMode>("code");
  const [indent, setIndent] = useState("2");
  const [lineWrap, setLineWrap] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jsonPath, setJsonPath] = useState("$.user.name");
  const [pathResult, setPathResult] = useState<string>("");
  const [notice, setNotice] = useState<Notice>({ type: "success", title: "Ready", detail: "Paste your JSON or select a sample to begin." });
  const [copied, setCopied] = useState(false);

  const parsedJson = useMemo(() => {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  }, [input]);

  const handleFormat = () => {
    try {
      if (!input.trim()) throw new Error("Please enter JSON to format.");
      const parsed = JSON.parse(input);
      const indentVal = indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setNotice({ type: "success", title: "Formatted Successfully", detail: `Formatted with ${indent === "tab" ? "tabs" : indent + " spaces"}.` });
    } catch (err: any) {
      setNotice({ type: "error", title: "Invalid JSON", detail: err.message });
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setNotice({ type: "success", title: "Minified Successfully", detail: `${Math.max(0, input.length - minified.length)} characters removed.` });
    } catch (err: any) {
      setNotice({ type: "error", title: "Invalid JSON", detail: err.message });
    }
  };

  const handleSortKeys = (recursive = false) => {
    try {
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed, recursive);
      const indentVal = indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(sorted, null, indentVal));
      setNotice({ type: "success", title: recursive ? "Keys Sorted Recursively" : "Top Keys Sorted", detail: "Object properties sorted alphabetically." });
    } catch (err: any) {
      setNotice({ type: "error", title: "Invalid JSON", detail: err.message });
    }
  };

  const handleRemoveNulls = () => {
    try {
      const parsed = JSON.parse(input);
      const cleaned = removeNullValues(parsed);
      const indentVal = indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(cleaned, null, indentVal));
      setNotice({ type: "success", title: "Null Values Removed", detail: "All null properties have been stripped." });
    } catch (err: any) {
      setNotice({ type: "error", title: "Invalid JSON", detail: err.message });
    }
  };

  const handleRemoveEmpties = () => {
    try {
      const parsed = JSON.parse(input);
      const cleaned = removeEmptyValues(parsed);
      const indentVal = indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(cleaned, null, indentVal));
      setNotice({ type: "success", title: "Empty Values Removed", detail: "Stripped empty strings, empty arrays & empty objects." });
    } catch (err: any) {
      setNotice({ type: "error", title: "Invalid JSON", detail: err.message });
    }
  };

  const handleEscapeUnescape = (mode: "escape" | "unescape") => {
    if (mode === "escape") {
      setOutput(JSON.stringify(input));
    } else {
      try {
        setOutput(JSON.parse(input));
      } catch {
        setNotice({ type: "error", title: "Unescape Error", detail: "Input is not a valid escaped string." });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInput(text);
        try {
          const parsed = JSON.parse(text);
          setOutput(JSON.stringify(parsed, null, Number(indent)));
          setNotice({ type: "success", title: "File Loaded", detail: `${file.name} loaded and formatted.` });
        } catch {
          setNotice({ type: "error", title: "File Read Error", detail: "Uploaded file contains invalid JSON." });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleEvaluatePath = () => {
    if (!parsedJson) return;
    try {
      const keys = jsonPath.replace(/^\$\.?/, "").split(".");
      let curr: any = parsedJson;
      for (const k of keys) {
        if (!k) continue;
        curr = curr?.[k];
      }
      setPathResult(JSON.stringify(curr, null, 2) ?? "undefined");
    } catch {
      setPathResult("Error evaluating path");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="json-tool" style={{ display: "grid", gap: 16 }}>
      {/* Primary Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select onChange={e => setInput(samples[e.target.value] || input)} style={{ padding: "6px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 13 }}>
            <option value="simple">Sample: Simple</option>
            <option value="nested">Sample: Nested Object</option>
            <option value="array">Sample: Array of Objects</option>
          </select>
          <label style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="file" size={14} /> Upload JSON
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: "none" }} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Indent:</span>
          <select value={indent} onChange={e => setIndent(e.target.value)} style={{ padding: "4px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12 }}>
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
          </select>

          <button onClick={handleFormat} className="btn-primary" style={{ padding: "6px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            Format <kbd style={{ fontSize: 10, opacity: 0.8 }}>⌘↵</kbd>
          </button>
          <button onClick={handleMinify} style={{ padding: "6px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 13, cursor: "pointer" }}>
            Minify
          </button>
          <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ padding: "6px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--accent)", fontSize: 13, cursor: "pointer" }}>
            {showAdvanced ? "Hide Options ▲" : "Advanced Options ▾"}
          </button>
        </div>
      </div>

      {/* Advanced Tools Panel */}
      {showAdvanced && (
        <div style={{ padding: 16, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div>
            <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Key Transformations</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={() => handleSortKeys(false)} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Sort Keys (Top Level)</button>
              <button onClick={() => handleSortKeys(true)} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Sort Keys (Recursively)</button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Cleanup & Filtering</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={handleRemoveNulls} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Remove Null Values</button>
              <button onClick={handleRemoveEmpties} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Remove Empty Strings & Objects</button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>String Escaping</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={() => handleEscapeUnescape("escape")} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Escape JSON String</button>
              <button onClick={() => handleEscapeUnescape("unescape")} style={{ padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, textAlign: "left", cursor: "pointer" }}>Unescape String to JSON</button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 6 }}>JSON Path Inspection</span>
            <div style={{ display: "flex", gap: 6 }}>
              <input type="text" value={jsonPath} onChange={e => setJsonPath(e.target.value)} placeholder="$.user.name" style={{ flex: 1, padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12 }} />
              <button onClick={handleEvaluatePath} style={{ padding: "4px 8px", background: "var(--accent)", border: "none", borderRadius: 6, color: "#fff", fontSize: 12, cursor: "pointer" }}>Eval</button>
            </div>
            {pathResult && <div style={{ marginTop: 6, fontSize: 12, fontFamily: "monospace", color: "var(--accent)", wordBreak: "break-all" }}>{pathResult}</div>}
          </div>
        </div>
      )}

      {/* Editor Main Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Input Pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>JSON Input</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{input.length.toLocaleString()} chars</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); handleFormat(); } }}
            placeholder="Paste raw JSON here..."
            rows={16}
            style={{ width: "100%", padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5, resize: "vertical", whiteSpace: lineWrap ? "pre-wrap" : "pre" }}
          />
        </div>

        {/* Output Pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Output</span>
              <div style={{ display: "flex", background: "var(--surface-sunken)", borderRadius: 4, border: "1px solid var(--line)", padding: 2 }}>
                {(["code", "tree", "raw"] as ViewMode[]).map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: "2px 8px", fontSize: 11, textTransform: "capitalize", background: viewMode === mode ? "var(--surface)" : "none", border: "none", borderRadius: 3, color: viewMode === mode ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copyToClipboard} style={{ padding: "4px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 4, color: "var(--text)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name={copied ? "check" : "copy"} size={13} /> {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={downloadFile} style={{ padding: "4px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 4, color: "var(--text)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="download" size={13} /> Download
              </button>
            </div>
          </div>

          {viewMode === "code" && (
            <textarea
              readOnly
              value={output}
              rows={16}
              style={{ width: "100%", padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5, resize: "vertical", whiteSpace: lineWrap ? "pre-wrap" : "pre" }}
            />
          )}

          {viewMode === "raw" && (
            <pre style={{ width: "100%", height: 360, padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, overflow: "auto", wordBreak: "break-all" }}>
              {output}
            </pre>
          )}

          {viewMode === "tree" && (
            <div style={{ width: "100%", height: 360, padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, overflow: "auto" }}>
              {parsedJson ? <TreeView data={parsedJson} /> : <span style={{ color: "var(--muted)", fontSize: 13 }}>Invalid JSON for tree view</span>}
            </div>
          )}
        </div>
      </div>

      {/* Status Notice */}
      <div style={{ padding: "10px 14px", background: notice.type === "error" ? "rgba(239, 68, 68, 0.1)" : "var(--surface)", border: `1px solid ${notice.type === "error" ? "var(--error)" : "var(--line)"}`, borderRadius: 6, display: "flex", alignItems: "center", gap: 10 }}>
        <Icon name="check" size={16} style={{ color: notice.type === "error" ? "var(--error)" : "var(--accent)" }} />
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "block" }}>{notice.title}</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{notice.detail}</span>
        </div>
      </div>
    </section>
  );
}

// Simple Tree View helper
function TreeView({ data, name = "root" }: { data: any; name?: string }) {
  const [open, setOpen] = useState(true);
  const isObject = data !== null && typeof data === "object";

  if (!isObject) {
    return (
      <div style={{ marginLeft: 16, fontSize: 12, fontFamily: "monospace" }}>
        <span style={{ color: "var(--muted)" }}>{name}: </span>
        <span style={{ color: typeof data === "string" ? "#10b981" : typeof data === "number" ? "#3b82f6" : "#f59e0b" }}>{JSON.stringify(data)}</span>
      </div>
    );
  }

  const entries = Object.entries(data);
  return (
    <div style={{ marginLeft: 12, fontSize: 12, fontFamily: "monospace" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", color: "var(--accent)", display: "flex", alignItems: "center", gap: 4 }}>
        <span>{open ? "▼" : "▶"}</span>
        <span style={{ fontWeight: 600 }}>{name}</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>({Array.isArray(data) ? `${data.length} items` : `${entries.length} keys`})</span>
      </div>
      {open && (
        <div style={{ borderLeft: "1px dashed var(--line)", marginLeft: 6, paddingLeft: 6 }}>
          {entries.map(([k, v]) => (
            <TreeView key={k} data={v} name={k} />
          ))}
        </div>
      )}
    </div>
  );
}
