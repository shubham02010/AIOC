"use client";

import { useState } from "react";
import { TextToolLayout } from "@/components/TextToolLayout";
import { Icon } from "@/components/Icon";

// 1. Base64URL Encoder / Decoder
export function Base64URLTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  return (
    <TextToolLayout
      title="Base64URL Encoder / Decoder"
      description="Encode and decode Base64URL."
      category="security"
      initialInput="Hello AIOC! 🚀"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className={`button ${mode === "encode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("encode")}>Encode</button>
          <button type="button" className={`button ${mode === "decode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("decode")}>Decode</button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        try {
          if (mode === "encode") {
            const b64 = btoa(unescape(encodeURIComponent(text)));
            return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
          } else {
            let b64 = text.replace(/-/g, "+").replace(/_/g, "/");
            while (b64.length % 4) b64 += "=";
            return decodeURIComponent(escape(atob(b64)));
          }
        } catch { return "Error: Invalid input for this mode."; }
      }}
    />
  );
}

// 2. Hex Encoder / Decoder
export function HexEncoderDecoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  return (
    <TextToolLayout
      title="Hex Encoder / Decoder" description="Convert between text and hex." category="security" initialInput="AIOC"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className={`button ${mode === "encode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("encode")}>Text → Hex</button>
          <button type="button" className={`button ${mode === "decode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("decode")}>Hex → Text</button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        try {
          if (mode === "encode") return Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2, "0")).join(" ");
          else return new TextDecoder().decode(new Uint8Array(text.trim().split(/\s+/).map(h => parseInt(h, 16))));
        } catch { return "Error: Invalid input."; }
      }}
    />
  );
}

// 3. Binary Encoder / Decoder
export function BinaryEncoderDecoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  return (
    <TextToolLayout
      title="Binary Encoder / Decoder" description="Convert text to binary and back." category="security" initialInput="AIOC"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className={`button ${mode === "encode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("encode")}>Text → Binary</button>
          <button type="button" className={`button ${mode === "decode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("decode")}>Binary → Text</button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        try {
          if (mode === "encode") return text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
          else return text.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join("");
        } catch { return "Error: Invalid input."; }
      }}
    />
  );
}

// 4. Unicode Escape / Decoder
export function UnicodeEscapeDecoderTool() {
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  return (
    <TextToolLayout
      title="Unicode Escape / Decoder" description="Escape text to \\uXXXX and decode." category="security" initialInput="AIOC 🌍"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className={`button ${mode === "escape" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("escape")}>Escape</button>
          <button type="button" className={`button ${mode === "unescape" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("unescape")}>Unescape</button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        try {
          if (mode === "escape") return Array.from(text).map(c => { const cp = c.codePointAt(0)!; return cp > 127 ? `\\u{${cp.toString(16)}}` : c; }).join("");
          // eslint-disable-next-line no-eval
          else return text.replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        } catch { return "Error: Invalid input."; }
      }}
    />
  );
}

// 5. ROT13 Cipher
export function ROT13CipherTool() {
  return (
    <TextToolLayout
      title="ROT13 Cipher" description="Apply the ROT13 substitution cipher." category="security" initialInput="Hello World!"
      transform={(text) => text.replace(/[a-zA-Z]/g, c => { const base = c <= "Z" ? 65 : 97; return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base); })}
    />
  );
}

// 6. Caesar Cipher
export function CaesarCipherTool() {
  const [shift, setShift] = useState(3);
  return (
    <TextToolLayout
      title="Caesar Cipher" description="Shift letters by a configurable offset." category="security" initialInput="Hello World!"
      controls={
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Shift:</span>
          <input type="number" min={-25} max={25} value={shift} onChange={e => setShift(parseInt(e.target.value) || 0)}
            style={{ width: 50, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
        </div>
      }
      transform={(text) => text.replace(/[a-zA-Z]/g, c => { const base = c <= "Z" ? 65 : 97; return String.fromCharCode(((c.charCodeAt(0) - base + ((shift % 26) + 26)) % 26) + base); })}
    />
  );
}

// 7. Morse Code Encoder / Decoder
const MORSE: Record<string, string> = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", " ": "/" };
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export function MorseCodeTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  return (
    <TextToolLayout
      title="Morse Code" description="Convert text to Morse code and back." category="security" initialInput="SOS AIOC"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className={`button ${mode === "encode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("encode")}>Text → Morse</button>
          <button type="button" className={`button ${mode === "decode" ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setMode("decode")}>Morse → Text</button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        if (mode === "encode") return text.toUpperCase().split("").map(c => MORSE[c] || c).join(" ");
        else return text.trim().split(" ").map(c => MORSE_REV[c] || c).join("");
      }}
    />
  );
}

// 8. Password Generator
export function PasswordGeneratorTool() {
  const [length, setLength] = useState(20);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [count, setCount] = useState(5);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const chars = upper + lower + digits + (includeSymbols ? symbols : "");
    const arr = new Uint32Array(length * count);
    crypto.getRandomValues(arr);
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      let pw = "";
      for (let j = 0; j < length; j++) pw += chars[arr[i * length + j] % chars.length];
      result.push(pw);
    }
    setPasswords(result);
  };

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <div className="control-group" style={{ gap: 10 }}>
          <span className="control-label">Length:</span>
          <input type="number" min={4} max={128} value={length} onChange={e => setLength(parseInt(e.target.value) || 16)}
            style={{ width: 55, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          <button type="button" className={`button ${includeSymbols ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setIncludeSymbols(!includeSymbols)}>Symbols: {includeSymbols ? "ON" : "OFF"}</button>
          <span className="control-label">Count:</span>
          <input type="number" min={1} max={20} value={count} onChange={e => setCount(parseInt(e.target.value) || 5)}
            style={{ width: 45, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
        </div>
        <button className="button button-primary" type="button" onClick={generate}><Icon name="refresh" size={14} /> Generate</button>
      </div>
      <div className="editor-panel" style={{ minHeight: 220 }}>
        <div className="editor-header"><span>Generated Passwords</span></div>
        <textarea className="code-editor" value={passwords.length ? passwords.join("\n") : "Click Generate to create passwords."} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 9. Passphrase Generator
const WORDS = ["alpha","bravo","charlie","delta","echo","foxtrot","gamma","hotel","india","juliet","kilo","lima","mike","november","oscar","papa","quebec","romeo","sierra","tango","uniform","victor","whiskey","xray","yankee","zulu","anchor","bridge","canyon","desert","ember","flint","glacier","harbor","island","jungle","kinetic","lantern","meadow","nebula","orbit","prism","quartz","ripple","summit","timber","umbra","vortex","willow","zenith","azure","beacon","coral","dune","eclipse","falcon","grove","horizon","ivory","jasper","kelp","lumen","mist","nova","opal","peak","quill","raven","slate","thorn","unity","vale","wave","apex","bloom","crest","drift","fern","glow","haze","inlet","jade","knot","leaf","marsh","nectar","onyx","pulse","reef","spark","trail","vault","wisp","dawn","flux","grain","husk","iron","lake"];

export function PassphraseGeneratorTool() {
  const [wordCount, setWordCount] = useState(5);
  const [separator, setSeparator] = useState("-");
  const [phrases, setPhrases] = useState<string[]>([]);

  const generate = () => {
    const arr = new Uint32Array(wordCount * 5);
    crypto.getRandomValues(arr);
    const result: string[] = [];
    for (let i = 0; i < 5; i++) {
      const words: string[] = [];
      for (let j = 0; j < wordCount; j++) words.push(WORDS[arr[i * wordCount + j] % WORDS.length]);
      result.push(words.join(separator));
    }
    setPhrases(result);
  };

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <div className="control-group" style={{ gap: 10 }}>
          <span className="control-label">Words per phrase:</span>
          <input type="number" min={3} max={10} value={wordCount} onChange={e => setWordCount(parseInt(e.target.value) || 5)}
            style={{ width: 45, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          <span className="control-label">Separator:</span>
          <input type="text" value={separator} onChange={e => setSeparator(e.target.value)}
            style={{ width: 35, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)", textAlign: "center" }} />
        </div>
        <button className="button button-primary" type="button" onClick={generate}><Icon name="refresh" size={14} /> Generate</button>
      </div>
      <div className="editor-panel" style={{ minHeight: 200 }}>
        <div className="editor-header"><span>Generated Passphrases</span></div>
        <textarea className="code-editor" value={phrases.length ? phrases.join("\n") : "Click Generate to create passphrases."} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 10. Random String Generator
export function RandomStringGeneratorTool() {
  const [length, setLength] = useState(32);
  const [charset, setCharset] = useState<"alphanum" | "hex" | "alpha" | "numeric">("alphanum");
  const [strings, setStrings] = useState<string[]>([]);

  const charsets: Record<string, string> = {
    alphanum: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    hex: "0123456789abcdef",
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
  };

  const generate = () => {
    const chars = charsets[charset];
    const arr = new Uint32Array(length * 5);
    crypto.getRandomValues(arr);
    const result: string[] = [];
    for (let i = 0; i < 5; i++) {
      let s = "";
      for (let j = 0; j < length; j++) s += chars[arr[i * length + j] % chars.length];
      result.push(s);
    }
    setStrings(result);
  };

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <div className="control-group" style={{ gap: 8 }}>
          <span className="control-label">Length:</span>
          <input type="number" min={1} max={256} value={length} onChange={e => setLength(parseInt(e.target.value) || 32)}
            style={{ width: 55, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          {(["alphanum", "hex", "alpha", "numeric"] as const).map(c => (
            <button key={c} type="button" className={`button ${charset === c ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "3px 7px", minHeight: 26 }} onClick={() => setCharset(c)}>{c}</button>
          ))}
        </div>
        <button className="button button-primary" type="button" onClick={generate}><Icon name="refresh" size={14} /> Generate</button>
      </div>
      <div className="editor-panel" style={{ minHeight: 200 }}>
        <div className="editor-header"><span>Generated Strings</span></div>
        <textarea className="code-editor" value={strings.length ? strings.join("\n") : "Click Generate to create random strings."} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 11. HMAC Generator
export function HMACGeneratorTool() {
  const [key, setKey] = useState("my-secret-key");
  const [message, setMessage] = useState("Hello AIOC");
  const [algo, setAlgo] = useState<"SHA-256" | "SHA-512">("SHA-256");
  const [result, setResult] = useState("");

  const generate = async () => {
    try {
      const enc = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: algo }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
      setResult(Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join(""));
    } catch { setResult("Error generating HMAC."); }
  };

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <div className="control-group" style={{ gap: 8 }}>
          <span className="control-label">Algorithm:</span>
          {(["SHA-256", "SHA-512"] as const).map(a => (
            <button key={a} type="button" className={`button ${algo === a ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setAlgo(a)}>{a}</button>
          ))}
        </div>
        <button className="button button-primary" type="button" onClick={generate}><Icon name="shield-check" size={14} /> Generate HMAC</button>
      </div>
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header"><span>Secret Key</span></div>
          <textarea className="code-editor" value={key} onChange={e => setKey(e.target.value)} spellCheck="false" placeholder="Enter secret key..." />
        </div>
        <div className="editor-panel">
          <div className="editor-header"><span>Message</span></div>
          <textarea className="code-editor" value={message} onChange={e => setMessage(e.target.value)} spellCheck="false" placeholder="Enter message to sign..." />
        </div>
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 80 }}>
        <div className="editor-header"><span>HMAC Output ({algo})</span></div>
        <textarea className="code-editor" value={result || "Click Generate to compute HMAC."} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 12. Luhn / Credit Card Validator
export function LuhnValidatorTool() {
  return (
    <TextToolLayout
      title="Luhn / Credit Card Validator" description="Validate using the Luhn algorithm." category="security" initialInput="4532015112830366"
      transform={(text) => {
        const digits = text.replace(/\D/g, "");
        if (!digits) return "Enter a number to validate.";
        let sum = 0;
        let alt = false;
        for (let i = digits.length - 1; i >= 0; i--) {
          let n = parseInt(digits[i], 10);
          if (alt) { n *= 2; if (n > 9) n -= 9; }
          sum += n;
          alt = !alt;
        }
        const valid = sum % 10 === 0;
        return [`Input: ${digits}`, `Digits: ${digits.length}`, `Checksum: ${sum}`, `Valid: ${valid ? "✅ YES (Luhn check passes)" : "❌ NO (Luhn check fails)"}`].join("\n");
      }}
    />
  );
}

// 13. IBAN Validator
export function IBANValidatorTool() {
  return (
    <TextToolLayout
      title="IBAN Validator" description="Validate IBAN with mod-97 check." category="security" initialInput="GB29 NWBK 6016 1331 9268 19"
      transform={(text) => {
        const iban = text.replace(/\s/g, "").toUpperCase();
        if (iban.length < 5) return "Enter an IBAN to validate.";
        const rearranged = iban.slice(4) + iban.slice(0, 4);
        const numeric = rearranged.replace(/[A-Z]/g, c => String(c.charCodeAt(0) - 55));
        let remainder = numeric;
        while (remainder.length > 2) {
          const block = remainder.slice(0, 9);
          remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
        }
        const valid = parseInt(remainder, 10) % 97 === 1;
        return [`IBAN: ${iban}`, `Country: ${iban.slice(0, 2)}`, `Check Digits: ${iban.slice(2, 4)}`, `Length: ${iban.length}`, `Valid: ${valid ? "✅ YES (mod-97 passes)" : "❌ NO (mod-97 fails)"}`].join("\n");
      }}
    />
  );
}

// 14. ISBN Validator
export function ISBNValidatorTool() {
  return (
    <TextToolLayout
      title="ISBN Validator" description="Validate ISBN-10 and ISBN-13." category="security" initialInput="978-0-306-40615-7"
      transform={(text) => {
        const clean = text.replace(/[-\s]/g, "");
        if (clean.length === 10) {
          let sum = 0;
          for (let i = 0; i < 9; i++) sum += parseInt(clean[i], 10) * (10 - i);
          const check = clean[9] === "X" ? 10 : parseInt(clean[9], 10);
          sum += check;
          return [`ISBN-10: ${clean}`, `Checksum: ${sum}`, `Valid: ${sum % 11 === 0 ? "✅ YES" : "❌ NO"}`].join("\n");
        } else if (clean.length === 13) {
          let sum = 0;
          for (let i = 0; i < 13; i++) sum += parseInt(clean[i], 10) * (i % 2 === 0 ? 1 : 3);
          return [`ISBN-13: ${clean}`, `Checksum: ${sum}`, `Valid: ${sum % 10 === 0 ? "✅ YES" : "❌ NO"}`].join("\n");
        }
        return "Enter a valid 10 or 13-digit ISBN.";
      }}
    />
  );
}

// 15. Random Number Generator
export function RandomNumberGeneratorTool() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(10);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const arr = new Uint32Array(count);
    crypto.getRandomValues(arr);
    setNumbers(Array.from(arr).map(n => min + (n % (max - min + 1))));
  };

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <div className="control-group" style={{ gap: 8 }}>
          <span className="control-label">Min:</span>
          <input type="number" value={min} onChange={e => setMin(parseInt(e.target.value) || 0)} style={{ width: 60, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          <span className="control-label">Max:</span>
          <input type="number" value={max} onChange={e => setMax(parseInt(e.target.value) || 100)} style={{ width: 60, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          <span className="control-label">Count:</span>
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(parseInt(e.target.value) || 10)} style={{ width: 50, fontSize: 11, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
        </div>
        <button className="button button-primary" type="button" onClick={generate}><Icon name="refresh" size={14} /> Generate</button>
      </div>
      <div className="editor-panel" style={{ minHeight: 160 }}>
        <div className="editor-header"><span>Random Numbers ({min}–{max})</span></div>
        <textarea className="code-editor" value={numbers.length ? numbers.join("\n") : "Click Generate to create random numbers."} readOnly spellCheck="false" />
      </div>
    </section>
  );
}
