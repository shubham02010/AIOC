"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

type MatchResult = {
  index: number;
  match: string;
  groups: string[];
};

const templates: Record<string, { pattern: string; flags: string; sample: string; desc: string }> = {
  email: {
    pattern: "([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
    flags: "gi",
    sample: "Reach out at contact@aioc.dev or support@company.org.",
    desc: "Extract Email Addresses"
  },
  url: {
    pattern: "https?://[a-zA-Z0-9.-]+(?:\\:[0-9]+)?(?:/[^\\s]*)?",
    flags: "gi",
    sample: "Visit https://aioc.dev/tools or http://localhost:3000 for local dev.",
    desc: "Extract Web URLs"
  },
  ipv4: {
    pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b",
    flags: "g",
    sample: "Server connected at 192.168.1.1 and backup gateway 10.0.0.254.",
    desc: "IPv4 IP Addresses"
  },
  uuid: {
    pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
    flags: "gi",
    sample: "Session token: 0b258c9b-79e0-4fcc-bdc4-8b31b6bb50cf initialized.",
    desc: "UUID v4 Strings"
  }
};

export function RegexTester() {
  const [pattern, setPattern] = useState(templates.email.pattern);
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false, u: false });
  const [testText, setTestText] = useState(templates.email.sample);
  const [replaceText, setReplaceText] = useState("[REDACTED]");
  const [mode, setMode] = useState<"match" | "replace">("match");

  const flagStr = useMemo(() => {
    return Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join("");
  }, [flags]);

  const { matches, error, replacedText } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", replacedText: testText };
    try {
      const regex = new RegExp(pattern, flagStr);
      const results: MatchResult[] = [];
      let replaced = testText;

      if (flags.g) {
        let match: RegExpExecArray | null;
        let limit = 0;
        while ((match = regex.exec(testText)) !== null && limit < 500) {
          results.push({
            index: match.index,
            match: match[0],
            groups: match.slice(1)
          });
          if (match[0].length === 0) regex.lastIndex++;
          limit++;
        }
        replaced = testText.replace(regex, replaceText);
      } else {
        const match = regex.exec(testText);
        if (match) {
          results.push({
            index: match.index,
            match: match[0],
            groups: match.slice(1)
          });
          replaced = testText.replace(regex, replaceText);
        }
      }
      return { matches: results, error: "", replacedText: replaced };
    } catch (err) {
      return { matches: [], error: err instanceof Error ? err.message : "Invalid regular expression.", replacedText: testText };
    }
  }, [pattern, flagStr, testText, replaceText, flags.g]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const applyTemplate = (key: string) => {
    const t = templates[key];
    if (t) {
      setPattern(t.pattern);
      setTestText(t.sample);
      setFlags({
        g: t.flags.includes("g"),
        i: t.flags.includes("i"),
        m: t.flags.includes("m"),
        s: t.flags.includes("s"),
        u: t.flags.includes("u")
      });
    }
  };

  const escapeString = () => {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    setPattern(escaped);
  };

  return (
    <section className="json-tool" style={{ display: "grid", gap: 16 }}>
      {/* Templates & Quick Presets */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Preset Library:</span>
          <select onChange={e => applyTemplate(e.target.value)} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12 }}>
            {Object.entries(templates).map(([k, t]) => (
              <option key={k} value={k}>{t.desc}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={escapeString} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
            Escape String Special Chars
          </button>
          <div style={{ display: "flex", background: "var(--surface-sunken)", borderRadius: 4, border: "1px solid var(--line)", padding: 2 }}>
            <button onClick={() => setMode("match")} style={{ padding: "2px 10px", fontSize: 11, background: mode === "match" ? "var(--surface)" : "none", border: "none", borderRadius: 3, color: mode === "match" ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}>
              Match Mode
            </button>
            <button onClick={() => setMode("replace")} style={{ padding: "2px 10px", fontSize: 11, background: mode === "replace" ? "var(--surface)" : "none", border: "none", borderRadius: 3, color: mode === "replace" ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}>
              Replace Mode
            </button>
          </div>
        </div>
      </div>

      {/* Pattern Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", background: "var(--surface-sunken)", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--line)" }}>
        <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace" }}>/</span>
        <input
          type="text"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          placeholder="Regex pattern..."
          style={{ flex: 1, minWidth: 200, padding: "6px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace", fontSize: 13 }}
        />
        <span style={{ fontSize: 13, color: "var(--muted)", fontFamily: "monospace" }}>/{flagStr}</span>

        {/* Flag Checkboxes */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["g", "i", "m", "s", "u"] as const).map(flag => (
            <label key={flag} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontFamily: "monospace", cursor: "pointer", color: "var(--text)" }}>
              <input type="checkbox" checked={flags[flag]} onChange={() => toggleFlag(flag)} />
              {flag}
            </label>
          ))}
        </div>
      </div>

      {/* Replace Bar if Replace Mode */}
      {mode === "replace" && (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Replace with:</span>
          <input
            type="text"
            value={replaceText}
            onChange={e => setReplaceText(e.target.value)}
            placeholder="Replacement string or $1..."
            style={{ flex: 1, padding: "6px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
      )}

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Test Text Pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Test Text</span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{testText.length} chars</span>
          </div>
          <textarea
            value={testText}
            onChange={e => setTestText(e.target.value)}
            rows={12}
            placeholder="Paste text to run regex test..."
            style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5 }}
          />
        </div>

        {/* Results Pane */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
              {mode === "match" ? `Matches Found (${matches.length})` : "Replacement Output"}
            </span>
          </div>

          {error ? (
            <div style={{ padding: 14, background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error)", borderRadius: 8, color: "var(--error)", fontSize: 13 }}>
              {error}
            </div>
          ) : mode === "replace" ? (
            <textarea
              readOnly
              value={replacedText}
              rows={12}
              style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--accent)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5 }}
            />
          ) : matches.length === 0 ? (
            <div style={{ padding: 20, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--muted)", fontSize: 13, textAlign: "center" }}>
              No matches found for current pattern.
            </div>
          ) : (
            <div style={{ height: 280, padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, overflow: "auto", display: "grid", gap: 10 }}>
              {matches.map((m, idx) => (
                <div key={idx} style={{ padding: "8px 12px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                    <span>Match #{idx + 1} (index {m.index})</span>
                    <span style={{ color: "var(--accent)" }}>{m.match.length} chars</span>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 13, color: "var(--text)", wordBreak: "break-all" }}>
                    &quot;{m.match}&quot;
                  </div>
                  {m.groups.length > 0 && (
                    <div style={{ marginTop: 6, display: "grid", gap: 2 }}>
                      {m.groups.map((g, gIdx) => (
                        <div key={gIdx} style={{ fontSize: 11, fontFamily: "monospace", color: "var(--muted)" }}>
                          Group ${gIdx + 1}: <span style={{ color: "var(--accent)" }}>&quot;{g}&quot;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
