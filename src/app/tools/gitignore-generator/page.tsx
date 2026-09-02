import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { GitignoreGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("gitignore-generator");

export default function Page() {
  return (
    <ToolPageShell slug="gitignore-generator">
      <GitignoreGeneratorTool />
    </ToolPageShell>
  );
}
