"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, tools } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";

export default function HomePage() {
  const [popularTools, setPopularTools] = useState(tools.slice(0, 6));

  useEffect(() => {
    // Select popular tools
    const selectedSlugs = [
      "json-formatter",
      "jwt-decoder",
      "hash-generator",
      "uuid-generator",
      "regex-tester",
      "cron-expression-generator"
    ];
    const filtered = tools.filter((t) => selectedSlugs.includes(t.slug));
    if (filtered.length > 0) setPopularTools(filtered);
  }, []);

  const triggerSearch = () => {
    // Trigger CommandMenu via keyboard event dispatch
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true }));
  };

  return (
    <>
      <section className="hero" aria-label="Hero section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> A considered browser utility suite
            </p>
            <h1>
              Tools that keep<br />out of your way.
            </h1>
            <p className="hero-description">
              Fast, focused utilities for the technical moments that interrupt your flow. No accounts. No servers. No noise.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={triggerSearch}>
                <Icon name="search" size={17} /> Search {tools.length}+ utilities <kbd>⌘ K</kbd>
              </button>
              <Link href="/tools" className="button button-secondary">
                Explore all tools <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-search-card" role="region" aria-label="Find a tool">
            <p className="search-card-label">Quick Search</p>
            <div
              className="hero-search"
              tabIndex={0}
              role="button"
              aria-label="Open search command menu"
              onClick={triggerSearch}
              onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
            >
              <Icon name="search" size={19} />
              <span>JSON formatter, JWT decoder, timestamp converter, base64...</span>
              <kbd>⌘ K</kbd>
            </div>

            <div className="search-suggestions" aria-label="Popular tool shortcuts">
              <span>Popular:</span>
              <Link href="/tools/json-formatter">JSON Formatter</Link>
              <span className="dot" />
              <Link href="/tools/jwt-decoder">JWT Decoder</Link>
              <span className="dot" />
              <Link href="/tools/hash-generator">Hash Gen</Link>
              <span className="dot" />
              <Link href="/tools/uuid-generator">UUIDs</Link>
              <span className="dot" />
              <Link href="/tools/regex-tester">Regex</Link>
            </div>

            <div className="search-card-bottom">
              <span>
                <i className="pulse" /> 100% Local Execution
              </span>
              <span>{tools.length} utilities built & ready</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell popular-section" aria-label="Essential tools section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start here</p>
            <h2>Useful right now.</h2>
          </div>
          <Link className="text-link" href="/tools">
            View full directory ({tools.length}) <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <div className="popular-layout">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="section shell category-section" aria-label="Tool categories section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse by intent</p>
            <h2>Made for the work in front of you.</h2>
          </div>
        </div>

        <div className="category-list">
          {categories.map((category, index) => {
            const catToolsCount = tools.filter((t) => t.category === category.slug).length;
            return (
              <article className="category-row" key={category.slug}>
                <span className="category-index">0{index + 1}</span>
                <div>
                  <p className="category-eyebrow" style={{ color: category.accent }}>
                    {category.eyebrow}
                  </p>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                {catToolsCount > 0 ? (
                  <Link className="row-link" href={`/categories/${category.slug}`}>
                    Explore {catToolsCount} tools <Icon name="arrow-right" size={17} />
                  </Link>
                ) : (
                  <span className="row-status">Coming soon</span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="principles" aria-label="Core principles section">
        <div className="shell">
          <p className="eyebrow">The AIOC standard</p>
          <div className="principles-grid">
            <article>
              <span className="principle-number">01</span>
              <h3>Fast by default.</h3>
              <p>Small bundles, client-side algorithms, and zero unnecessary network requests.</p>
            </article>
            <article>
              <span className="principle-number">02</span>
              <h3>Your data stays put.</h3>
              <p>Every tool executes 100% locally in your browser. Inputs never leave your device.</p>
            </article>
            <article>
              <span className="principle-number">03</span>
              <h3>Keyboard friendly.</h3>
              <p>Intuitive shortcuts, focus management, and quick navigation without touching the mouse.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
