import { TVShow } from '../types';
import { Star } from 'lucide-react';

interface ShowCardProps {
  show: TVShow;
  onClick: () => void;
}

export function ShowCard({ show, onClick }: ShowCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
    >
      <img 
        src={show.imageUrl || 'https://via.placeholder.com/210x295'} 
        alt={show.name}
        className="w-full h-[295px] object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{show.name}</h3>
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span>{show.rating || 'N/A'}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {show.genres.split(',').join(', ')}
        </div>
      </div>
    </div>
  );
}