import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JsonMinifier } from "./JsonMinifier";

export const metadata = generateToolMetadata("json-minifier");

export default function Page() {
  return (
    <ToolPageShell slug="json-minifier">
      <JsonMinifier />
    </ToolPageShell>
  );
}
