import type { Metadata } from "next";
import "./globals.css";
import { ClientShell } from "@/components/ClientShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://aioc.tools"),
  title: {
    default: "AIOC — Fast, Privacy-Focused Browser Tools",
    template: "%s | AIOC",
  },
  description:
    "AIOC is a calm, high-performance suite of 152+ browser-based developer, design, text, and security tools with 100% local execution.",
  keywords: [
    "developer tools",
    "online utilities",
    "json formatter",
    "jwt decoder",
    "uuid generator",
    "privacy tools",
    "local browser tools",
  ],
  alternates: {
    canonical: "https://aioc.tools",
  },
  openGraph: {
    type: "website",
    siteName: "AIOC",
    title: "AIOC — Fast, Privacy-Focused Browser Tools",
    description:
      "A calm, high-performance suite of 152+ browser-based developer, design, text, and security tools.",
    url: "https://aioc.tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIOC — Fast, Privacy-Focused Browser Tools",
    description:
      "152+ free, browser-based utilities with 100% local processing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIOC",
  url: "https://aioc.tools",
  description:
    "152+ browser-based developer and design utilities with 100% local execution.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://aioc.tools/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIOC",
  url: "https://aioc.tools",
  logo: "https://aioc.tools/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4843493400541807"
          crossOrigin="anonymous"
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebsite),
          }}
        />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
      </head>

      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
