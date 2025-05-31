"use client";

import { motion } from "motion/react";
import { ValidationResults as ValidationResultsType } from "@/lib/types";
import { LoadingState, ErrorState } from "./validation-states";
import {
  OverallScore,
  ViabilityFactors,
  MarketPotential,
  CompetitionAnalysis,
  SwotAnalysis,
  Recommendations,
  NextSteps,
} from "@/components/ui/validation-sections";

interface ValidationResultsProps {
  isVisible: boolean;
  results: ValidationResultsType | null;
  isLoading?: boolean;
  error?: string | null;
  onValidateAnother?: () => void;
  showValidateAnotherButton?: boolean;
}

export function ValidationResults({
  isVisible,
  results,
  isLoading = false,
  error,
  onValidateAnother,
  showValidateAnotherButton = false,
}: ValidationResultsProps) {
  if (!isVisible) return null;

  // Show loading state
  if (isLoading) {
    return <LoadingState isVisible={true} />;
  }

  // Show error state
  if (error) {
    return <ErrorState isVisible={true} error={error} />;
  }

  // Use mock data for now - replace with actual results when API is implemented
  const displayResults = results;

  if (!displayResults) {
    return <div>No results</div>;
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
      {/* Validate Another Idea Button - Show at top */}
      {showValidateAnotherButton && (
        <NextSteps
          onValidateAnother={onValidateAnother}
          showValidateAnotherButton={true}
        />
      )}

      <OverallScore score={displayResults.overallScore} />

      <ViabilityFactors factors={displayResults.viabilityFactors} />

      <MarketPotential marketPotential={displayResults.marketPotential} />

      <CompetitionAnalysis competition={displayResults.competition} />

      <SwotAnalysis
        strengths={displayResults.strengths}
        weaknesses={displayResults.weaknesses}
        opportunities={displayResults.opportunities}
        risks={displayResults.risks}
      />

      <Recommendations recommendations={displayResults.recommendations} />

      {!showValidateAnotherButton && <NextSteps />}
    </motion.div>
  );
}
