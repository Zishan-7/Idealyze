import { useState } from "react";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = unknown>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (
    apiCall: () => Promise<T>,
    options: UseApiOptions<T> = {}
  ) => {
    const { onSuccess, onError } = options;

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setData(null);
  };

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
  };
}
