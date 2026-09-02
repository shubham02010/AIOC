import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { IPv4SubnetCalculatorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("ipv4-subnet-calculator");

export default function Page() {
  return (
    <ToolPageShell slug="ipv4-subnet-calculator">
      <IPv4SubnetCalculatorTool />
    </ToolPageShell>
  );
}
