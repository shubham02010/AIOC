import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HexToRGBConverterTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("hex-to-rgb-converter");

export default function Page() {
  return (
    <ToolPageShell slug="hex-to-rgb-converter">
      <HexToRGBConverterTool />
    </ToolPageShell>
  );
}
