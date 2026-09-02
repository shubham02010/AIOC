import Link from "next/link";
import type { Tool } from "@/data/tools";
import { Icon } from "./Icon";

export function ToolCard({ tool, compact = false }: { tool: Tool; compact?: boolean }) {
  return (
    <Link href={`/tools/${tool.slug}`} className={`tool-card ${compact ? "tool-card-compact" : ""}`}>
      <span className="tool-icon"><Icon name={tool.icon} size={19} /></span>
      <span className="tool-card-main">
        <span className="tool-card-title">{tool.name}</span>
        <span className="tool-card-description">{tool.description}</span>
      </span>
      <Icon name="arrow-right" size={17} className="tool-card-arrow" />
    </Link>
  );
}
