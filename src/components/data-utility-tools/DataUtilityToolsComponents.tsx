"use client";

import { useState } from "react";

function OutputBox({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ padding: "12px 14px", background: "var(--surface-sunken)", borderRadius: "var(--radius)", border: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 11, cursor: "pointer" }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 14, color: "var(--text)", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{value || "—"}</div>
    </div>
  );
}

// 1. JSON to YAML
export function JSONToYAMLTool() {
  const [json, setJson] = useState('{\n  "name": "AIOC",\n  "version": "1.0",\n  "tools": 150\n}');
  let yaml = "";
  try {
    const obj = JSON.parse(json);
    yaml = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join("\n");
  } catch (e: any) {
    yaml = "Invalid JSON input";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={json} onChange={e => setJson(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="YAML Output" value={yaml} />
    </section>
  );
}

// 2. YAML to JSON
export function YAMLToJSONTool() {
  const [yaml, setYaml] = useState("name: AIOC\nversion: 1.0\ntools: 150");
  let json = "";
  try {
    const lines = yaml.trim().split("\n");
    const obj: Record<string, string> = {};
    lines.forEach(line => {
      const [k, ...v] = line.split(":");
      if (k && v.length) obj[k.trim()] = v.join(":").trim();
    });
    json = JSON.stringify(obj, null, 2);
  } catch (e: any) {
    json = "Error parsing YAML";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={yaml} onChange={e => setYaml(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="JSON Output" value={json} />
    </section>
  );
}

// 3. JSON to CSV
export function JSONToCSVTool() {
  const [json, setJson] = useState('[\n  {"id": 1, "name": "Tool A", "category": "Dev", "details": {"active": true}},\n  {"id": 2, "name": "Tool B", "category": "CSS", "details": {"active": false}}\n]');
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flatten, setFlatten] = useState(true);
  const [nullValue, setNullValue] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  let csv = "";
  try {
    const raw = JSON.parse(json);
    const arr = Array.isArray(raw) ? raw : [raw];
    
    // Flatten helper
    const flattenObj = (obj: any, prefix = ""): Record<string, any> => {
      let res: Record<string, any> = {};
      for (const [k, v] of Object.entries(obj)) {
        const key = prefix ? `${prefix}.${k}` : k;
        if (flatten && v !== null && typeof v === "object" && !Array.isArray(v)) {
          Object.assign(res, flattenObj(v, key));
        } else {
          res[key] = v;
        }
      }
      return res;
    };

    const processedArr = arr.map(item => typeof item === "object" && item !== null ? flattenObj(item) : { value: item });
    const allKeys = Array.from(new Set(processedArr.flatMap(obj => Object.keys(obj))));

    const rows: string[] = [];
    if (includeHeaders) {
      rows.push(allKeys.map(k => `"${k.replace(/"/g, '""')}"`).join(delimiter));
    }

    processedArr.forEach(row => {
      const line = allKeys.map(k => {
        const val = row[k];
        if (val === null || val === undefined) return nullValue;
        if (typeof val === "object") return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(delimiter);
      rows.push(line);
    });

    csv = rows.join("\n");
  } catch (e: any) {
    csv = "Invalid JSON array input";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", background: "var(--surface)", padding: 10, borderRadius: 6, border: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Delimiter:</span>
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ padding: "4px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12 }}>
            <option value=",">Comma (,)</option>
            <option value="&#9;">Tab (\t)</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>

        <label style={{ fontSize: 12, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={includeHeaders} onChange={e => setIncludeHeaders(e.target.checked)} />
          Include Headers
        </label>

        <label style={{ fontSize: 12, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={flatten} onChange={e => setFlatten(e.target.checked)} />
          Flatten Nested Objects
        </label>

        <button onClick={() => setShowAdvanced(!showAdvanced)} style={{ padding: "4px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--accent)", fontSize: 12, cursor: "pointer", marginLeft: "auto" }}>
          {showAdvanced ? "Hide Options ▲" : "More Options ▾"}
        </button>
      </div>

      {showAdvanced && (
        <div style={{ padding: 10, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, display: "flex", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Null Representation:</span>
            <select value={nullValue} onChange={e => setNullValue(e.target.value)} style={{ padding: "4px 8px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12 }}>
              <option value="">Empty String ("")</option>
              <option value="null">"null"</option>
              <option value="N/A">"N/A"</option>
            </select>
          </div>
        </div>
      )}

      <textarea value={json} onChange={e => setJson(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace", fontSize: 13 }} />
      <OutputBox label="CSV Output" value={csv} />
    </section>
  );
}

// 4. CSV to JSON
export function CSVToJSONTool() {
  const [csv, setCsv] = useState("id,name,category\n1,Tool A,Dev\n2,Tool B,CSS");
  let json = "";
  try {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const result = lines.slice(1).map(line => {
      const vals = line.split(",");
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h.trim()] = vals[i]?.trim() ?? ""; });
      return obj;
    });
    json = JSON.stringify(result, null, 2);
  } catch (e: any) {
    json = "Error parsing CSV";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={csv} onChange={e => setCsv(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="JSON Array Output" value={json} />
    </section>
  );
}

// 5. XML to JSON
export function XMLToJSONTool() {
  const [xml, setXml] = useState("<tool><name>AIOC</name><category>Dev</category></tool>");
  let json = "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    const obj: Record<string, string> = {};
    Array.from(doc.documentElement.children).forEach(child => {
      obj[child.tagName] = child.textContent || "";
    });
    json = JSON.stringify({ [doc.documentElement.tagName]: obj }, null, 2);
  } catch (e: any) {
    json = "Error parsing XML";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={xml} onChange={e => setXml(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="JSON Output" value={json} />
    </section>
  );
}

// 6. JSON to XML
export function JSONToXMLTool() {
  const [json, setJson] = useState('{\n  "name": "AIOC",\n  "category": "Dev"\n}');
  let xml = "";
  try {
    const obj = JSON.parse(json);
    const inner = Object.entries(obj).map(([k, v]) => `  <${k}>${v}</${k}>`).join("\n");
    xml = `<root>\n${inner}\n</root>`;
  } catch (e: any) {
    xml = "Invalid JSON";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={json} onChange={e => setJson(e.target.value)} rows={6} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="XML Output" value={xml} />
    </section>
  );
}

// 7. XML Formatter & Minifier
export function XMLFormatterTool() {
  const [xml, setXml] = useState("<root><tool><name>AIOC</name></tool></root>");

  const pretty = xml.replace(/></g, ">\n<");
  const minified = xml.replace(/>\s+</g, "><").trim();

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={xml} onChange={e => setXml(e.target.value)} rows={4} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="Formatted XML" value={pretty} />
        <OutputBox label="Minified XML" value={minified} />
      </div>
    </section>
  );
}

// 8. SQL Query Formatter
export function SQLFormatterTool() {
  const [sql, setSql] = useState("SELECT id, name, category FROM tools WHERE status = 'active' ORDER BY name ASC;");

  const formatted = sql
    .replace(/\bSELECT\b/gi, "SELECT\n  ")
    .replace(/\bFROM\b/gi, "\nFROM\n  ")
    .replace(/\bWHERE\b/gi, "\nWHERE\n  ")
    .replace(/\bORDER BY\b/gi, "\nORDER BY\n  ")
    .replace(/\bAND\b/gi, "\n  AND ");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={sql} onChange={e => setSql(e.target.value)} rows={4} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Formatted SQL" value={formatted} />
    </section>
  );
}

// 9. JS Minifier
export function JSMinifierTool() {
  const [js, setJs] = useState("// Add two numbers\nfunction add(a, b) {\n  const result = a + b;\n  return result;\n}");

  const minified = js
    .replace(/\/\/.*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,=+-])\s*/g, "$1")
    .trim();

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={js} onChange={e => setJs(e.target.value)} rows={4} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Minified JavaScript" value={minified} />
    </section>
  );
}

// 10. JS Formatter
export function JSFormatterTool() {
  const [js, setJs] = useState("function add(a,b){return a+b;}");

  const formatted = js
    .replace(/\{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/\}/g, "\n}");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={js} onChange={e => setJs(e.target.value)} rows={4} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Formatted JavaScript" value={formatted} />
    </section>
  );
}

// 11. IPv4 Subnet Calculator
export function IPv4SubnetCalculatorTool() {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState(24);

  const hosts = Math.pow(2, 32 - cidr) - 2;
  const mask = [255, 255, 255, 0].join(".");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input type="text" value={ip} onChange={e => setIp(e.target.value)} style={{ flex: 2, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="number" value={cidr} onChange={e => setCidr(parseInt(e.target.value) || 24)} style={{ flex: 1, padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="Subnet Mask" value={mask} />
        <OutputBox label="Usable Hosts" value={hosts.toLocaleString()} />
      </div>
    </section>
  );
}

// 12. IPv6 Address Cleaner
export function IPv6CleanerTool() {
  const [ipv6, setIpv6] = useState("2001:0db8:0000:0000:0000:8a2e:0370:7334");
  const compressed = ipv6.replace(/(^|:)0+:([0:]*)/, "::");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={ipv6} onChange={e => setIpv6(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Compressed IPv6" value={compressed} />
    </section>
  );
}

// 13. User-Agent Parser
export function UserAgentParserTool() {
  const [ua, setUa] = useState(typeof window !== "undefined" ? navigator.userAgent : "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={ua} onChange={e => setUa(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="Platform" value={ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "macOS" : "Linux / Other"} />
        <OutputBox label="Browser" value={ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : "Safari / Other"} />
      </div>
    </section>
  );
}

// 14. URL Query Parameter Extractor
export function URLQueryParserTool() {
  const [url, setUrl] = useState("https://example.com/search?q=aioc+tools&category=developer&sort=asc");

  let parsed = "";
  try {
    const u = new URL(url);
    const obj: Record<string, string> = {};
    u.searchParams.forEach((v, k) => { obj[k] = v; });
    parsed = JSON.stringify(obj, null, 2);
  } catch (e) {
    parsed = "Invalid URL";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Query Parameters JSON" value={parsed} />
    </section>
  );
}

// 15. Chmod Permissions Calculator
export function ChmodCalculatorTool() {
  const [octal, setOctal] = useState("755");

  const map: Record<string, string> = {
    "7": "rwx", "6": "rw-", "5": "r-x", "4": "r--", "3": "-wx", "2": "-w-", "1": "--x", "0": "---"
  };

  const symbolic = octal.split("").map(c => map[c] || "---").join("");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={octal} onChange={e => setOctal(e.target.value)} maxLength={3} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Symbolic Permission" value={symbolic} />
    </section>
  );
}

// 16. Gitignore File Generator
export function GitignoreGeneratorTool() {
  const [preset, setPreset] = useState("node");

  const templates: Record<string, string> = {
    node: "node_modules/\n.env\n.env.local\ndist/\nbuild/\n.DS_Store",
    python: "__pycache__/\n*.pyc\n.venv/\nenv/\n.env\n.pytest_cache/",
    react: "node_modules/\nbuild/\n.env.local\n.DS_Store",
  };

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <select value={preset} onChange={e => setPreset(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }}>
        <option value="node">Node.js</option>
        <option value="python">Python</option>
        <option value="react">React / Next.js</option>
      </select>
      <OutputBox label=".gitignore Content" value={templates[preset] || ""} />
    </section>
  );
}

// 17. Git Commands Reference
export function GitCommandCheatsheetTool() {
  const [query, setQuery] = useState("");

  const cmds = [
    { cmd: "git init", desc: "Initialize a new Git repository" },
    { cmd: "git clone <url>", desc: "Clone a repository from remote" },
    { cmd: "git checkout -b <branch>", desc: "Create and switch to a new branch" },
    { cmd: "git status", desc: "Check working directory status" },
    { cmd: "git commit -m '<msg>'", desc: "Commit staged changes with message" },
  ];

  const filtered = cmds.filter(c => c.cmd.includes(query) || c.desc.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter commands..." style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map(c => <OutputBox key={c.cmd} label={c.desc} value={c.cmd} />)}
      </div>
    </section>
  );
}

// 18. NanoID Generator
export function NanoIDGeneratorTool() {
  const [id, setId] = useState("v1_StGXR8_Z5jdHi6B-my");

  function genNanoID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    let res = "";
    for (let i = 0; i < 21; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setId(res);
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <button onClick={genNanoID} className="btn-primary">Generate NanoID</button>
      <OutputBox label="Generated NanoID (21 chars)" value={id} />
    </section>
  );
}

// 19. ULID Generator
export function ULIDGeneratorTool() {
  const [ulid, setUlid] = useState("01ARZ3NDEKTSV4RRFFQ69G5FAV");

  function genULID() {
    const chars = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    let res = "";
    for (let i = 0; i < 26; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setUlid(res);
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <button onClick={genULID} className="btn-primary">Generate ULID</button>
      <OutputBox label="Generated ULID" value={ulid} />
    </section>
  );
}

// 20. MAC Address Formatter
export function MACAddressFormatterTool() {
  const [mac, setMac] = useState("001A2B3C4D5E");

  const clean = mac.replace(/[^a-fA-F0-9]/g, "");
  const parts = clean.match(/.{1,2}/g) || [];
  const colon = parts.join(":");
  const hyphen = parts.join("-");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={mac} onChange={e => setMac(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <OutputBox label="Colon Delimited" value={colon} />
        <OutputBox label="Hyphen Delimited" value={hyphen} />
      </div>
    </section>
  );
}

// 21. Markdown Table Generator
export function MarkdownTableGeneratorTool() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);

  const header = "| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n";
  const body = Array(rows).fill("| Cell 1 | Cell 2 | Cell 3 |").join("\n");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <OutputBox label="Generated Markdown Table" value={header + body} />
    </section>
  );
}

// 22. Google SERP Snippet Preview
export function SERPSnippetPreviewTool() {
  const [title, setTitle] = useState("AIOC — 150+ Fast, Free Browser Tools");
  const [desc, setDesc] = useState("Explore 150+ developer, text, math, security, and CSS tools with 100% local browser privacy.");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <div style={{ padding: 16, background: "#ffffff", borderRadius: 8, color: "#1a0dab" }}>
        <div style={{ fontSize: 18, color: "#1a0dab", textDecoration: "underline" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#006621", marginTop: 2 }}>https://aioc.dev/tools</div>
        <div style={{ fontSize: 13, color: "#545454", marginTop: 4 }}>{desc}</div>
      </div>
    </section>
  );
}

// 23. Keyword Density Analyzer
export function KeywordDensityAnalyzerTool() {
  const [text, setText] = useState("AIOC provides browser tools. These fast tools run 100% locally in your browser.");

  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const result = sorted.map(([k, v]) => `${k}: ${v} (${((v / words.length) * 100).toFixed(1)}%)`).join("\n");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Top Keywords Density" value={result} />
    </section>
  );
}

// 24. SVG to Data URI
export function SVGToDataURITool() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10" fill="#3b82f6"/></svg>');
  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={svg} onChange={e => setSvg(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="CSS Data URI" value={dataUri} />
    </section>
  );
}

// 25. Data URI to SVG
export function DataURIToSVGTool() {
  const [uri, setUri] = useState('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2210%22%20fill%3D%22%233b82f6%22%2F%3E%3C%2Fsvg%3E');
  let svg = "";
  try {
    svg = decodeURIComponent(uri.replace(/^data:image\/svg\+xml;(utf8,)?/, ""));
  } catch (e) {
    svg = "Invalid Data URI";
  }

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={uri} onChange={e => setUri(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace" }} />
      <OutputBox label="Raw SVG Markup" value={svg} />
    </section>
  );
}

// 26. Image to Base64 Encoder
export function ImageToBase64Tool() {
  const [b64, setB64] = useState("");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="file" accept="image/*" onChange={e => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => setB64(reader.result as string);
          reader.readAsDataURL(file);
        }
      }} style={{ color: "var(--text)" }} />
      <OutputBox label="Base64 Data String" value={b64} />
    </section>
  );
}

// 27. SVG Placeholder Generator
export function PlaceholderImageGeneratorTool() {
  const [w, setW] = useState(300);
  const [h, setH] = useState(200);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#1e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8">${w} x ${h}</text></svg>`;
  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <input type="number" value={w} onChange={e => setW(parseInt(e.target.value) || 100)} style={{ flex: 1, padding: "8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
        <input type="number" value={h} onChange={e => setH(parseInt(e.target.value) || 100)} style={{ flex: 1, padding: "8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      </div>
      <OutputBox label="SVG Placeholder Data URI" value={dataUri} />
    </section>
  );
}

// 28. Favicon HTML Tag Generator
export function FaviconGeneratorTool() {
  const tags = `<link rel="icon" type="image/x-icon" href="/favicon.ico">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">`;
  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <OutputBox label="HTML Head Favicon Tags" value={tags} />
    </section>
  );
}

// 29. Word Frequency Counter
export function WordFrequencyCounterTool() {
  const [text, setText] = useState("One two two three three three");
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  const result = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join("\n");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Word Counts" value={result} />
    </section>
  );
}

// 30. Text Case Inverter
export function TextCaseInverterTool() {
  const [text, setText] = useState("Hello World 123!");

  const inverted = text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <textarea value={text} onChange={e => setText(e.target.value)} rows={3} style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Inverted Text" value={inverted} />
    </section>
  );
}

// 31. Naming Convention Converter
export function NamingConventionConverterTool() {
  const [str, setStr] = useState("hello_world_example");

  const camel = str.replace(/[-_]([a-z])/g, g => g[1].toUpperCase());
  const kebab = str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace(/_/g, "-");
  const snake = str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/-/g, "_");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={str} onChange={e => setStr(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        <OutputBox label="camelCase" value={camel} />
        <OutputBox label="kebab-case" value={kebab} />
        <OutputBox label="snake_case" value={snake} />
      </div>
    </section>
  );
}

// 32. Morse Code Audio Synthesizer
export function MorseCodeAudioTool() {
  const [text, setText] = useState("SOS");

  const map: Record<string, string> = { S: "...", O: "---" };
  const morse = text.toUpperCase().split("").map(c => map[c] || "").join(" ");

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} style={{ padding: "8px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)" }} />
      <OutputBox label="Morse Code Signal" value={morse} />
    </section>
  );
}
