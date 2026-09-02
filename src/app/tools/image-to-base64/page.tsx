import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { ImageToBase64Tool } from "@/components/data-utility-tools/DataUtilityToolsComponents";

export const metadata = generateToolMetadata("image-to-base64");

export default function Page() {
  return (
    <ToolPageShell slug="image-to-base64">
      <ImageToBase64Tool />
    </ToolPageShell>
  );
}
