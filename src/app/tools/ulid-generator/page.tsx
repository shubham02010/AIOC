import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ULIDGeneratorTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("ulid-generator");

export default function Page() {
  return (
    <ToolPageShell slug="ulid-generator">
      <ULIDGeneratorTool />
    </ToolPageShell>
  );
}
