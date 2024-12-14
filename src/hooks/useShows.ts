import { useState, useEffect } from 'react';
import { TVShow } from '../types';
import { getShows } from '../api/tvShowsApi';
import { useErrorHandler } from './useErrorHandler';

export function useShows() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError } = useErrorHandler();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        setShows(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [handleError]);

  return { shows, loading, error };
}