import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { WordCounterTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("word-counter");

export default function WordCounterPage() {
  return (
    <ToolPageShell slug="word-counter">
      <WordCounterTool />
    </ToolPageShell>
  );
}
