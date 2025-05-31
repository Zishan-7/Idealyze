import { useIdeaValidationStore } from "@/stores/idea-validation-store";
import { useShallow } from "zustand/react/shallow";

export function useIdeaValidation() {
  // Use shallow comparison for better performance
  const state = useIdeaValidationStore(
    useShallow((state) => ({
      // State
      idea: state.idea,
      showResults: state.showResults,
      isValidating: state.isValidating,
      results: state.results,
      error: state.error,
      showInputForm: state.showInputForm,

      // Actions
      validateIdea: state.validateIdea,
      validateAnother: state.validateAnother,
      updateIdea: state.updateIdea,
    }))
  );

  // Get computed value separately to avoid unnecessary re-renders
  const shouldShowValidateAnotherButton = useIdeaValidationStore((store) =>
    store.shouldShowValidateAnotherButton()
  );

  return {
    ...state,
    shouldShowValidateAnotherButton,
  };
}
