import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HTMLFormatterTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("html-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="html-formatter">
      <HTMLFormatterTool />
    </ToolPageShell>
  );
}
