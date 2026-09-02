import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, getToolsForCategory } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Icon } from "@/components/Icon";

export const generateStaticParams = () => categories.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category Not Found — AIOC" };
  
  const title = `${category.name} Tools — Online ${category.name} Utilities | AIOC`;
  const description = `${category.description} Free, browser-based ${category.name.toLowerCase()} tools with zero server tracking.`;
  const canonical = `/categories/${category.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://aioc.tools${canonical}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryTools = getToolsForCategory(category.slug);
  return <section className="category-page shell"><div className="category-hero"><p className="eyebrow" style={{ color: category.accent }}>{category.eyebrow}</p><h1>{category.name} tools.</h1><p>{category.description}</p></div>{categoryTools.length ? <div className="category-tool-group"><div className="directory-label"><span>Available now</span><span>{categoryTools.length} tool</span></div><div className="tools-list">{categoryTools.map((tool) => <ToolCard tool={tool} compact key={tool.slug} />)}</div></div> : <div className="category-empty"><Icon name="spark" size={22} /><h2>Taking shape.</h2><p>This part of the AIOC collection is being designed with the same care. Check back soon.</p></div>}<div className="category-promise"><Icon name="shield" size={19} /><span>Every available AIOC tool is designed to work locally in your browser whenever technically possible.</span></div></section>;
}
