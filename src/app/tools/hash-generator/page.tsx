import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HashGenerator } from "./HashGenerator";

export const metadata = generateToolMetadata("hash-generator");

export default function Page() {
  return (
    <ToolPageShell slug="hash-generator">
      <HashGenerator />
    </ToolPageShell>
  );
}
