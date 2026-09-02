import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ColorPaletteGeneratorTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("color-palette-generator");

export default function Page() {
  return (
    <ToolPageShell slug="color-palette-generator">
      <ColorPaletteGeneratorTool />
    </ToolPageShell>
  );
}
