import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { TimestampConverter } from "./TimestampConverter";

export const metadata = generateToolMetadata("timestamp-converter");

export default function Page() {
  return (
    <ToolPageShell slug="timestamp-converter">
      <TimestampConverter />
    </ToolPageShell>
  );
}
