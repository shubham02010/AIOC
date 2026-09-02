"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type TextToolProps = {
  title: string;
  description: string;
  category: string;
  initialInput?: string;
  transform: (input: string) => string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  controls?: React.ReactNode;
  readingNotice?: string;
};

export function TextToolLayout({
  title,
  description,
  category,
  initialInput = "",
  transform,
  inputPlaceholder = "Type or paste your text here...",
  outputPlaceholder = "Output will appear here...",
  controls,
  readingNotice,
}: TextToolProps) {
  const [input, setInput] = useState(initialInput);
  const [copied, setCopied] = useState(false);

  const output = transform(input);

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // fallback
    }
  };

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;
  const lineCount = input ? input.split("\n").length : 0;

  return (
    <section className="json-tool" aria-label={`${title} tool`}>
      <div className="tool-controls">
        <div className="control-group">
          <span className="control-label">
            Stats: <strong>{charCount}</strong> chars | <strong>{wordCount}</strong> words | <strong>{lineCount}</strong> lines
          </span>
        </div>
        <div className="tool-action-group">
          {controls}
          <button className="button button-quiet" type="button" onClick={() => setInput("")}>
            Clear
          </button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-panel">
          <div className="editor-header">
            <span>Input Text</span>
            <span>{charCount} chars</span>
          </div>
          <textarea
            className="code-editor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            spellCheck="false"
          />
        </div>

        <div className="editor-panel output-panel">
          <div className="editor-header">
            <span>Transformed Output</span>
            <div className="output-actions">
              <button type="button" onClick={copyOutput} disabled={!output}>
                {copied ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={output}
            readOnly
            placeholder={outputPlaceholder}
            spellCheck="false"
          />
        </div>
      </div>

      {readingNotice && (
        <div className="tool-notice" style={{ marginTop: 12 }}>
          <span className="notice-icon">i</span>
          <div>
            <strong>Summary</strong>
            <p>{readingNotice}</p>
          </div>
        </div>
      )}
    </section>
  );
}
