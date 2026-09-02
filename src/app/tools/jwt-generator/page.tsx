import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JwtGenerator } from "./JwtGenerator";

export const metadata = generateToolMetadata("jwt-generator");

export default function Page() {
  return (
    <ToolPageShell slug="jwt-generator">
      <JwtGenerator />
    </ToolPageShell>
  );
}
