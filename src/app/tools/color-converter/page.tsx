import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ColorConverterTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("color-converter");

export default function Page() {
  return (
    <ToolPageShell slug="color-converter">
      <ColorConverterTool />
    </ToolPageShell>
  );
}
