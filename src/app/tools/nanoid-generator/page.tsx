import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { NanoIDGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("nanoid-generator");

export default function Page() {
  return (
    <ToolPageShell slug="nanoid-generator">
      <NanoIDGeneratorTool />
    </ToolPageShell>
  );
}
