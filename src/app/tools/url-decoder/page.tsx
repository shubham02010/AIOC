import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UrlDecoder } from "./UrlDecoder";

export const metadata = generateToolMetadata("url-decoder");

export default function Page() {
  return (
    <ToolPageShell slug="url-decoder">
      <UrlDecoder />
    </ToolPageShell>
  );
}
