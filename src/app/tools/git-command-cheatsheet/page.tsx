import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { GitCommandCheatsheetTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("git-command-cheatsheet");

export default function Page() {
  return (
    <ToolPageShell slug="git-command-cheatsheet">
      <GitCommandCheatsheetTool />
    </ToolPageShell>
  );
}
