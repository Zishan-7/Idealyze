import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
}

export function ScoreCard({ title, score, icon: Icon }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80)
      return "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800/30";
    if (score >= 60)
      return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800/30";
    return "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800/30";
  };

  return (
    <Card className={`${getScoreBackground(score)} border`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${getScoreColor(score)}`} />
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <Progress value={score} className="mt-2" />
      </CardContent>
    </Card>
  );
}
