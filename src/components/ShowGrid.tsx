import { TVShow } from '../types';
import { ShowCard } from './ShowCard';

interface ShowGridProps {
  shows: TVShow[];
  onShowSelect: (show: TVShow) => void;
}

export function ShowGrid({ shows, onShowSelect }: ShowGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {shows.map((show) => (
        <ShowCard
          key={show.id}
          show={show}
          onClick={() => onShowSelect(show)}
        />
      ))}
    </div>
  );
}