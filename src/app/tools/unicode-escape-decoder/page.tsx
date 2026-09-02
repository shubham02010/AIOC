import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UnicodeEscapeDecoderTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("unicode-escape-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="unicode-escape-decoder">
      <UnicodeEscapeDecoderTool />
    </ToolPageShell>
  );
}
