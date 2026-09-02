"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

const sampleA = `function greet(name) {
  console.log("Hello " + name);
  return true;
}`;

const sampleB = `function greet(name, title = "Developer") {
  console.log(\`Hello \${title} \${name}\`);
  return { success: true };
}`;

type DiffLine = {
  type: "add" | "remove" | "same";
  text: string;
  lineA?: number;
  lineB?: number;
};

function computeDiff(linesA: string[], linesB: string[]): DiffLine[] {
  const m = linesA.length;
  const n = linesB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m;
  let j = n;
  const result: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.unshift({ type: "same", text: linesA[i - 1], lineA: i, lineB: j });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: "add", text: linesB[j - 1], lineB: j });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      result.unshift({ type: "remove", text: linesA[i - 1], lineA: i });
      i--;
    }
  }

  return result;
}

export function DiffChecker() {
  const [textA, setTextA] = useState(sampleA);
  const [textB, setTextB] = useState(sampleB);
  const [viewMode, setViewMode] = useState<"unified" | "split">("unified");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [copied, setCopied] = useState(false);

  const diffResult = useMemo(() => {
    let linesA = textA.split("\n");
    let linesB = textB.split("\n");

    if (ignoreWhitespace) {
      linesA = linesA.map(l => l.trim());
      linesB = linesB.map(l => l.trim());
    }
    if (ignoreCase) {
      linesA = linesA.map(l => l.toLowerCase());
      linesB = linesB.map(l => l.toLowerCase());
    }

    return computeDiff(linesA, linesB);
  }, [textA, textB, ignoreWhitespace, ignoreCase]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    let same = 0;
    for (const d of diffResult) {
      if (d.type === "add") added++;
      else if (d.type === "remove") removed++;
      else same++;
    }
    return { added, removed, same, total: diffResult.length };
  }, [diffResult]);

  const swapInputs = () => {
    const temp = textA;
    setTextA(textB);
    setTextB(temp);
  };

  const copyDiffPatch = () => {
    const patch = diffResult
      .map(d => (d.type === "add" ? `+ ${d.text}` : d.type === "remove" ? `- ${d.text}` : `  ${d.text}`))
      .join("\n");
    navigator.clipboard.writeText(patch);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="json-tool" style={{ display: "grid", gap: 16 }}>
      {/* Header Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>+{stats.added} Additions</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--error)" }}>-{stats.removed} Deletions</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{stats.same} Unchanged</span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={swapInputs} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
            Swap Inputs (A ↔ B)
          </button>

          <div style={{ display: "flex", background: "var(--surface-sunken)", borderRadius: 4, border: "1px solid var(--line)", padding: 2 }}>
            <button onClick={() => setViewMode("unified")} style={{ padding: "2px 8px", fontSize: 11, background: viewMode === "unified" ? "var(--surface)" : "none", border: "none", borderRadius: 3, color: viewMode === "unified" ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}>
              Unified
            </button>
            <button onClick={() => setViewMode("split")} style={{ padding: "2px 8px", fontSize: 11, background: viewMode === "split" ? "var(--surface)" : "none", border: "none", borderRadius: 3, color: viewMode === "split" ? "var(--accent)" : "var(--muted)", cursor: "pointer" }}>
              Side-by-Side
            </button>
          </div>

          <button onClick={copyDiffPatch} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
            {copied ? "Copied Patch" : "Copy Patch"}
          </button>
        </div>
      </div>

      {/* Options Bar */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", background: "var(--surface-sunken)", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--line)" }}>
        <label style={{ fontSize: 12, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={ignoreWhitespace} onChange={e => setIgnoreWhitespace(e.target.checked)} />
          Ignore Leading/Trailing Whitespace
        </label>
        <label style={{ fontSize: 12, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={ignoreCase} onChange={e => setIgnoreCase(e.target.checked)} />
          Ignore Letter Case
        </label>
      </div>

      {/* Input Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Original (Text A)</span>
          <textarea
            value={textA}
            onChange={e => setTextA(e.target.value)}
            rows={10}
            placeholder="Original text..."
            style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Modified (Text B)</span>
          <textarea
            value={textB}
            onChange={e => setTextB(e.target.value)}
            rows={10}
            placeholder="Modified text..."
            style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, lineHeight: 1.5 }}
          />
        </div>
      </div>

      {/* Output View */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
          Diff View ({viewMode === "unified" ? "Unified Stream" : "Side-by-Side Comparison"})
        </span>

        {viewMode === "unified" ? (
          <div style={{ padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, fontFamily: "monospace", fontSize: 13, overflow: "auto", maxHeight: 360 }}>
            {diffResult.map((line, idx) => {
              const isAdd = line.type === "add";
              const isRemove = line.type === "remove";
              const bg = isAdd ? "rgba(16, 185, 129, 0.12)" : isRemove ? "rgba(239, 68, 68, 0.12)" : "transparent";
              const fg = isAdd ? "var(--accent)" : isRemove ? "var(--error)" : "var(--text)";
              const prefix = isAdd ? "+ " : isRemove ? "- " : "  ";
              return (
                <div key={idx} style={{ background: bg, color: fg, padding: "2px 8px", borderRadius: 3, whiteSpace: "pre-wrap" }}>
                  <span style={{ userSelect: "none", opacity: 0.5, marginRight: 8 }}>{prefix}</span>
                  {line.text}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, padding: 12, maxHeight: 360, overflow: "auto" }}>
            {/* Left Pane (A) */}
            <div style={{ fontFamily: "monospace", fontSize: 13 }}>
              {diffResult.filter(d => d.type !== "add").map((line, idx) => (
                <div key={idx} style={{ background: line.type === "remove" ? "rgba(239, 68, 68, 0.12)" : "transparent", color: line.type === "remove" ? "var(--error)" : "var(--text)", padding: "2px 6px" }}>
                  <span style={{ opacity: 0.4, marginRight: 8 }}>{line.lineA ?? ""}</span>
                  {line.text}
                </div>
              ))}
            </div>
            {/* Right Pane (B) */}
            <div style={{ fontFamily: "monospace", fontSize: 13 }}>
              {diffResult.filter(d => d.type !== "remove").map((line, idx) => (
                <div key={idx} style={{ background: line.type === "add" ? "rgba(16, 185, 129, 0.12)" : "transparent", color: line.type === "add" ? "var(--accent)" : "var(--text)", padding: "2px 6px" }}>
                  <span style={{ opacity: 0.4, marginRight: 8 }}>{line.lineB ?? ""}</span>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
