import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TextCaseInverterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("text-case-inverter");

export default function Page() {
  return (
    <ToolPageShell slug="text-case-inverter">
      <TextCaseInverterTool />
    </ToolPageShell>
  );
}
