import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RGBToHSLConverterTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("rgb-to-hsl-converter");

export default function Page() {
  return (
    <ToolPageShell slug="rgb-to-hsl-converter">
      <RGBToHSLConverterTool />
    </ToolPageShell>
  );
}
