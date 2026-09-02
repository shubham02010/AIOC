import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HtmlEntityTool } from "./HtmlEntityTool";

export const metadata = generateToolMetadata("html-entity-encoder-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="html-entity-encoder-decoder">
      <HtmlEntityTool />
    </ToolPageShell>
  );
}
