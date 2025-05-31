export interface ValidationResults {
  overallScore: number; // 0-100
  marketPotential: {
    score: number;
    description: string;
    marketSize: string;
    growth: string;
  };
  competition: {
    level: "Low" | "Medium" | "High";
    analysis: string;
    competitors: string[];
  };
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
  recommendations: string[];
  viabilityFactors: {
    technical: number;
    financial: number;
    market: number;
    team: number;
  };
}

export interface ValidationState {
  isLoading: boolean;
  results: ValidationResults | null;
  error: string | null;
}
