import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ISODateFormatterTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("iso-date-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="iso-date-formatter">
      <ISODateFormatterTool />
    </ToolPageShell>
  );
}
