import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WordFrequencyCounterTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("word-frequency-counter");

export default function Page() {
  return (
    <ToolPageShell slug="word-frequency-counter">
      <WordFrequencyCounterTool />
    </ToolPageShell>
  );
}
