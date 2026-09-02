"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

const defaultHeader = `{
  "alg": "HS256",
  "typ": "JWT"
}`;

const defaultPayload = `{
  "sub": "user_10293",
  "name": "Alex Smith",
  "role": "developer",
  "iat": ${Math.floor(Date.now() / 1000)},
  "exp": ${Math.floor(Date.now() / 1000) + 3600}
}`;

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlEncodeStr(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return base64UrlEncodeBytes(bytes);
}

export function JwtGenerator() {
  const [header, setHeader] = useState(defaultHeader);
  const [payload, setPayload] = useState(defaultPayload);
  const [secret, setSecret] = useState("aioc-secret-key-2026");
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    async function generateToken() {
      try {
        const parsedHeader = JSON.parse(header);
        const parsedPayload = JSON.parse(payload);
        const encodedHeader = base64UrlEncodeStr(JSON.stringify(parsedHeader));
        const encodedPayload = base64UrlEncodeStr(JSON.stringify(parsedPayload));
        const signingInput = `${encodedHeader}.${encodedPayload}`;

        const secretBytes = new TextEncoder().encode(secret);
        const key = await crypto.subtle.importKey(
          "raw",
          secretBytes,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const signatureBuffer = await crypto.subtle.sign(
          "HMAC",
          key,
          new TextEncoder().encode(signingInput)
        );
        const encodedSignature = base64UrlEncodeBytes(new Uint8Array(signatureBuffer));

        if (active) {
          setJwt(`${signingInput}.${encodedSignature}`);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Invalid JSON header or payload.");
          setJwt("");
        }
      }
    }
    generateToken();
    return () => { active = false; };
  }, [header, payload, secret]);

  const copy = async () => {
    if (!jwt) return;
    try {
      await navigator.clipboard.writeText(jwt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="JWT Generator tool">
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">Algorithm: <strong style={{ color: "var(--accent)" }}>HS256 (HMAC-SHA256)</strong></span>
        </div>
        <div className="tool-action-group">
          <button
            className="button button-quiet"
            type="button"
            onClick={() => {
              const now = Math.floor(Date.now() / 1000);
              setPayload(`{\n  "sub": "user_${Math.floor(Math.random() * 10000)}",\n  "iat": ${now},\n  "exp": ${now + 3600}\n}`);
            }}
          >
            Refresh Claims
          </button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="editor-panel">
          <div className="editor-header"><span>Header JSON</span></div>
          <textarea className="code-editor" style={{ height: 120 }} value={header} onChange={(e) => setHeader(e.target.value)} spellCheck="false" />
        </div>
        <div className="editor-panel">
          <div className="editor-header"><span>Payload JSON</span></div>
          <textarea className="code-editor" style={{ height: 120 }} value={payload} onChange={(e) => setPayload(e.target.value)} spellCheck="false" />
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <div className="editor-header" style={{ border: "1px solid var(--line)", borderRadius: "6px 6px 0 0", padding: "8px 12px", background: "var(--surface-sunken)" }}>
          <span style={{ fontSize: 11, color: "var(--text-soft)" }}>Secret Key (HMAC SHA-256)</span>
        </div>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key..."
          style={{ width: "100%", padding: "10px 12px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderTop: 0, borderRadius: "0 0 6px 6px", color: "var(--text)", fontFamily: "var(--mono)", fontSize: 12, outline: 0 }}
        />
      </div>

      <div className="editor-panel output-panel" style={{ marginTop: 12, minHeight: 140 }}>
        <div className="editor-header">
          <span>Generated JWT Token</span>
          <div className="output-actions">
            <button type="button" onClick={copy} disabled={!jwt}>{copied ? <Icon name="check" size={15} /> : <Icon name="copy" size={15} />}{copied ? "Copied" : "Copy Token"}</button>
          </div>
        </div>
        {error ? (
          <div style={{ padding: 15, color: "var(--danger)", fontSize: 12, fontFamily: "var(--mono)" }}>Error: {error}</div>
        ) : (
          <pre className="code-output" style={{ color: "var(--accent)" }}>{jwt}</pre>
        )}
      </div>
    </section>
  );
}
