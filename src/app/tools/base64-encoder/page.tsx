import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { Base64Encoder } from "./Base64Encoder";

export const metadata = generateToolMetadata("base64-encoder");

export default function Page() {
  return (
    <ToolPageShell slug="base64-encoder">
      <Base64Encoder />
    </ToolPageShell>
  );
}
