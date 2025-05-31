import { ValidationResults } from "./types";

export interface ValidationResponse {
  results: ValidationResults;
}

export interface ValidationError {
  error: string;
}

export async function validateStartupIdea(
  idea: string
): Promise<ValidationResults> {
  const response = await fetch("/api/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const errorData: ValidationError = await response.json();
    throw new Error(errorData.error || "Failed to validate startup idea");
  }

  const data: ValidationResponse = await response.json();
  return data.results;
}
