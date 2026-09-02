import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SchemaGeneratorTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("schema-generator");

export default function Page() {
  return (
    <ToolPageShell slug="schema-generator">
      <SchemaGeneratorTool />
    </ToolPageShell>
  );
}
