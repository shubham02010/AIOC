import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { NamingConventionConverterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("camel-to-snake-converter");

export default function Page() {
  return (
    <ToolPageShell slug="camel-to-snake-converter">
      <NamingConventionConverterTool />
    </ToolPageShell>
  );
}
