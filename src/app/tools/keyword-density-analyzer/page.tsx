import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { KeywordDensityAnalyzerTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("keyword-density-analyzer");

export default function Page() {
  return (
    <ToolPageShell slug="keyword-density-analyzer">
      <KeywordDensityAnalyzerTool />
    </ToolPageShell>
  );
}
