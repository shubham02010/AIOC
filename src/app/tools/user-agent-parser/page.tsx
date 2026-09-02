import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UserAgentParserTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("user-agent-parser");

export default function Page() {
  return (
    <ToolPageShell slug="user-agent-parser">
      <UserAgentParserTool />
    </ToolPageShell>
  );
}
