"use client";

import { useMemo, useState } from "react";
import { tools } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => { const normalized = query.toLowerCase().replace(/[\s_-]/g, ""); return tools.filter((tool) => !normalized || [tool.name, tool.description, tool.category, ...tool.keywords].join(" ").toLowerCase().replace(/[\s_-]/g, "").includes(normalized)); }, [query]);
  return <section className="search-page shell"><div className="page-intro"><p className="eyebrow">Search</p><h1>Find what you need.</h1><p>Names, purposes, categories, and common aliases are all searchable.</p></div><label className="search-page-input"><Icon name="search" size={21} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “json pretty” or “validator”" /><kbd>⌘ K</kbd></label><div className="search-page-results"><p className="result-count">{query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Available tools"}</p>{results.length ? <div className="tools-list">{results.map((tool) => <ToolCard tool={tool} compact key={tool.slug} />)}</div> : <div className="search-no-results"><Icon name="search" size={22} /><h2>No available tool matches that.</h2><p>Try a broader search. The directory is intentionally small while we build it with care.</p></div>}</div></section>;
}
