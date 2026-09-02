import { generateToolMetadata, ToolPageShell } from "@/components/ToolPageShell";
import { CronExpressionParserTool } from "@/components/datetime-color-tools/DateTimeColorToolsComponents";

export const metadata = generateToolMetadata("cron-expression-parser");

export default function Page() {
  return (
    <ToolPageShell slug="cron-expression-parser">
      <CronExpressionParserTool />
    </ToolPageShell>
  );
}
