"use client";

import { useState } from "react";
import { TextToolLayout } from "@/components/TextToolLayout";

// 1. Word Counter
export function WordCounterTool() {
  return (
    <TextToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs, and reading time instantly."
      category="text"
      initialInput="AIOC is a minimal, browser-first tools suite built for developer productivity."
      transform={(text) => {
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, "").length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
        const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
        const readingTimeMin = Math.ceil(words / 200);
        return [
          `Words: ${words}`,
          `Characters (total): ${chars}`,
          `Characters (no spaces): ${charsNoSpaces}`,
          `Sentences: ${sentences}`,
          `Paragraphs: ${paragraphs}`,
          `Estimated Reading Time: ~${readingTimeMin} min`,
        ].join("\n");
      }}
    />
  );
}

// 2. Character Counter
export function CharacterCounterTool() {
  return (
    <TextToolLayout
      title="Character Counter"
      description="Detailed character breakdown with and without spaces, bytes, and line counts."
      category="text"
      initialInput="Hello World! 123"
      transform={(text) => {
        const total = text.length;
        const noSpaces = text.replace(/\s/g, "").length;
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const digits = (text.match(/[0-9]/g) || []).length;
        const symbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
        const bytes = new TextEncoder().encode(text).length;
        return [
          `Total Characters: ${total}`,
          `Without Spaces: ${noSpaces}`,
          `Letters (A-Z): ${letters}`,
          `Digits (0-9): ${digits}`,
          `Symbols / Punctuation: ${symbols}`,
          `Byte Size (UTF-8): ${bytes} bytes`,
        ].join("\n");
      }}
    />
  );
}

// 3. Case Converter
export function CaseConverterTool() {
  const [caseType, setCaseType] = useState<
    "upper" | "lower" | "title" | "camel" | "snake" | "kebab" | "constant"
  >("upper");

  return (
    <TextToolLayout
      title="Text Case Converter"
      description="Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and CONSTANT_CASE."
      category="text"
      initialInput="hello world case converter"
      controls={
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(
            [
              ["UPPER", "upper"],
              ["lower", "lower"],
              ["Title Case", "title"],
              ["camelCase", "camel"],
              ["snake_case", "snake"],
              ["kebab-case", "kebab"],
              ["CONSTANT", "constant"],
            ] as const
          ).map(([label, val]) => (
            <button
              key={val}
              type="button"
              className={`button ${caseType === val ? "button-primary" : "button-quiet"}`}
              style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
              onClick={() => setCaseType(val)}
            >
              {label}
            </button>
          ))}
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        const words = text
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/[^a-zA-Z0-9]+/g, " ")
          .trim()
          .split(/\s+/);

        switch (caseType) {
          case "upper":
            return text.toUpperCase();
          case "lower":
            return text.toLowerCase();
          case "title":
            return text.replace(/\b\w/g, (c) => c.toUpperCase());
          case "camel":
            return words
              .map((w, i) =>
                i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
              )
              .join("");
          case "snake":
            return words.map((w) => w.toLowerCase()).join("_");
          case "kebab":
            return words.map((w) => w.toLowerCase()).join("-");
          case "constant":
            return words.map((w) => w.toUpperCase()).join("_");
          default:
            return text;
        }
      }}
    />
  );
}

// 4. Remove Duplicate Lines
export function RemoveDuplicateLinesTool() {
  const [caseSensitive, setCaseSensitive] = useState(false);
  return (
    <TextToolLayout
      title="Remove Duplicate Lines"
      description="Deduplicate text lines with optional case sensitivity."
      category="text"
      initialInput={`apple\nbanana\napple\nBanana\ncherry`}
      controls={
        <button
          type="button"
          className={`button ${caseSensitive ? "button-primary" : "button-quiet"}`}
          onClick={() => setCaseSensitive(!caseSensitive)}
          style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
        >
          {caseSensitive ? "Case Sensitive: ON" : "Case Sensitive: OFF"}
        </button>
      }
      transform={(text) => {
        if (!text) return "";
        const lines = text.split("\n");
        const seen = new Set<string>();
        const result: string[] = [];
        for (const line of lines) {
          const key = caseSensitive ? line : line.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            result.push(line);
          }
        }
        return result.join("\n");
      }}
    />
  );
}

// 5. Sort Lines
export function SortLinesTool() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "length" | "reverse">("asc");

  return (
    <TextToolLayout
      title="Sort Lines"
      description="Sort text lines alphabetically, numerically, by length, or reversed."
      category="text"
      initialInput={`orange\napple\nbanana\nkiwi`}
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          {(
            [
              ["A-Z", "asc"],
              ["Z-A", "desc"],
              ["By Length", "length"],
              ["Reverse Lines", "reverse"],
            ] as const
          ).map(([label, val]) => (
            <button
              key={val}
              type="button"
              className={`button ${sortOrder === val ? "button-primary" : "button-quiet"}`}
              style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
              onClick={() => setSortOrder(val)}
            >
              {label}
            </button>
          ))}
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        const lines = text.split("\n");
        if (sortOrder === "asc") return [...lines].sort((a, b) => a.localeCompare(b)).join("\n");
        if (sortOrder === "desc") return [...lines].sort((a, b) => b.localeCompare(a)).join("\n");
        if (sortOrder === "length") return [...lines].sort((a, b) => a.length - b.length).join("\n");
        if (sortOrder === "reverse") return [...lines].reverse().join("\n");
        return text;
      }}
    />
  );
}

// 6. Reverse Text
export function ReverseTextTool() {
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");
  return (
    <TextToolLayout
      title="Reverse Text"
      description="Reverse text by characters, words, or lines."
      category="text"
      initialInput="Hello World"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          {(
            [
              ["Characters", "chars"],
              ["Words", "words"],
              ["Lines", "lines"],
            ] as const
          ).map(([label, val]) => (
            <button
              key={val}
              type="button"
              className={`button ${mode === val ? "button-primary" : "button-quiet"}`}
              style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
              onClick={() => setMode(val)}
            >
              {label}
            </button>
          ))}
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        if (mode === "chars") return text.split("").reverse().join("");
        if (mode === "words") return text.split(/\s+/).reverse().join(" ");
        if (mode === "lines") return text.split("\n").reverse().join("\n");
        return text;
      }}
    />
  );
}

// 7. Trim Whitespace
export function TrimWhitespaceTool() {
  return (
    <TextToolLayout
      title="Trim Whitespace"
      description="Remove leading, trailing, and duplicate spaces from text."
      category="text"
      initialInput="   Hello   World   \n  Text   Tool  "
      transform={(text) => {
        if (!text) return "";
        return text
          .split("\n")
          .map((line) => line.trim().replace(/\s+/g, " "))
          .join("\n")
          .trim();
      }}
    />
  );
}

// 8. Extract Emails
export function ExtractEmailsTool() {
  return (
    <TextToolLayout
      title="Extract Emails"
      description="Find and extract all valid email addresses from text."
      category="text"
      initialInput="Contact support@aioc.dev or sales@example.com for help. Test info@domain.co.uk."
      transform={(text) => {
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = text.match(regex);
        if (!matches) return "No emails found.";
        return Array.from(new Set(matches)).join("\n");
      }}
    />
  );
}

// 9. Extract URLs
export function ExtractURLsTool() {
  return (
    <TextToolLayout
      title="Extract URLs"
      description="Extract HTTP and HTTPS links from unstructured text."
      category="text"
      initialInput="Visit https://aioc.dev for fast utilities or check http://github.com/example/repo."
      transform={(text) => {
        const regex = /https?:\/\/[^\s<"'>]+/g;
        const matches = text.match(regex);
        if (!matches) return "No URLs found.";
        return Array.from(new Set(matches)).join("\n");
      }}
    />
  );
}

// 10. Extract Numbers
export function ExtractNumbersTool() {
  return (
    <TextToolLayout
      title="Extract Numbers"
      description="Extract all numeric values (integers & decimals) from text."
      category="text"
      initialInput="Order #4092 placed on 2026-09-01 for $149.99 with 2 items."
      transform={(text) => {
        const regex = /-?\d+(?:\.\d+)?/g;
        const matches = text.match(regex);
        if (!matches) return "No numbers found.";
        return matches.join("\n");
      }}
    />
  );
}

// 11. Lorem Ipsum Generator
export function LoremIpsumGeneratorTool() {
  const [paras, setParas] = useState(3);
  const sample = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit."
  ];

  return (
    <TextToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder dummy text by paragraphs."
      category="text"
      initialInput=""
      controls={
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Paragraphs:</span>
          {[1, 3, 5, 10].map((num) => (
            <button
              key={num}
              type="button"
              className={`button ${paras === num ? "button-primary" : "button-quiet"}`}
              style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
              onClick={() => setParas(num)}
            >
              {num}
            </button>
          ))}
        </div>
      }
      transform={() => {
        const result: string[] = [];
        for (let i = 0; i < paras; i++) {
          result.push(sample[i % sample.length]);
        }
        return result.join("\n\n");
      }}
    />
  );
}

// 12. Slug Generator
export function SlugGeneratorTool() {
  return (
    <TextToolLayout
      title="URL Slug Generator"
      description="Convert title text into clean, SEO-friendly URL slugs."
      category="text"
      initialInput="AIOC Tools — Fast & Local Utilities for Developers!"
      transform={(text) => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }}
    />
  );
}

// 13. Markdown to HTML
export function MarkdownToHtmlTool() {
  return (
    <TextToolLayout
      title="Markdown to HTML"
      description="Convert Markdown syntax into clean HTML tags."
      category="markdown"
      initialInput="# Hello World\n\nThis is **bold** and *italic* text with [a link](https://aioc.dev)."
      transform={(text) => {
        if (!text) return "";
        return text
          .replace(/^### (.*$)/gim, "<h3>$1</h3>")
          .replace(/^## (.*$)/gim, "<h2>$1</h2>")
          .replace(/^# (.*$)/gim, "<h1>$1</h1>")
          .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
          .replace(/\*(.*)\*/gim, "<em>$1</em>")
          .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
          .replace(/\n\n/gim, "</p><p>")
          .replace(/^/gim, "<p>")
          .replace(/$/gim, "</p>")
          .replace(/<p><\/p>/gim, "");
      }}
    />
  );
}

// 14. HTML to Markdown
export function HtmlToMarkdownTool() {
  return (
    <TextToolLayout
      title="HTML to Markdown"
      description="Convert simple HTML markup into Markdown syntax."
      category="markdown"
      initialInput="<h1>Hello World</h1><p>This is <strong>bold</strong> and <a href='https://aioc.dev'>link</a></p>"
      transform={(html) => {
        if (!html) return "";
        return html
          .replace(/<h1>(.*?)<\/h1>/gi, "# $1\n")
          .replace(/<h2>(.*?)<\/h2>/gi, "## $1\n")
          .replace(/<h3>(.*?)<\/h3>/gi, "### $1\n")
          .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
          .replace(/<b>(.*?)<\/b>/gi, "**$1**")
          .replace(/<em>(.*?)<\/em>/gi, "*$1*")
          .replace(/<i>(.*?)<\/i>/gi, "*$1*")
          .replace(/<a href=['"](.*?)['"]>(.*?)<\/a>/gi, "[$2]($1)")
          .replace(/<p>(.*?)<\/p>/gi, "$1\n\n")
          .replace(/<br\s*\/?>/gi, "\n")
          .trim();
      }}
    />
  );
}

// 15. Text Diff Checker
export function TextDiffTool() {
  const [textA, setTextA] = useState("Hello world\nThis is original text");
  const [textB, setTextB] = useState("Hello world!\nThis is modified text");

  const linesA = textA.split("\n");
  const linesB = textB.split("\n");
  const maxLines = Math.max(linesA.length, linesB.length);
  const diffLines: string[] = [];

  for (let i = 0; i < maxLines; i++) {
    const a = linesA[i];
    const b = linesB[i];
    if (a === b) {
      diffLines.push(`  ${a || ""}`);
    } else {
      if (a !== undefined) diffLines.push(`- ${a}`);
      if (b !== undefined) diffLines.push(`+ ${b}`);
    }
  }

  return (
    <section className="json-tool">
      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header">
            <span>Original Text (A)</span>
          </div>
          <textarea
            className="code-editor"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            spellCheck="false"
          />
        </div>
        <div className="editor-panel">
          <div className="editor-header">
            <span>Modified Text (B)</span>
          </div>
          <textarea
            className="code-editor"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>
      <div className="editor-panel" style={{ marginTop: 10, minHeight: 180 }}>
        <div className="editor-header">
          <span>Line Diff Output</span>
        </div>
        <textarea
          className="code-editor"
          value={diffLines.join("\n")}
          readOnly
          spellCheck="false"
        />
      </div>
    </section>
  );
}

// 16. ASCII Converter
export function AsciiConverterTool() {
  const [mode, setMode] = useState<"text2ascii" | "ascii2text">("text2ascii");
  return (
    <TextToolLayout
      title="ASCII Converter"
      description="Convert text to ASCII code numbers and back."
      category="text"
      initialInput="AIOC"
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            className={`button ${mode === "text2ascii" ? "button-primary" : "button-quiet"}`}
            style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
            onClick={() => setMode("text2ascii")}
          >
            Text → ASCII Codes
          </button>
          <button
            type="button"
            className={`button ${mode === "ascii2text" ? "button-primary" : "button-quiet"}`}
            style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
            onClick={() => setMode("ascii2text")}
          >
            ASCII Codes → Text
          </button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        if (mode === "text2ascii") {
          return text.split("").map((c) => c.charCodeAt(0)).join(" ");
        } else {
          return text
            .trim()
            .split(/\s+/)
            .map((num) => String.fromCharCode(parseInt(num, 10) || 0))
            .join("");
        }
      }}
    />
  );
}

// 17. Remove Line Breaks
export function RemoveLineBreaksTool() {
  const [delimiter, setDelimiter] = useState<"space" | "comma" | "custom">("space");
  return (
    <TextToolLayout
      title="Remove Line Breaks"
      description="Replace line breaks with spaces or commas."
      category="text"
      initialInput={`Line one\nLine two\nLine three`}
      controls={
        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            className={`button ${delimiter === "space" ? "button-primary" : "button-quiet"}`}
            style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
            onClick={() => setDelimiter("space")}
          >
            With Space
          </button>
          <button
            type="button"
            className={`button ${delimiter === "comma" ? "button-primary" : "button-quiet"}`}
            style={{ fontSize: 11, padding: "4px 8px", minHeight: 28 }}
            onClick={() => setDelimiter("comma")}
          >
            With Comma
          </button>
        </div>
      }
      transform={(text) => {
        if (!text) return "";
        const sep = delimiter === "comma" ? ", " : " ";
        return text.split("\n").filter(Boolean).map((s) => s.trim()).join(sep);
      }}
    />
  );
}

// 18. Text Statistics
export function TextStatisticsTool() {
  return (
    <TextToolLayout
      title="Text Statistics & Readability"
      description="Analyze word metrics, average word length, and readability."
      category="text"
      initialInput="The quick brown fox jumps over the lazy dog. Local browser-first developer tools enhance workflow speed."
      transform={(text) => {
        if (!text) return "Enter text to calculate statistics.";
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 1;
        const avgWordLen = words ? (chars / words).toFixed(2) : "0";
        const avgSentenceWords = words ? (words / sentences).toFixed(2) : "0";
        return [
          `Word Count: ${words}`,
          `Sentence Count: ${sentences}`,
          `Average Word Length: ${avgWordLen} characters`,
          `Average Sentence Length: ${avgSentenceWords} words`,
          `Readability Level: ${words > 30 ? "Standard" : "Short snippet"}`,
        ].join("\n");
      }}
    />
  );
}

// 19. Find & Replace
export function FindAndReplaceTool() {
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");

  return (
    <TextToolLayout
      title="Find & Replace Text"
      description="Search and substitute text occurrences."
      category="text"
      initialInput="AIOC is fast. AIOC is minimal. AIOC runs in the browser."
      controls={
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Find..."
            value={find}
            onChange={(e) => setFind(e.target.value)}
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid var(--line)",
              background: "var(--surface-sunken)",
              color: "var(--text)",
            }}
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            style={{
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid var(--line)",
              background: "var(--surface-sunken)",
              color: "var(--text)",
            }}
          />
        </div>
      }
      transform={(text) => {
        if (!find) return text;
        return text.replaceAll(find, replace);
      }}
    />
  );
}

// 20. Add Line Numbers
export function AddLineNumbersTool() {
  return (
    <TextToolLayout
      title="Add Line Numbers"
      description="Prefix every text line with line numbers."
      category="text"
      initialInput={`First line\nSecond line\nThird line`}
      transform={(text) => {
        if (!text) return "";
        return text
          .split("\n")
          .map((line, idx) => `${idx + 1}. ${line}`)
          .join("\n");
      }}
    />
  );
}

