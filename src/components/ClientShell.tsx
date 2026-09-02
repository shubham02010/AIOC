"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { categories, tools } from "@/data/tools";

function ThemeButton() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("aioc-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("aioc-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  return (
    <button
      className="icon-button"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Icon name={isDark ? "sun" : "moon"} />
    </button>
  );
}

function CommandMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelectedIndex(0);
    setSelectedCategory("all");
    window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  const matches = useMemo(() => {
    const normalized = query.toLowerCase().replace(/[\s_-]/g, "");
    return tools.filter((tool) => {
      const matchCategory = selectedCategory === "all" || tool.category === selectedCategory;
      if (!normalized) return matchCategory;
      const matchText = [tool.name, tool.description, tool.category, ...tool.keywords]
        .join(" ")
        .toLowerCase()
        .replace(/[\s_-]/g, "")
        .includes(normalized);
      return matchCategory && matchText;
    });
  }, [query, selectedCategory]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  const choose = (slug: string) => {
    onClose();
    router.push(`/tools/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (matches.length > 0 ? (prev + 1) % matches.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (matches.length > 0 ? (prev - 1 + matches.length) % matches.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches[selectedIndex]) {
        choose(matches[selectedIndex].slug);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="command-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="command-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Search AIOC tools"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="command-input-wrap">
          <Icon name="search" size={19} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${tools.length}+ browser utilities...`}
            aria-label="Search tools"
          />
          <kbd>ESC</kbd>
        </div>

        <div style={{ display: "flex", gap: 6, padding: "8px 12px", borderBottom: "1px solid var(--line)", background: "var(--surface-sunken)", overflowX: "auto" }}>
          <button
            type="button"
            className={`button ${selectedCategory === "all" ? "button-primary" : "button-quiet"}`}
            style={{ fontSize: 10, padding: "3px 8px", minHeight: 24 }}
            onClick={() => setSelectedCategory("all")}
          >
            All Tools ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                type="button"
                className={`button ${selectedCategory === cat.slug ? "button-primary" : "button-quiet"}`}
                style={{ fontSize: 10, padding: "3px 8px", minHeight: 24, whiteSpace: "nowrap" }}
                onClick={() => setSelectedCategory(cat.slug)}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="command-results">
          <p className="command-label">
            {query ? `Matches (${matches.length})` : `Showing ${matches.length} tools`}
          </p>
          {matches.length ? (
            matches.map((tool, idx) => (
              <button
                key={tool.slug}
                type="button"
                className="command-result"
                style={{
                  background: idx === selectedIndex ? "var(--surface)" : "transparent",
                  outline: idx === selectedIndex ? "1px solid var(--line-strong)" : "none"
                }}
                onClick={() => choose(tool.slug)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="command-result-icon">
                  <Icon name={tool.icon} size={17} />
                </span>
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.description}</small>
                </span>
                <span className="command-category">
                  {categories.find((c) => c.slug === tool.category)?.name || "Developer"}
                </span>
              </button>
            ))
          ) : (
            <div className="command-empty">
              <Icon name="search" size={22} />
              <p>No tool matches “{query}”.</p>
              <span>Try JSON, JWT, Base64, UUID, Hash, Regex, or Timestamp.</span>
            </div>
          )}
        </div>
        <footer className="command-footer">
          <span><b>↵</b> Open</span>
          <span><b>↑↓</b> Navigate</span>
          <span><b>Esc</b> Close</span>
        </footer>
      </section>
    </div>
  );
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      } else if (event.key === "/" && !isInput) {
        event.preventDefault();
        setCommandOpen(true);
      } else if (event.key === "Escape") {
        setCommandOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const active = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="primary-nav" aria-label="Primary navigation">
            <Link className={active("/tools") ? "active" : ""} href="/tools">
              Tools
            </Link>
            <Link className={active("/categories") ? "active" : ""} href="/categories/developer">
              Categories
            </Link>
            <button type="button" onClick={() => setCommandOpen(true)} aria-label="Open tool search menu">
              <Icon name="search" size={16} /> Search <kbd>⌘ K</kbd>
            </button>
          </nav>
          <div className="header-actions">
            <ThemeButton />
            <a className="icon-button github-link" href="https://github.com" aria-label="AIOC on GitHub" target="_blank" rel="noopener noreferrer">
              <Icon name="github" />
            </a>
            <button
              type="button"
              className="icon-button mobile-menu-button"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <Icon name={mobileOpen ? "x" : "menu"} />
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/tools">All Tools ({tools.length})</Link>
            <Link href="/categories/developer">Developer Tools</Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setCommandOpen(true);
              }}
            >
              <Icon name="search" size={17} /> Search tools <kbd>/</kbd>
            </button>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Brand />
          <div className="footer-note">
            <Icon name="shield" size={15} /> 100% Client-side — No server processing
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
