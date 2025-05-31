"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  BarChart3,
  Trophy,
  AlertCircle,
  LucideIcon,
} from "lucide-react";
import { ValidationResults as ValidationResultsType } from "@/lib/types";

interface ValidationResultsProps {
  isVisible: boolean;
  results: ValidationResultsType | null;
  isLoading?: boolean;
}

// Mock data for demonstration - this would come from your API
const mockResults: ValidationResultsType = {
  overallScore: 78,
  marketPotential: {
    score: 82,
    description:
      "Strong market potential with growing demand in the target segment",
    marketSize: "$2.4B TAM, $180M SAM",
    growth: "15% annual growth rate",
  },
  competition: {
    level: "Medium",
    analysis: "Moderate competition with opportunity for differentiation",
    competitors: ["Competitor A", "Competitor B", "Competitor C"],
  },
  strengths: [
    "Addresses a genuine pain point",
    "Scalable business model",
    "Strong value proposition",
    "Clear target audience",
  ],
  weaknesses: [
    "High customer acquisition cost",
    "Technology complexity",
    "Regulatory considerations",
  ],
  opportunities: [
    "Emerging market trends",
    "Partnership possibilities",
    "Feature expansion potential",
    "International markets",
  ],
  risks: [
    "Market saturation",
    "Technology disruption",
    "Funding requirements",
    "Competition from big tech",
  ],
  recommendations: [
    "Focus on MVP development",
    "Conduct market research",
    "Build strategic partnerships",
    "Develop go-to-market strategy",
  ],
  viabilityFactors: {
    technical: 75,
    financial: 68,
    market: 82,
    team: 72,
  },
};

function ScoreCard({
  title,
  score,
  icon: Icon,
}: {
  title: string;
  score: number;
  icon: LucideIcon;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <Card className={`${getScoreBackground(score)} border`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${getScoreColor(score)}`} />
            <span className="text-sm font-medium">{title}</span>
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

function AnalysisSection({
  title,
  items,
  icon: Icon,
  variant = "default",
}: {
  title: string;
  items: string[];
  icon: LucideIcon;
  variant?: "positive" | "negative" | "neutral" | "default";
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "positive":
        return "border-green-200 bg-green-50/50";
      case "negative":
        return "border-red-200 bg-red-50/50";
      case "neutral":
        return "border-blue-200 bg-blue-50/50";
      default:
        return "border-border bg-card";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      case "neutral":
        return "text-blue-600";
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

export function ValidationResults({
  isVisible,
  results,
  isLoading = false,
}: ValidationResultsProps) {
  if (!isVisible) return null;

  // Use mock data for now - replace with actual results when API is implemented
  const displayResults = results || mockResults;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <p className="text-muted-foreground">
              Analyzing your startup idea...
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut",
        scale: { type: "spring", stiffness: 100, damping: 15 },
      }}
      className="mt-8 space-y-6"
    >
      {/* Overall Score */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Trophy className="h-6 w-6" />
            Validation Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {displayResults.overallScore}%
            </div>
            <p className="text-muted-foreground mb-4">
              Overall Validation Score
            </p>
            <Progress value={displayResults.overallScore} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Viability Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard
          title="Technical"
          score={displayResults.viabilityFactors.technical}
          icon={BarChart3}
        />
        <ScoreCard
          title="Financial"
          score={displayResults.viabilityFactors.financial}
          icon={TrendingUp}
        />
        <ScoreCard
          title="Market"
          score={displayResults.viabilityFactors.market}
          icon={Target}
        />
        <ScoreCard
          title="Team"
          score={displayResults.viabilityFactors.team}
          icon={Users}
        />
      </div>

      {/* Market Potential */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Market Potential
            <Badge variant="secondary">
              {displayResults.marketPotential.score}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            {displayResults.marketPotential.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Market Size:</span>{" "}
              {displayResults.marketPotential.marketSize}
            </div>
            <div>
              <span className="font-medium">Growth Rate:</span>{" "}
              {displayResults.marketPotential.growth}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competition Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Competition Analysis
            <Badge
              variant={
                displayResults.competition.level === "Low"
                  ? "default"
                  : displayResults.competition.level === "Medium"
                  ? "secondary"
                  : "destructive"
              }
            >
              {displayResults.competition.level} Competition
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">{displayResults.competition.analysis}</p>
          <div>
            <span className="text-sm font-medium">Key Competitors:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {displayResults.competition.competitors.map(
                (competitor, index) => (
                  <Badge key={index} variant="outline">
                    {competitor}
                  </Badge>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisSection
          title="Strengths"
          items={displayResults.strengths}
          icon={CheckCircle}
          variant="positive"
        />
        <AnalysisSection
          title="Weaknesses"
          items={displayResults.weaknesses}
          icon={XCircle}
          variant="negative"
        />
        <AnalysisSection
          title="Opportunities"
          items={displayResults.opportunities}
          icon={TrendingUp}
          variant="neutral"
        />
        <AnalysisSection
          title="Risks"
          items={displayResults.risks}
          icon={AlertTriangle}
          variant="negative"
        />
      </div>

      {/* Recommendations */}
      <AnalysisSection
        title="Recommendations"
        items={displayResults.recommendations}
        icon={Lightbulb}
        variant="default"
      />

      {/* Action Items */}
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
    </motion.div>
  );
}
