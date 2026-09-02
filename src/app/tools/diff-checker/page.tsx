import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { DiffChecker } from "./DiffChecker";

export const metadata = generateToolMetadata("diff-checker");

export default function Page() {
  return (
    <ToolPageShell slug="diff-checker">
      <DiffChecker />
    </ToolPageShell>
  );
}
