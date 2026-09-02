import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { MorseCodeAudioTool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("morse-code-audio-player");

export default function Page() {
  return (
    <ToolPageShell slug="morse-code-audio-player">
      <MorseCodeAudioTool />
    </ToolPageShell>
  );
}
