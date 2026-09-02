import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CaseConverterTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("case-converter");

export default function Page() {
  return (
    <ToolPageShell slug="case-converter">
      <CaseConverterTool />
    </ToolPageShell>
  );
}
