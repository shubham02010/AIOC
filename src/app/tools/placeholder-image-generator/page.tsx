import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { PlaceholderImageGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("placeholder-image-generator");

export default function Page() {
  return (
    <ToolPageShell slug="placeholder-image-generator">
      <PlaceholderImageGeneratorTool />
    </ToolPageShell>
  );
}
