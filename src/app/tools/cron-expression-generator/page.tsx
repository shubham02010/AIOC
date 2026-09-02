import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CronExpressionGenerator } from "./CronExpressionGenerator";

export const metadata = generateToolMetadata("cron-expression-generator");

export default function Page() {
  return (
    <ToolPageShell slug="cron-expression-generator">
      <CronExpressionGenerator />
    </ToolPageShell>
  );
}
