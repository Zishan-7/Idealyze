import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  BarChart3,
  RotateCcw,
} from "lucide-react";
import { ValidationResults as ValidationResultsType } from "@/lib/types";
import { ScoreCard } from "./score-card";
import { AnalysisSection } from "./analysis-section";

interface OverallScoreProps {
  score: number;
}

interface ViabilityFactorsProps {
  factors: ValidationResultsType["viabilityFactors"];
}

interface MarketPotentialProps {
  marketPotential: ValidationResultsType["marketPotential"];
}

interface CompetitionAnalysisProps {
  competition: ValidationResultsType["competition"];
}

interface SwotAnalysisProps {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
}

interface RecommendationsProps {
  recommendations: string[];
}

interface NextStepsProps {
  onValidateAnother?: () => void;
  showValidateAnotherButton?: boolean;
}

export function OverallScore({ score }: OverallScoreProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Trophy className="h-6 w-6" />
          Validation Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
          <p className="text-muted-foreground mb-4">Overall Validation Score</p>
          <Progress value={score} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ViabilityFactors({ factors }: ViabilityFactorsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ScoreCard title="Technical" score={factors.technical} icon={BarChart3} />
      <ScoreCard
        title="Financial"
        score={factors.financial}
        icon={TrendingUp}
      />
      <ScoreCard title="Market" score={factors.market} icon={Target} />
      <ScoreCard title="Team" score={factors.team} icon={Users} />
    </div>
  );
}

export function MarketPotential({ marketPotential }: MarketPotentialProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Market Potential
          <Badge variant="secondary">{marketPotential.score}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{marketPotential.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Market Size:</span>{" "}
            {marketPotential.marketSize}
          </div>
          <div>
            <span className="font-medium">Growth Rate:</span>{" "}
            {marketPotential.growth}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CompetitionAnalysis({ competition }: CompetitionAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Competition Analysis
          <Badge
            variant={
              competition.level === "Low"
                ? "default"
                : competition.level === "Medium"
                ? "secondary"
                : "destructive"
            }
          >
            {competition.level} Competition
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{competition.analysis}</p>
        <div>
          <span className="text-sm font-medium">Key Competitors:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {competition.competitors.map((competitor, index) => (
              <Badge key={index} variant="outline">
                {competitor}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SwotAnalysis({
  strengths,
  weaknesses,
  opportunities,
  risks,
}: SwotAnalysisProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnalysisSection
        title="Strengths"
        items={strengths}
        icon={CheckCircle}
        variant="positive"
      />
      <AnalysisSection
        title="Weaknesses"
        items={weaknesses}
        icon={XCircle}
        variant="negative"
      />
      <AnalysisSection
        title="Opportunities"
        items={opportunities}
        icon={TrendingUp}
        variant="neutral"
      />
      <AnalysisSection
        title="Risks"
        items={risks}
        icon={AlertTriangle}
        variant="negative"
      />
    </div>
  );
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <AnalysisSection
      title="Recommendations"
      items={recommendations}
      icon={Lightbulb}
      variant="default"
    />
  );
}

export function NextSteps({
  onValidateAnother,
  showValidateAnotherButton,
}: NextStepsProps) {
  return (
    <div className="space-y-6">
      {showValidateAnotherButton && (
        <Button
          onClick={onValidateAnother}
          className="bg-primary w-full cursor-pointer text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Validate Another Idea
        </Button>
      )}

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <AlertCircle className="h-5 w-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Based on this analysis, here are the immediate actions you should
            consider:
          </p>
          <div className="space-y-2">
            <Badge variant="outline" className="mr-2">
              1. Validate assumptions
            </Badge>
            <Badge variant="outline" className="mr-2">
              2. Build MVP
            </Badge>
            <Badge variant="outline" className="mr-2">
              3. Test market fit
            </Badge>
            <Badge variant="outline">4. Seek feedback</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
