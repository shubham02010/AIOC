import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { NumberBaseConverter } from "./NumberBaseConverter";

export const metadata = generateToolMetadata("number-base-converter");

export default function Page() {
  return (
    <ToolPageShell slug="number-base-converter">
      <NumberBaseConverter />
    </ToolPageShell>
  );
}
