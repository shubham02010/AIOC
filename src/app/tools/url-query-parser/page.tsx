import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { URLQueryParserTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("url-query-parser");

export default function Page() {
  return (
    <ToolPageShell slug="url-query-parser">
      <URLQueryParserTool />
    </ToolPageShell>
  );
}
