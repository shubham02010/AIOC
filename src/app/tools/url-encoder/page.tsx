import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { UrlEncoder } from "./UrlEncoder";

export const metadata = generateToolMetadata("url-encoder");

export default function Page() {
  return (
    <ToolPageShell slug="url-encoder">
      <UrlEncoder />
    </ToolPageShell>
  );
}
