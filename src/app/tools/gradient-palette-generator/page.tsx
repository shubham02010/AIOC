import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { GradientPaletteGeneratorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("gradient-palette-generator");

export default function Page() {
  return (
    <ToolPageShell slug="gradient-palette-generator">
      <GradientPaletteGeneratorTool />
    </ToolPageShell>
  );
}
