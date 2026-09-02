import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JwtDecoder } from "./JwtDecoder";

export const metadata = generateToolMetadata("jwt-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="jwt-decoder">
      <JwtDecoder />
    </ToolPageShell>
  );
}
