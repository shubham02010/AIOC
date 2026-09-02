import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { JsonFormatter } from "./JsonFormatter";

export const metadata = generateToolMetadata("json-formatter");

export default function Page() {
  return (
    <ToolPageShell slug="json-formatter">
      <JsonFormatter />
    </ToolPageShell>
  );
}
