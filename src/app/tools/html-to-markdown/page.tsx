import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HtmlToMarkdownTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("html-to-markdown");

export default function Page() {
  return (
    <ToolPageShell slug="html-to-markdown">
      <HtmlToMarkdownTool />
    </ToolPageShell>
  );
}
