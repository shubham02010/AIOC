import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AIOC",
  description: "Terms of use for AIOC browser tools and utilities.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Service — AIOC", description: "Terms of use for AIOC browser tools and utilities." },
};
export default function TermsPage() { return <article className="legal-page shell"><p className="eyebrow">Terms</p><h1>Simple terms for simple tools.</h1><p className="lead">Use AIOC at your discretion. Please verify important results independently.</p><div className="prose"><h2>Use of the tools</h2><p>AIOC provides browser-based utilities for general use. The tools are provided without warranties of any kind, express or implied.</p><h2>Your responsibility</h2><p>You are responsible for reviewing output before relying on it in production, legal, financial, security, or other important contexts.</p><h2>Changes</h2><p>As the collection evolves, these terms may be updated. The current version will always be published on this page.</p></div></article>; }
