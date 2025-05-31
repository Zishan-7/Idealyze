"use client";

import { useState } from "react";
import { ValidatorHeader } from "@/components/ui/validator-header";
import { IdeaInputForm } from "@/components/ui/idea-input-form";
import { ValidationResults } from "@/components/ui/validation-results";
import { ValidatorFooter } from "@/components/ui/validator-footer";
import { ValidationResults as ValidationResultsType } from "@/lib/types";

export function StartupIdeaValidator() {
  const [idea, setIdea] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [results, setResults] = useState<ValidationResultsType | null>(null);

  const handleValidateIdea = async () => {
    if (!idea.trim()) return;

    setIsValidating(true);
    setShowResults(true);

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, you would call your API here
    // const response = await validateIdea(idea);
    // setResults(response.data);

    setResults(null); // Will use mock data from ValidationResults component
    setIsValidating(false);
  };

  const handleIdeaChange = (value: string) => {
    setIdea(value);
    // Reset results when user starts typing again
    if (showResults) {
      setShowResults(false);
      setResults(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ValidatorHeader />

        <IdeaInputForm
          idea={idea}
          onIdeaChange={handleIdeaChange}
          onSubmit={handleValidateIdea}
          isDisabled={isValidating}
        />

        <ValidationResults
          isVisible={showResults}
          results={results}
          isLoading={isValidating}
        />

        <ValidatorFooter />
      </div>
    </div>
  );
}
