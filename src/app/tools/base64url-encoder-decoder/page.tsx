import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { Base64URLTool } from "@/components/security-tools/SecurityToolsComponents";

export const metadata = generateToolMetadata("base64url-encoder-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="base64url-encoder-decoder">
      <Base64URLTool />
    </ToolPageShell>
  );
}
