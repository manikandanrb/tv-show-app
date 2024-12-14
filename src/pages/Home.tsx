import { useState, useEffect, useRef, useCallback } from 'react';
import { TVShow } from '../types';
import { ShowGrid } from '../components/ShowGrid';
import { ShowDetails } from '../components/ShowDetails';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useShows } from '../hooks/useShows';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { shows, loading, error } = useShows();
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleShows, setVisibleShows] = useState<TVShow[]>([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPage = 20;

  // Filter and deduplicate shows based on search query
  const filteredShows = Array.from(
    new Map(
      shows
        .filter(show => show.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(show => [show.id, show]) // Ensure uniqueness by `id`
    ).values()
  );

  // Load more shows into the visibleShows state
  const loadMoreShows = useCallback(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const newShows = filteredShows.slice(startIndex, startIndex + itemsPerPage);

    // Add new shows, ensuring no duplicates
    setVisibleShows(prevShows => {
      const combined = [...prevShows, ...newShows];
      return Array.from(new Map(combined.map(show => [show.id, show])).values());
    });

    setPage(prevPage => prevPage + 1);
  }, [page, filteredShows]);

  // Reset visible shows and page when search query changes
  useEffect(() => {
    setVisibleShows([]);
    setPage(1);
  }, [searchQuery]);

  // Trigger loading on scroll
  useEffect(() => {
    if (loading || filteredShows.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreShows();
        }
      },
      {
        rootMargin: '100px', // Trigger slightly before the bottom
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadMoreShows, loading]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">TV Shows</h1>
          <button onClick={() => navigate('/movie-upload')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload TV Show
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {loading && page === 1 && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <ShowGrid
            shows={visibleShows}
            onShowSelect={setSelectedShow}
          />
        )}

        {selectedShow && (
          <ShowDetails
            show={selectedShow}
            onClose={() => setSelectedShow(null)}
          />
        )}

        {/* Loading indicator at the bottom */}
        <div ref={loadingRef} className="flex justify-center my-4">
          {loading && <LoadingSpinner />}
        </div>
      </main>
    </div>
  );
}

export default Home;
