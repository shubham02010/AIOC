import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UnixTimestampConverter } from "./UnixTimestampConverter";

export const metadata = generateToolMetadata("unix-timestamp-converter");

export default function Page() {
  return (
    <ToolPageShell slug="unix-timestamp-converter">
      <UnixTimestampConverter />
    </ToolPageShell>
  );
}
