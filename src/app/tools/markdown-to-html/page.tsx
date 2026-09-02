import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MarkdownToHtmlTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("markdown-to-html");

export default function Page() {
  return (
    <ToolPageShell slug="markdown-to-html">
      <MarkdownToHtmlTool />
    </ToolPageShell>
  );
}
