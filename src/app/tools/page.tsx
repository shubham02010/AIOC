import type { Metadata } from "next";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Tool Directory — AIOC",
  description: "Browse 152+ fast, privacy-focused browser tools for developers, designers, and web professionals.",
  alternates: { canonical: "/tools" },
  openGraph: { title: "Tool Directory — AIOC", description: "Browse 152+ fast, privacy-focused browser tools." },
};

export default function ToolsPage() {
  return (
    <section className="directory-page shell">
      <div className="page-intro">
        <p className="eyebrow">Directory</p>
        <h1>Find the utility,<br />then get back to work.</h1>
        <p>Browse our complete index of {tools.length} browser-based tools across 14 specialized categories.</p>
      </div>
      <div className="directory-toolbar">
        <div className="directory-search">
          <Icon name="search" size={18} />
          <span>Search the available collection</span>
          <kbd>⌘ K</kbd>
        </div>
        <span className="availability">
          <i className="pulse" /> {tools.length} tools available
        </span>
      </div>
      <div className="directory-section">
        <div className="directory-label">
          <span>Available now</span>
          <span>All Categories ({tools.length})</span>
        </div>
        <div className="tools-list">
          {tools.map((tool) => (
            <ToolCard tool={tool} compact key={tool.slug} />
          ))}
        </div>
      </div>
      <aside className="directory-note">
        <Icon name="shield" size={18} />
        <div>
          <h2>100% Client-Side Execution</h2>
          <p>Every tool listed here executes locally inside your web browser. No inputs, files, or sensitive payloads leave your device.</p>
        </div>
      </aside>
    </section>
  );
}
