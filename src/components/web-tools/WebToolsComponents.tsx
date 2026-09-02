"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

// Helper for CSS tool slider inputs
function Slider({ label, value, onChange, min = 0, max = 100, unit = "px" }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; unit?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 70 }}>{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
      <span style={{ fontSize: 11, color: "var(--text-soft)", minWidth: 45, textAlign: "right" }}>{value}{unit}</span>
    </div>
  );
}

function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="editor-panel" style={{ marginTop: 10, minHeight: 80 }}>
      <div className="editor-header">
        <span>CSS Output</span>
        <div className="output-actions">
          <button type="button" onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
            {copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}
          </button>
        </div>
      </div>
      <textarea className="code-editor" value={code} readOnly spellCheck="false" style={{ minHeight: 60 }} />
    </div>
  );
}

// 1. CSS Box Shadow Generator
export function CSSBoxShadowTool() {
  const [h, setH] = useState(4);
  const [v, setV] = useState(4);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);

  const rgba = `${color}${Math.round(opacity * 2.55).toString(16).padStart(2, "0")}`;
  const shadow = `${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${rgba}`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <Slider label="Offset X" value={h} onChange={setH} min={-50} max={50} />
          <Slider label="Offset Y" value={v} onChange={setV} min={-50} max={50} />
          <Slider label="Blur" value={blur} onChange={setBlur} max={100} />
          <Slider label="Spread" value={spread} onChange={setSpread} min={-50} max={50} />
          <Slider label="Opacity" value={opacity} onChange={setOpacity} max={100} unit="%" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 70 }}>Color</span>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            <button type="button" className={`button ${inset ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "3px 8px", minHeight: 24 }} onClick={() => setInset(!inset)}>Inset: {inset ? "ON" : "OFF"}</button>
          </div>
        </div>
        <div style={{ display: "grid", placeItems: "center", background: "var(--surface-sunken)", borderRadius: "var(--radius)", minHeight: 200 }}>
          <div style={{ width: 180, height: 120, borderRadius: 12, background: "var(--accent)", boxShadow: shadow }} />
        </div>
      </div>
      <CopyBlock code={`box-shadow: ${shadow};`} />
    </section>
  );
}

// 2. CSS Border Radius Generator
export function CSSBorderRadiusTool() {
  const [tl, setTL] = useState(12);
  const [tr, setTR] = useState(12);
  const [br, setBR] = useState(12);
  const [bl, setBL] = useState(12);

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <Slider label="Top Left" value={tl} onChange={setTL} max={100} />
          <Slider label="Top Right" value={tr} onChange={setTR} max={100} />
          <Slider label="Bottom Right" value={br} onChange={setBR} max={100} />
          <Slider label="Bottom Left" value={bl} onChange={setBL} max={100} />
        </div>
        <div style={{ display: "grid", placeItems: "center", background: "var(--surface-sunken)", borderRadius: "var(--radius)", minHeight: 200 }}>
          <div style={{ width: 180, height: 120, borderRadius: radius, background: "var(--accent)" }} />
        </div>
      </div>
      <CopyBlock code={`border-radius: ${radius};`} />
    </section>
  );
}

// 3. CSS Gradient Generator
export function CSSGradientTool() {
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<{ color: string; pos: number }[]>([
    { color: "#9ef0c5", pos: 0 },
    { color: "#3b82f6", pos: 50 },
    { color: "#b9c7ff", pos: 100 }
  ]);

  const presetGradients = [
    { name: "Emerald Cyber", type: "linear", angle: 135, stops: [{ color: "#10b981", pos: 0 }, { color: "#064e3b", pos: 100 }] },
    { name: "Neon Sunset", type: "linear", angle: 90, stops: [{ color: "#f43f5e", pos: 0 }, { color: "#8b5cf6", pos: 100 }] },
    { name: "Conic Radar", type: "conic", angle: 0, stops: [{ color: "#3b82f6", pos: 0 }, { color: "#1e1b4b", pos: 100 }] },
    { name: "Deep Space", type: "radial", angle: 0, stops: [{ color: "#1e293b", pos: 0 }, { color: "#0f172a", pos: 100 }] }
  ];

  const sortedStops = [...stops].sort((a, b) => a.pos - b.pos);
  const stopStr = sortedStops.map(s => `${s.color} ${s.pos}%`).join(", ");

  const gradient = type === "linear"
    ? `linear-gradient(${angle}deg, ${stopStr})`
    : type === "radial"
    ? `radial-gradient(circle, ${stopStr})`
    : `conic-gradient(from ${angle}deg, ${stopStr})`;

  const addStop = () => {
    if (stops.length < 5) {
      setStops([...stops, { color: "#8b5cf6", pos: 75 }]);
    }
  };

  const removeStop = (idx: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== idx));
    }
  };

  const updateStop = (idx: number, key: "color" | "pos", val: any) => {
    const copy = [...stops];
    copy[idx] = { ...copy[idx], [key]: val };
    setStops(copy);
  };

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      {/* Presets Gallery */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>Presets:</span>
        {presetGradients.map(p => (
          <button
            key={p.name}
            onClick={() => {
              setType(p.type as any);
              setAngle(p.angle);
              setStops(p.stops);
            }}
            style={{ padding: "4px 10px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 6, color: "var(--text)", fontSize: 11, cursor: "pointer" }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 12 }}>
          {/* Type Selector */}
          <div style={{ display: "flex", gap: 6 }}>
            {(["linear", "radial", "conic"] as const).map(t => (
              <button key={t} type="button" className={`button ${type === t ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 10px", minHeight: 28 }} onClick={() => setType(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {(type === "linear" || type === "conic") && (
            <Slider label="Angle" value={angle} onChange={setAngle} max={360} unit="°" />
          )}

          {/* Color Stops Controls */}
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Color Stops ({stops.length}/5)</span>
              <button onClick={addStop} disabled={stops.length >= 5} style={{ padding: "2px 8px", background: "var(--surface-sunken)", border: "1px solid var(--line)", borderRadius: 4, color: "var(--accent)", fontSize: 11, cursor: "pointer" }}>
                + Add Stop
              </button>
            </div>

            {stops.map((s, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface-sunken)", padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)" }}>
                <input type="color" value={s.color} onChange={e => updateStop(idx, "color", e.target.value)} />
                <Slider label={`Stop ${idx + 1}`} value={s.pos} onChange={v => updateStop(idx, "pos", v)} max={100} unit="%" />
                {stops.length > 2 && (
                  <button onClick={() => removeStop(idx)} style={{ background: "none", border: "none", color: "var(--error)", fontSize: 12, cursor: "pointer" }}>✕</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Box */}
        <div style={{ background: gradient, borderRadius: 12, minHeight: 220, border: "1px solid var(--line)", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }} />
      </div>

      <CopyBlock code={`background: ${gradient};`} />
    </section>
  );
}

// 4. CSS Glassmorphism Generator
export function CSSGlassmorphismTool() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(20);
  const [border, setBorder] = useState(1);

  const bg = `rgba(255, 255, 255, ${(opacity / 100).toFixed(2)})`;
  const css = `background: ${bg};\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: ${border}px solid rgba(255, 255, 255, 0.18);\nborder-radius: 16px;`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <Slider label="Blur" value={blur} onChange={setBlur} max={30} />
          <Slider label="Opacity" value={opacity} onChange={setOpacity} max={100} unit="%" />
          <Slider label="Border" value={border} onChange={setBorder} max={5} />
        </div>
        <div style={{ display: "grid", placeItems: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "var(--radius)", minHeight: 200, position: "relative" }}>
          <div style={{ width: 180, height: 120, borderRadius: 16, background: bg, backdropFilter: `blur(${blur}px)`, border: `${border}px solid rgba(255,255,255,0.18)` }} />
        </div>
      </div>
      <CopyBlock code={css} />
    </section>
  );
}

// 5. CSS Transform Generator
export function CSSTransformTool() {
  const [rotateZ, setRotateZ] = useState(0);
  const [scaleX, setScaleX] = useState(100);
  const [scaleY, setScaleY] = useState(100);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [skewX, setSkewX] = useState(0);

  const transform = `rotate(${rotateZ}deg) scale(${(scaleX / 100).toFixed(2)}, ${(scaleY / 100).toFixed(2)}) translate(${translateX}px, ${translateY}px) skewX(${skewX}deg)`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <Slider label="Rotate" value={rotateZ} onChange={setRotateZ} min={-180} max={180} unit="°" />
          <Slider label="Scale X" value={scaleX} onChange={setScaleX} min={10} max={200} unit="%" />
          <Slider label="Scale Y" value={scaleY} onChange={setScaleY} min={10} max={200} unit="%" />
          <Slider label="Move X" value={translateX} onChange={setTranslateX} min={-100} max={100} />
          <Slider label="Move Y" value={translateY} onChange={setTranslateY} min={-100} max={100} />
          <Slider label="Skew X" value={skewX} onChange={setSkewX} min={-45} max={45} unit="°" />
        </div>
        <div style={{ display: "grid", placeItems: "center", background: "var(--surface-sunken)", borderRadius: "var(--radius)", minHeight: 200, overflow: "hidden" }}>
          <div style={{ width: 100, height: 100, borderRadius: 12, background: "var(--accent)", transform, transition: "transform .15s" }} />
        </div>
      </div>
      <CopyBlock code={`transform: ${transform};`} />
    </section>
  );
}

// 6. CSS Flexbox Playground
export function CSSFlexboxTool() {
  const [dir, setDir] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState(10);

  const css = `display: flex;\nflex-direction: ${dir};\njustify-content: ${justify};\nalign-items: ${alignItems};\nflex-wrap: ${wrap};\ngap: ${gap}px;`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "var(--muted)", width: "100%" }}>Direction</span>
            {["row", "column", "row-reverse", "column-reverse"].map(d => (
              <button key={d} type="button" className={`button ${dir === d ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "2px 6px", minHeight: 22 }} onClick={() => setDir(d)}>{d}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "var(--muted)", width: "100%" }}>Justify</span>
            {["flex-start", "center", "flex-end", "space-between", "space-around"].map(j => (
              <button key={j} type="button" className={`button ${justify === j ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "2px 6px", minHeight: 22 }} onClick={() => setJustify(j)}>{j}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "var(--muted)", width: "100%" }}>Align Items</span>
            {["stretch", "flex-start", "center", "flex-end", "baseline"].map(a => (
              <button key={a} type="button" className={`button ${alignItems === a ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "2px 6px", minHeight: 22 }} onClick={() => setAlignItems(a)}>{a}</button>
            ))}
          </div>
          <Slider label="Gap" value={gap} onChange={setGap} max={40} />
        </div>
        <div style={{ display: "flex", flexDirection: dir as React.CSSProperties["flexDirection"], justifyContent: justify, alignItems, flexWrap: wrap as React.CSSProperties["flexWrap"], gap, background: "var(--surface-sunken)", borderRadius: "var(--radius)", minHeight: 200, padding: 12 }}>
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ padding: "12px 20px", borderRadius: 8, background: "var(--accent)", color: "var(--accent-ink)", fontSize: 13, fontWeight: 700 }}>{n}</div>
          ))}
        </div>
      </div>
      <CopyBlock code={css} />
    </section>
  );
}

// 7. CSS Grid Generator
export function CSSGridTool() {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(10);

  const css = `display: grid;\ngrid-template-columns: repeat(${cols}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngap: ${gap}px;`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 8 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <Slider label="Columns" value={cols} onChange={setCols} min={1} max={8} unit="" />
          <Slider label="Rows" value={rows} onChange={setRows} min={1} max={6} unit="" />
          <Slider label="Gap" value={gap} onChange={setGap} max={40} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap, background: "var(--surface-sunken)", borderRadius: "var(--radius)", minHeight: 200, padding: 12 }}>
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} style={{ borderRadius: 6, background: "var(--accent)", display: "grid", placeItems: "center", color: "var(--accent-ink)", fontSize: 12, fontWeight: 700, minHeight: 30 }}>{i + 1}</div>
          ))}
        </div>
      </div>
      <CopyBlock code={css} />
    </section>
  );
}

// 8. CSS Clamp Generator
export function CSSClampTool() {
  const [minVal, setMinVal] = useState(16);
  const [preferred, setPreferred] = useState(4);
  const [maxVal, setMaxVal] = useState(32);

  const css = `font-size: clamp(${minVal}px, ${preferred}vw, ${maxVal}px);`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        <Slider label="Min (px)" value={minVal} onChange={setMinVal} min={8} max={48} />
        <Slider label="Preferred (vw)" value={preferred} onChange={setPreferred} min={1} max={10} unit="vw" />
        <Slider label="Max (px)" value={maxVal} onChange={setMaxVal} min={16} max={72} />
        <div style={{ padding: 24, background: "var(--surface-sunken)", borderRadius: "var(--radius)", textAlign: "center" }}>
          <span style={{ fontSize: `clamp(${minVal}px, ${preferred}vw, ${maxVal}px)`, fontWeight: 700, color: "var(--text)" }}>AIOC Fluid Text</span>
        </div>
      </div>
      <CopyBlock code={css} />
    </section>
  );
}

// 9. CSS Minifier
export function CSSMinifierTool() {
  const [input, setInput] = useState("body {\n  margin: 0;\n  padding: 0;\n  /* Reset all margins */\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}");
  const [copied, setCopied] = useState(false);

  const minified = input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <span className="control-label">Original: {input.length} chars → Minified: {minified.length} chars ({Math.round((1 - minified.length / Math.max(input.length, 1)) * 100)}% saved)</span>
      </div>
      <div className="editor-grid">
        <div className="editor-panel"><div className="editor-header"><span>CSS Input</span></div><textarea className="code-editor" value={input} onChange={e => setInput(e.target.value)} spellCheck="false" /></div>
        <div className="editor-panel"><div className="editor-header"><span>Minified Output</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(minified); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div><textarea className="code-editor" value={minified} readOnly spellCheck="false" /></div>
      </div>
    </section>
  );
}

// 10. CSS Formatter / Beautifier
export function CSSFormatterTool() {
  const [input, setInput] = useState("body{margin:0;padding:0}.container{max-width:1200px;margin:0 auto}");
  const [copied, setCopied] = useState(false);

  const formatted = input
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/  \n}/g, "\n}")
    .trim();

  return (
    <section className="json-tool">
      <div className="editor-grid">
        <div className="editor-panel"><div className="editor-header"><span>Minified CSS</span></div><textarea className="code-editor" value={input} onChange={e => setInput(e.target.value)} spellCheck="false" /></div>
        <div className="editor-panel"><div className="editor-header"><span>Formatted CSS</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(formatted); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div><textarea className="code-editor" value={formatted} readOnly spellCheck="false" /></div>
      </div>
    </section>
  );
}

// 11. HTML Formatter / Beautifier
export function HTMLFormatterTool() {
  const [input, setInput] = useState("<div><p>Hello</p><span>World</span></div>");
  const [copied, setCopied] = useState(false);

  const format = (html: string): string => {
    let indent = 0;
    return html
      .replace(/>\s*</g, ">\n<")
      .split("\n")
      .map(line => {
        const trimmed = line.trim();
        if (/^<\//.test(trimmed)) indent--;
        const result = "  ".repeat(Math.max(indent, 0)) + trimmed;
        if (/^<[^/!][^>]*[^/]>$/.test(trimmed) && !/^<(br|hr|img|input|meta|link)/.test(trimmed)) indent++;
        return result;
      })
      .join("\n");
  };

  const formatted = format(input);

  return (
    <section className="json-tool">
      <div className="editor-grid">
        <div className="editor-panel"><div className="editor-header"><span>HTML Input</span></div><textarea className="code-editor" value={input} onChange={e => setInput(e.target.value)} spellCheck="false" /></div>
        <div className="editor-panel"><div className="editor-header"><span>Formatted HTML</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(formatted); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div><textarea className="code-editor" value={formatted} readOnly spellCheck="false" /></div>
      </div>
    </section>
  );
}

// 12. HTML Minifier
export function HTMLMinifierTool() {
  const [input, setInput] = useState("<div>\n  <p>Hello World</p>\n  <!-- comment -->\n  <span>Test</span>\n</div>");
  const [copied, setCopied] = useState(false);

  const minified = input.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();

  return (
    <section className="json-tool">
      <div className="tool-controls">
        <span className="control-label">Original: {input.length} chars → Minified: {minified.length} chars ({Math.round((1 - minified.length / Math.max(input.length, 1)) * 100)}% saved)</span>
      </div>
      <div className="editor-grid">
        <div className="editor-panel"><div className="editor-header"><span>HTML Input</span></div><textarea className="code-editor" value={input} onChange={e => setInput(e.target.value)} spellCheck="false" /></div>
        <div className="editor-panel"><div className="editor-header"><span>Minified Output</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(minified); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div><textarea className="code-editor" value={minified} readOnly spellCheck="false" /></div>
      </div>
    </section>
  );
}

// 13. Meta Tag Generator
export function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("My Awesome Website");
  const [desc, setDesc] = useState("A description of my website for search engines.");
  const [keywords, setKeywords] = useState("website, awesome, seo");
  const [author, setAuthor] = useState("AIOC");
  const [copied, setCopied] = useState(false);

  const output = `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="keywords" content="${keywords}">\n<meta name="author" content="${author}">`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        {[["Title", title, setTitle], ["Description", desc, setDesc], ["Keywords", keywords, setKeywords], ["Author", author, setAuthor]].map(([label, val, setter]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 80 }}>{label as string}</span>
            <input type="text" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          </div>
        ))}
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 140 }}>
        <div className="editor-header"><span>Generated Meta Tags</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 14. Open Graph Generator
export function OpenGraphGeneratorTool() {
  const [title, setTitle] = useState("My Page Title");
  const [desc, setDesc] = useState("Page description for social sharing.");
  const [url, setUrl] = useState("https://example.com");
  const [image, setImage] = useState("https://example.com/og-image.jpg");
  const [copied, setCopied] = useState(false);

  const output = `<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${image}">\n<meta property="og:type" content="website">`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        {[["og:title", title, setTitle], ["og:description", desc, setDesc], ["og:url", url, setUrl], ["og:image", image, setImage]].map(([label, val, setter]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 100 }}>{label as string}</span>
            <input type="text" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          </div>
        ))}
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 120 }}>
        <div className="editor-header"><span>Open Graph Tags</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 15. Twitter Card Generator
export function TwitterCardGeneratorTool() {
  const [card, setCard] = useState("summary_large_image");
  const [title, setTitle] = useState("My Page Title");
  const [desc, setDesc] = useState("Page description for Twitter.");
  const [image, setImage] = useState("https://example.com/twitter-card.jpg");
  const [copied, setCopied] = useState(false);

  const output = `<meta name="twitter:card" content="${card}">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${desc}">\n<meta name="twitter:image" content="${image}">`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["summary", "summary_large_image"].map(c => (
            <button key={c} type="button" className={`button ${card === c ? "button-primary" : "button-quiet"}`} style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }} onClick={() => setCard(c)}>{c}</button>
          ))}
        </div>
        {[["Title", title, setTitle], ["Description", desc, setDesc], ["Image URL", image, setImage]].map(([label, val, setter]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 80 }}>{label as string}</span>
            <input type="text" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          </div>
        ))}
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 100 }}>
        <div className="editor-header"><span>Twitter Card Tags</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 16. Robots.txt Generator
export function RobotsTxtGeneratorTool() {
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/private/");
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const disallows = disallowPaths.split("\n").filter(Boolean).map(p => `Disallow: ${p.trim()}`).join("\n");
  const output = `User-agent: *\n${disallows}\n\nSitemap: ${sitemapUrl}`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 100, paddingTop: 6 }}>Disallow Paths</span>
          <textarea value={disallowPaths} onChange={e => setDisallowPaths(e.target.value)} rows={3} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)", resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 100 }}>Sitemap URL</span>
          <input type="text" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
        </div>
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 100 }}>
        <div className="editor-header"><span>robots.txt</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 17. Sitemap XML Generator
export function SitemapGeneratorTool() {
  const [urls, setUrls] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/contact");
  const [copied, setCopied] = useState(false);

  const entries = urls.split("\n").filter(Boolean).map(u => `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n    <priority>0.8</priority>\n  </url>`).join("\n");
  const output = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;

  return (
    <section className="json-tool">
      <div className="editor-grid">
        <div className="editor-panel"><div className="editor-header"><span>URLs (one per line)</span></div><textarea className="code-editor" value={urls} onChange={e => setUrls(e.target.value)} spellCheck="false" /></div>
        <div className="editor-panel"><div className="editor-header"><span>sitemap.xml</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div><textarea className="code-editor" value={output} readOnly spellCheck="false" /></div>
      </div>
    </section>
  );
}

// 18. Web App Manifest Generator
export function WebManifestGeneratorTool() {
  const [name, setName] = useState("My Web App");
  const [shortName, setShortName] = useState("App");
  const [themeColor, setThemeColor] = useState("#9ef0c5");
  const [bgColor, setBgColor] = useState("#121412");
  const [display, setDisplay] = useState("standalone");
  const [copied, setCopied] = useState(false);

  const output = JSON.stringify({ name, short_name: shortName, start_url: "/", display, theme_color: themeColor, background_color: bgColor, icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }] }, null, 2);

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        {[["Name", name, setName], ["Short Name", shortName, setShortName]].map(([label, val, setter]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 80 }}>{label as string}</span>
            <input type="text" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Theme</span><input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Background</span><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          <div style={{ display: "flex", gap: 4 }}>
            {["standalone", "fullscreen", "minimal-ui"].map(d => (
              <button key={d} type="button" className={`button ${display === d ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "2px 6px", minHeight: 22 }} onClick={() => setDisplay(d)}>{d}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 200 }}>
        <div className="editor-header"><span>manifest.json</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}

// 19. Canonical URL Generator
export function CanonicalURLGeneratorTool() {
  const [url, setUrl] = useState("https://example.com/page");
  const [copied, setCopied] = useState(false);
  const output = `<link rel="canonical" href="${url}" />`;

  return (
    <section className="json-tool">
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>Canonical URL</span>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 60 }}>
        <div className="editor-header"><span>Canonical Tag</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" style={{ minHeight: 40 }} />
      </div>
    </section>
  );
}

// 20. Schema.org / JSON-LD Generator
export function SchemaGeneratorTool() {
  const [type, setType] = useState("Organization");
  const [name, setName] = useState("AIOC");
  const [url, setUrl] = useState("https://aioc.dev");
  const [desc, setDesc] = useState("A minimal browser-first tools utility suite.");
  const [copied, setCopied] = useState(false);

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
    description: desc,
  };
  const output = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;

  return (
    <section className="json-tool">
      <div style={{ display: "grid", gap: 10, padding: 8 }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["Organization", "WebSite", "Article", "Product", "Person", "LocalBusiness"].map(t => (
            <button key={t} type="button" className={`button ${type === t ? "button-primary" : "button-quiet"}`} style={{ fontSize: 10, padding: "3px 7px", minHeight: 24 }} onClick={() => setType(t)}>{t}</button>
          ))}
        </div>
        {[["Name", name, setName], ["URL", url, setUrl], ["Description", desc, setDesc]].map(([label, val, setter]) => (
          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "var(--muted)", minWidth: 80 }}>{label as string}</span>
            <input type="text" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ flex: 1, fontSize: 12, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--surface-sunken)", color: "var(--text)" }} />
          </div>
        ))}
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 180 }}>
        <div className="editor-header"><span>JSON-LD Structured Data</span><div className="output-actions"><button type="button" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <><Icon name="check" size={14} /> Copied</> : <><Icon name="copy" size={14} /> Copy</>}</button></div></div>
        <textarea className="code-editor" value={output} readOnly spellCheck="false" />
      </div>
    </section>
  );
}
