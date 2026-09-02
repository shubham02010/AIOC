import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HexEncoderDecoderTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("hex-encoder-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="hex-encoder-decoder">
      <HexEncoderDecoderTool />
    </ToolPageShell>
  );
}
