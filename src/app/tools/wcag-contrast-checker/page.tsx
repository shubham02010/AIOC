import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WCAGContrastCheckerTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("wcag-contrast-checker");

export default function Page() {
  return (
    <ToolPageShell slug="wcag-contrast-checker">
      <WCAGContrastCheckerTool />
    </ToolPageShell>
  );
}
