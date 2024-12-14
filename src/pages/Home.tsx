import { useState } from 'react';
import { TVShow } from '../types';
import { ShowGrid } from '../components/ShowGrid';
import { ShowDetails } from '../components/ShowDetails';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useShows } from '../hooks/useShows';

function Home() {
  const { shows, loading, error } = useShows();
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShows = shows.filter(show =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">TV Shows</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <ShowGrid
            shows={filteredShows}
            onShowSelect={setSelectedShow}
          />
        )}

        {selectedShow && (
          <ShowDetails
            show={selectedShow}
            onClose={() => setSelectedShow(null)}
          />
        )}
      </main>
    </div>
  );
}

export default Home;