import { useState, useCallback } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    console.error('Error:', error);
    setError(error instanceof Error ? error.message : 'An unexpected error occurred');
  }, []);

  return { error, handleError };
}