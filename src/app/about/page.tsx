import type { Metadata } from "next";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "About", description: "Why AIOC exists." };

export default function AboutPage() { return <article className="legal-page shell"><p className="eyebrow">About AIOC</p><h1>Good utilities deserve good interfaces.</h1><p className="lead">AIOC is a small, browser-first collection for developers who value their attention.</p><div className="prose"><p>Most online tools turn a quick task into a distracted one. AIOC is designed around the opposite idea: open a focused page, do the work, and leave with the result.</p><p>We build in deliberate releases. That means fewer tools at first, but every one is clear, fast, and made to be used repeatedly.</p></div><div className="about-values"><div><Icon name="code" /><strong>Browser-first</strong><span>Local processing whenever possible.</span></div><div><Icon name="shield" /><strong>Privacy-minded</strong><span>No unnecessary data collection.</span></div><div><Icon name="keyboard" /><strong>Keyboard-ready</strong><span>Useful without a mouse.</span></div></div></article>; }
