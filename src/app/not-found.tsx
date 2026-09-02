import Link from "next/link";
import { Icon } from "@/components/Icon";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

export default function NotFound() {
  const popularTools = tools.filter((t) => t.popular).slice(0, 6);

  return (
    <section className="shell" style={{ padding: "64px 0 96px", maxWidth: 900 }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="eyebrow" style={{ color: "var(--accent)" }}>404 Error</p>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "12px 0 16px" }}>
          Utility not found.
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 540, margin: "0 auto 24px" }}>
          The tool or page you requested does not exist or may have been moved. Try searching our collection of {tools.length} utilities below.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/tools" className="button button-primary">
            <Icon name="search" size={17} /> Explore All {tools.length} Tools
          </Link>
          <Link href="/" className="button button-secondary">
            Return Home
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--line)", paddingTop: 36 }}>
        <p className="eyebrow" style={{ marginBottom: 16 }}>Popular Utilities</p>
        <div className="popular-layout">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
