import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { SlugGeneratorTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("slug-generator");

export default function Page() {
  return (
    <ToolPageShell slug="slug-generator">
      <SlugGeneratorTool />
    </ToolPageShell>
  );
}
