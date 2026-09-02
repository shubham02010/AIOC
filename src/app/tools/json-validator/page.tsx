import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JsonValidator } from "./JsonValidator";

export const metadata = generateToolMetadata("json-validator");

export default function Page() {
  return (
    <ToolPageShell slug="json-validator">
      <JsonValidator />
    </ToolPageShell>
  );
}
