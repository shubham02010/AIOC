import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MACAddressFormatterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("mac-address-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="mac-address-formatter">
      <MACAddressFormatterTool />
    </ToolPageShell>
  );
}
