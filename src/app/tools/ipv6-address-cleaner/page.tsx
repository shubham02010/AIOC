import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { IPv6CleanerTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("ipv6-address-cleaner");

export default function Page() {
  return (
    <ToolPageShell slug="ipv6-address-cleaner">
      <IPv6CleanerTool />
    </ToolPageShell>
  );
}
