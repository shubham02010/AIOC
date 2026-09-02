import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { HttpStatusReference } from "./HttpStatusReference";

export const metadata = generateToolMetadata("http-status-code-reference");

export default function Page() {
  return (
    <ToolPageShell slug="http-status-code-reference">
      <HttpStatusReference />
    </ToolPageShell>
  );
}
