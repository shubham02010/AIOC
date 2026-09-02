import type { Metadata } from "next";
import Link from "next/link";
import { getTool, getCategory, tools, type Tool } from "@/data/tools";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";

export function generateToolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  if (!tool) {
    return { title: "Tool Not Found — AIOC" };
  }

  const category = getCategory(tool.category);
  const categoryName = category ? category.name : "Browser";
  const canonical = `/tools/${tool.slug}`;

  const title = `${tool.name} — Free Online ${tool.name} | AIOC`;
  const description = `${tool.description} Fast, browser-based, and 100% client-side ${tool.name.toLowerCase()} tool with zero server tracking.`;

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://aioc.tools${canonical}`,
      siteName: "AIOC",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

interface ToolPageShellProps {
  slug: string;
  children: React.ReactNode;
  customHowToUse?: string[];
  customWhatItDoes?: string;
}

export function ToolPageShell({ slug, children, customHowToUse, customWhatItDoes }: ToolPageShellProps) {
  const tool = getTool(slug);
  if (!tool) return null;

  const category = getCategory(tool.category);
  const categoryName = category ? category.name : "Developer";
  const categorySlug = category ? category.slug : "developer";

  // Get related tools from same category
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  // Fallback to general popular tools if same category has < 3
  if (relatedTools.length < 3) {
    const extraTools = tools.filter((t) => t.slug !== tool.slug && !relatedTools.includes(t)).slice(0, 3 - relatedTools.length);
    relatedTools.push(...extraTools);
  }

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aioc.tools",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${categoryName} Tools`,
        item: `https://aioc.tools/categories/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://aioc.tools/tools/${tool.slug}`,
      },
    ],
  };

  const jsonLdApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `AIOC ${tool.name}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: tool.description,
    url: `https://aioc.tools/tools/${tool.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const defaultHowTo = [
    `Enter or paste your input into the ${tool.name} interface.`,
    `Adjust parameters, options, or settings in real-time.`,
    `Copy, export, or download the verified result instantly.`,
  ];

  const howToSteps = customHowToUse || defaultHowTo;
  const whatItDoesText = customWhatItDoes || `${tool.name} performs precise client-side operations directly inside your browser. Your input data stays local to your machine and is never sent across any server network.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />

      <section className="tool-page shell">
        <nav className="breadcrumb" aria-label="Breadcrumb navigation">
          <Link href="/tools">Tools</Link>
          <span>/</span>
          <Link href={`/categories/${categorySlug}`}>{categoryName}</Link>
          <span>/</span>
          <span>{tool.name}</span>
        </nav>

        <div className="tool-title-row">
          <div>
            <p className="eyebrow">{categoryName} tool</p>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
          <div className="local-badge">
            <Icon name="shield" size={15} /> 100% Local Execution
          </div>
        </div>

        {children}

        <div className="tool-reading-grid">
          <article>
            <p className="eyebrow">What it does</p>
            <h2>Browser-first execution with maximum privacy.</h2>
            <p>{whatItDoesText}</p>
          </article>
          <article>
            <p className="eyebrow">How to use it</p>
            <ol>
              {howToSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </article>
        </div>

        <section className="tool-faq">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>{tool.name} FAQ</h2>
          <details>
            <summary>Is my data uploaded to any AIOC server?</summary>
            <p>
              No. Every operation in {tool.name} runs entirely on client-side JavaScript inside your browser. No files, code, credentials, or strings leave your local machine.
            </p>
          </details>
          <details>
            <summary>Is this tool free to use for commercial projects?</summary>
            <p>
              Yes. All AIOC developer and design utilities are completely free to use for personal, open-source, and commercial engineering workflows.
            </p>
          </details>
          <details>
            <summary>Does this tool work offline?</summary>
            <p>
              Yes. Once loaded in your browser session, {tool.name} executes locally without requiring active network connectivity for logic processing.
            </p>
          </details>
        </section>

        {relatedTools.length > 0 && (
          <section className="section" style={{ paddingTop: 48 }} aria-label="Related tools">
            <div className="section-heading" style={{ marginBottom: 16 }}>
              <div>
                <p className="eyebrow">Related utilities</p>
                <h2>Explore similar {categoryName.toLowerCase()} tools</h2>
              </div>
              <Link className="text-link" href={`/categories/${categorySlug}`}>
                View all {categoryName} tools <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <div className="popular-layout">
              {relatedTools.map((relTool) => (
                <ToolCard key={relTool.slug} tool={relTool} />
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}
