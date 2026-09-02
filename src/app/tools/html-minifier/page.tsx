import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HTMLMinifierTool } from "@/components/web-tools/WebToolsComponents";

export const metadata = generateToolMetadata("html-minifier");

export default function Page() {
  return (
    <ToolPageShell slug="html-minifier">
      <HTMLMinifierTool />
    </ToolPageShell>
  );
}
