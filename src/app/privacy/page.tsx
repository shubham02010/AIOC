import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AIOC",
  description: "AIOC processes 100% of data locally in your browser. No user inputs are stored or transmitted.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy — AIOC", description: "AIOC processes 100% of data locally in your browser." },
};

export default function PrivacyPage() {
  return (
    <article className="legal-page shell">
      <p className="eyebrow">Privacy</p>
      <h1>Your input is yours.</h1>
      <p className="lead">Every tool on AIOC processes its data entirely inside your web browser.</p>
      <div className="prose">
        <h2>Local Processing First</h2>
        <p>
          When you use formatters, decoders, generators, or calculators on AIOC, that execution takes place locally via client-side JavaScript. Your source code, JSON, passwords, JWTs, keys, and text never leave your device and are never sent to an AIOC server.
        </p>
        <h2>No Server Logs or Tracking of Inputs</h2>
        <p>
          We do not track, capture, or log the inputs or outputs you pass into AIOC utilities. Privacy and security are fundamental principles of our application architecture.
        </p>
        <h2>Local Storage</h2>
        <p>
          AIOC uses your browser’s LocalStorage strictly for functional state—such as saving your preferred color theme (dark/light) or temporary tool options.
        </p>
      </div>
    </article>
  );
}
