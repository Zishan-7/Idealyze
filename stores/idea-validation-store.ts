import { create } from "zustand";
import { ValidationResults } from "@/lib/types";
import { validateStartupIdea } from "@/lib/api";
import { toast } from "sonner";

interface IdeaValidationState {
  // State
  idea: string;
  showResults: boolean;
  isValidating: boolean;
  results: ValidationResults | null;
  error: string | null;
  showInputForm: boolean;

  // Actions
  setIdea: (idea: string) => void;
  validateIdea: () => Promise<void>;
  validateAnother: () => void;
  updateIdea: (value: string) => void;

  // Computed getters
  shouldShowValidateAnotherButton: () => boolean;
}

export const useIdeaValidationStore = create<IdeaValidationState>(
  (set, get) => ({
    // Initial state
    idea: "",
    showResults: false,
    isValidating: false,
    results: null,
    error: null,
    showInputForm: true,

    // Actions
    setIdea: (idea) => set({ idea }),

    validateIdea: async () => {
      const { idea } = get();
      if (!idea.trim()) return;

      set({
        isValidating: true,
        showResults: true,
        showInputForm: false,
        error: null,
        results: null,
      });

      try {
        const validationResults = await validateStartupIdea(idea);
        set({ results: validationResults });

        toast.success("Idea validated successfully!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to validate idea";
        set({
          error: errorMessage,
          showInputForm: true,
          showResults: false,
        });

        console.error("Validation error:", err);

        toast.error(errorMessage);
      } finally {
        set({ isValidating: false });
      }
    },

    validateAnother: () => {
      set({
        idea: "",
        showResults: false,
        results: null,
        error: null,
        showInputForm: true,
      });
    },

    updateIdea: (value) => {
      const { error } = get();
      set({ idea: value });

      if (error) {
        set({ error: null });
      }
    },

    shouldShowValidateAnotherButton: () => {
      const { isValidating, error, results } = get();
      return !isValidating && !error && !!results;
    },
  })
);
