import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { LoremIpsumGeneratorTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("lorem-ipsum-generator");

export default function Page() {
  return (
    <ToolPageShell slug="lorem-ipsum-generator">
      <LoremIpsumGeneratorTool />
    </ToolPageShell>
  );
}
