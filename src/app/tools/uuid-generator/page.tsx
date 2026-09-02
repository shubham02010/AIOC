import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UuidGenerator } from "./UuidGenerator";

export const metadata = generateToolMetadata("uuid-generator");

export default function Page() {
  return (
    <ToolPageShell slug="uuid-generator">
      <UuidGenerator />
    </ToolPageShell>
  );
}
