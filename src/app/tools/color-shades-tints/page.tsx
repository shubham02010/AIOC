import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ColorShadesTintsTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("color-shades-tints");

export default function Page() {
  return (
    <ToolPageShell slug="color-shades-tints">
      <ColorShadesTintsTool />
    </ToolPageShell>
  );
}
