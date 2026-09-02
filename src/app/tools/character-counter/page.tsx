import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CharacterCounterTool } from "@/components/text-tools/TextToolsComponents";

export const metadata = generateToolMetadata("character-counter");

export default function Page() {
  return (
    <ToolPageShell slug="character-counter">
      <CharacterCounterTool />
    </ToolPageShell>
  );
}
