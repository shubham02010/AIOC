import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { BinaryEncoderDecoderTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("binary-encoder-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="binary-encoder-decoder">
      <BinaryEncoderDecoderTool />
    </ToolPageShell>
  );
}
