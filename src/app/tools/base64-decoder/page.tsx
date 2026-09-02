import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { Base64Decoder } from "./Base64Decoder";

export const metadata = generateToolMetadata("base64-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="base64-decoder">
      <Base64Decoder />
    </ToolPageShell>
  );
}
