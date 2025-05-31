"use client";

import { ValidatorHeader } from "@/components/ui/validator-header";
import { IdeaInputForm } from "@/components/ui/idea-input-form";
import { ValidationResults } from "@/components/ui/validation-results";
import { ValidatorFooter } from "@/components/ui/validator-footer";
import { useIdeaValidation } from "@/hooks/use-idea-validation";

export function StartupIdeaValidator() {
  const {
    // State
    idea,
    showResults,
    isValidating,
    results,
    error,
    showInputForm,

    // Actions
    validateIdea,
    validateAnother,
    updateIdea,

    // Computed
    shouldShowValidateAnotherButton,
  } = useIdeaValidation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ValidatorHeader />

        {showInputForm && (
          <IdeaInputForm
            idea={idea}
            onIdeaChange={updateIdea}
            onSubmit={validateIdea}
            isDisabled={isValidating}
          />
        )}

        <ValidationResults
          isVisible={showResults}
          results={results}
          isLoading={isValidating}
          error={error}
          onValidateAnother={validateAnother}
          showValidateAnotherButton={shouldShowValidateAnotherButton}
        />

        <ValidatorFooter />
      </div>
    </div>
  );
}
