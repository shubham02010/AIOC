import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { AsciiConverterTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("ascii-converter");

export default function Page() {
  return (
    <ToolPageShell slug="ascii-converter">
      <AsciiConverterTool />
    </ToolPageShell>
  );
}
