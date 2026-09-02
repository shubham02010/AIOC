import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UuidValidator } from "./UuidValidator";

export const metadata = generateToolMetadata("uuid-validator");

export default function Page() {
  return (
    <ToolPageShell slug="uuid-validator">
      <UuidValidator />
    </ToolPageShell>
  );
}
