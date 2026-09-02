import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { RegexTester } from "./RegexTester";

export const metadata = generateToolMetadata("regex-tester");

export default function Page() {
  return (
    <ToolPageShell slug="regex-tester">
      <RegexTester />
    </ToolPageShell>
  );
}
