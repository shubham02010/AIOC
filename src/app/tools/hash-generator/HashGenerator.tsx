"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";

// Pure JS MD5 implementation for client-side hashing
function md5(string: string): string {
  function add32(a: number, b: number) {
    return (a + b) & 0xFFFFFFFF;
  }

  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364409);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[12], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[10], 6, 1700485571);
    d = ii(d, a, b, c, k[15], 10, -1894980168);
    c = ii(c, d, a, b, k[4], 15, -1051523);
    b = ii(b, c, d, a, k[9], 21, -2054922799);
    a = ii(a, b, c, d, k[14], 6, 1873313359);
    d = ii(d, a, b, c, k[3], 10, -30611744);
    c = ii(c, d, a, b, k[8], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[2], 6, -145523070);
    d = ii(d, a, b, c, k[7], 10, -1120210379);
    c = ii(c, d, a, b, k[12], 15, 718787259);
    b = ii(b, c, d, a, k[5], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function md51(s: string) {
    const n = s.length, state = [1732584193, -271733879, -1732584194, 271733878];
    let i: number;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    const tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }
  function md5blk(s: string) {
    const md5blks = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  const hex_chr = '0123456789abcdef'.split('');
  function rhex(n: number) {
    let s = '', j = 0;
    for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
  }
  function hex(x: number[]) {
    let i = 0;
    for (; i < x.length; i++) x[i] = Number(rhex(x[i]));
    return x.join('');
  }
  const blocks = md51(string);
  return rhex(blocks[0]) + rhex(blocks[1]) + rhex(blocks[2]) + rhex(blocks[3]);
}

async function webCryptoHash(algo: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGenerator() {
  const [input, setInput] = useState("AIOC Tool Platform 2026");
  const [uppercase, setUppercase] = useState(false);
  const [hashes, setHashes] = useState({ sha256: "", sha512: "", sha1: "", md5: "" });
  const [copiedKey, setCopiedKey] = useState("");

  useEffect(() => {
    let active = true;
    async function compute() {
      if (!input) {
        setHashes({ sha256: "", sha512: "", sha1: "", md5: "" });
        return;
      }
      const [sha256, sha512, sha1] = await Promise.all([
        webCryptoHash("SHA-256", input),
        webCryptoHash("SHA-512", input),
        webCryptoHash("SHA-1", input)
      ]);
      const md5Hash = md5(input);
      if (active) {
        setHashes({
          sha256: uppercase ? sha256.toUpperCase() : sha256,
          sha512: uppercase ? sha512.toUpperCase() : sha512,
          sha1: uppercase ? sha1.toUpperCase() : sha1,
          md5: uppercase ? md5Hash.toUpperCase() : md5Hash
        });
      }
    }
    compute();
    return () => { active = false; };
  }, [input, uppercase]);

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1600);
    } catch {
      // fallback
    }
  };

  return (
    <section className="json-tool" aria-label="Hash Generator tool">
      <div className="tool-controls">
        <div className="control-group">
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, cursor: "pointer" }}>
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
            <span>Uppercase Hash Output</span>
          </label>
        </div>
        <div className="tool-action-group">
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>Clear</button>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-panel" style={{ minHeight: 110 }}>
          <div className="editor-header"><span>Input Text</span><span>{input.length} chars</span></div>
          <textarea
            className="code-editor"
            style={{ height: 80 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text to compute cryptographic hashes..."
            spellCheck="false"
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {[
          { key: "sha256", title: "SHA-256 (256-bit Secure Hash Algorithm)", val: hashes.sha256 },
          { key: "sha512", title: "SHA-512 (512-bit Secure Hash Algorithm)", val: hashes.sha512 },
          { key: "sha1", title: "SHA-1 (160-bit Legacy Hash)", val: hashes.sha1 },
          { key: "md5", title: "MD5 (128-bit Digest)", val: hashes.md5 },
        ].map((item) => (
          <div key={item.key} className="editor-panel" style={{ minHeight: 70 }}>
            <div className="editor-header">
              <span>{item.title}</span>
              <div className="output-actions">
                <button type="button" onClick={() => copy(item.val, item.key)} disabled={!item.val}>
                  {copiedKey === item.key ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                  {copiedKey === item.key ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div style={{ padding: "10px 12px", fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)", wordBreak: "break-all" }}>
              {item.val || <span style={{ color: "var(--faint)" }}>Compute output...</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
