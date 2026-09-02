"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";

const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFJT0MgRGV2ZWxvcGVyIiwiYWRtaW4iOnRydWUsImlhdCI6MTY3MjUxMjAwMCwiZXhwIjoxNzk4NzYxNjAwLCJpc3MiOiJodHRwczovL2Fpb2MuZGV2In0.SignaturePlaceholderHere";

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function timeAgoOrIn(epochSec: number): string {
  const diffSec = Math.floor(epochSec - Date.now() / 1000);
  const abs = Math.abs(diffSec);
  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const mins = Math.floor((abs % 3600) / 60);

  let timeStr = "";
  if (days > 0) timeStr = `${days}d ${hours}h`;
  else if (hours > 0) timeStr = `${hours}h ${mins}m`;
  else timeStr = `${mins}m`;

  return diffSec >= 0 ? `In ${timeStr}` : `${timeStr} ago`;
}

export function JwtDecoder() {
  const [token, setToken] = useState(sampleToken);
  const [activeTab, setActiveTab] = useState<"decoded" | "table" | "base64">("decoded");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      return { error: "A valid JWT must contain 3 parts separated by dots (Header.Payload.Signature)." };
    }
    try {
      const headerObj = JSON.parse(base64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(base64UrlDecode(parts[1]));
      const signatureStr = parts[2];

      const exp = typeof payloadObj.exp === "number" ? payloadObj.exp : undefined;
      const iat = typeof payloadObj.iat === "number" ? payloadObj.iat : undefined;
      const nbf = typeof payloadObj.nbf === "number" ? payloadObj.nbf : undefined;

      const isExpired = exp ? Date.now() > exp * 1000 : false;

      return {
        headerObj,
        payloadObj,
        signatureStr,
        exp,
        iat,
        nbf,
        isExpired,
        rawHeader: parts[0],
        rawPayload: parts[1],
        rawSignature: parts[2],
      };
    } catch (e: any) {
      return { error: e.message || "Failed to decode Base64URL string." };
    }
  }, [token]);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <section className="json-tool" style={{ display: "grid", gap: 16 }}>
      {/* Header Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Status:</span>
          {decoded?.error ? (
            <span style={{ padding: "2px 8px", background: "rgba(239, 68, 68, 0.15)", color: "var(--error)", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>Invalid JWT</span>
          ) : decoded ? (
            <span style={{ padding: "2px 8px", background: decoded.isExpired ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)", color: decoded.isExpired ? "var(--error)" : "var(--accent)", borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
              {decoded.isExpired ? "Expired Token" : "Active Token"}
            </span>
          ) : (
            <span style={{ fontSize: 12, color: "var(--muted)" }}>No Token</span>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setToken("")} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>Clear</button>
          <button onClick={() => setToken(sampleToken)} style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 12, cursor: "pointer" }}>Load Sample</button>
        </div>
      </div>

      {/* Encoded JWT Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Encoded Token</span>
        <textarea
          value={token}
          onChange={e => setToken(e.target.value)}
          rows={3}
          placeholder="Paste JWT string (eyJhbGci...)"
          style={{ width: "100%", padding: 12, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--text)", fontFamily: "monospace", fontSize: 13, wordBreak: "break-all" }}
        />
      </div>

      {decoded?.error ? (
        <div style={{ padding: 12, background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error)", borderRadius: 6, color: "var(--error)", fontSize: 13 }}>
          <strong>JWT Parse Error:</strong> {decoded.error}
        </div>
      ) : decoded ? (
        <div style={{ display: "grid", gap: 16 }}>
          {/* View Tabs */}
          <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
            {(["decoded", "table", "base64"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "6px 14px",
                  background: activeTab === tab ? "var(--surface)" : "none",
                  border: activeTab === tab ? "1px solid var(--line)" : "none",
                  borderRadius: 6,
                  color: activeTab === tab ? "var(--accent)" : "var(--muted)",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? 600 : 400
                }}
              >
                {tab === "decoded" ? "Decoded JSON" : tab === "table" ? "Claims Table" : "Raw Base64 Parts"}
              </button>
            ))}
          </div>

          {/* Tab 1: Decoded JSON split */}
          {activeTab === "decoded" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
              {/* Header Pane */}
              <div style={{ padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)" }}>HEADER (Algorithm & Type)</span>
                  <button onClick={() => copyText(JSON.stringify(decoded.headerObj, null, 2), "hdr")} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 11, cursor: "pointer" }}>
                    {copiedKey === "hdr" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 13, color: "var(--text)", overflow: "auto" }}>
                  {JSON.stringify(decoded.headerObj, null, 2)}
                </pre>
              </div>

              {/* Payload Pane */}
              <div style={{ padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6" }}>PAYLOAD (Claims & Data)</span>
                  <button onClick={() => copyText(JSON.stringify(decoded.payloadObj, null, 2), "pld")} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 11, cursor: "pointer" }}>
                    {copiedKey === "pld" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 13, color: "var(--text)", overflow: "auto" }}>
                  {JSON.stringify(decoded.payloadObj, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Claims Table */}
          {activeTab === "table" && (
            <div style={{ padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 8, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>
                    <th style={{ padding: 8 }}>Claim</th>
                    <th style={{ padding: 8 }}>Value</th>
                    <th style={{ padding: 8 }}>Human Description / Expiration</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(decoded.payloadObj).map(([key, val]) => {
                    let desc = "Custom Claim";
                    if (key === "sub") desc = "Subject (User ID)";
                    if (key === "iss") desc = "Issuer Domain";
                    if (key === "aud") desc = "Audience";
                    if (key === "exp" && typeof val === "number") desc = `Expires: ${new Date(val * 1000).toLocaleString()} (${timeAgoOrIn(val)})`;
                    if (key === "iat" && typeof val === "number") desc = `Issued At: ${new Date(val * 1000).toLocaleString()} (${timeAgoOrIn(val)})`;
                    if (key === "nbf" && typeof val === "number") desc = `Not Before: ${new Date(val * 1000).toLocaleString()}`;

                    return (
                      <tr key={key} style={{ borderBottom: "1px solid var(--line)" }}>
                        <td style={{ padding: 8, fontFamily: "monospace", fontWeight: 600, color: "var(--accent)" }}>{key}</td>
                        <td style={{ padding: 8, fontFamily: "monospace" }}>{JSON.stringify(val)}</td>
                        <td style={{ padding: 8, color: "var(--muted)", fontSize: 12 }}>{desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Raw Base64 Parts */}
          {activeTab === "base64" && (
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ padding: 10, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Raw Base64 Header</span>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text)", wordBreak: "break-all", marginTop: 4 }}>{decoded.rawHeader}</div>
              </div>
              <div style={{ padding: 10, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Raw Base64 Payload</span>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text)", wordBreak: "break-all", marginTop: 4 }}>{decoded.rawPayload}</div>
              </div>
              <div style={{ padding: 10, background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase" }}>Raw Signature String</span>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text)", wordBreak: "break-all", marginTop: 4 }}>{decoded.rawSignature}</div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
