import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalysisSectionProps {
  title: string;
  items: string[];
  icon: LucideIcon;
  variant?: "positive" | "negative" | "neutral" | "default";
}

export function AnalysisSection({
  title,
  items,
  icon: Icon,
  variant = "default",
}: AnalysisSectionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "positive":
        return "border-green-200 bg-green-50/50 dark:border-green-800/30 dark:bg-green-950/20";
      case "negative":
        return "border-red-200 bg-red-50/50 dark:border-red-800/30 dark:bg-red-950/20";
      case "neutral":
        return "border-blue-200 bg-blue-50/50 dark:border-blue-800/30 dark:bg-blue-950/20";
      default:
        return "border-border bg-card";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "positive":
        return "text-green-600 dark:text-green-400";
      case "negative":
        return "text-red-600 dark:text-red-400";
      case "neutral":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={getVariantStyles()}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className={`h-5 w-5 ${getIconColor()}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
