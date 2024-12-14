import { TVShow } from '../types';
import { X, Calendar, Clock, Signal } from 'lucide-react';

interface ShowDetailsProps {
  show: TVShow;
  onClose: () => void;
}

export function ShowDetails({ show, onClose }: ShowDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{show.name}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            <img 
              src={show.imageUrl || 'https://via.placeholder.com/300x400'} 
              alt={show.name}
              className="w-full rounded-lg"
            />
            
            <div>
              <div className="prose" dangerouslySetInnerHTML={{ __html: show.summary || '' }} />
              
              <div className="mt-6 grid gap-4">
                <div className="flex items-center gap-2">
                  <Signal className="text-gray-600" size={20} />
                  <span className="font-semibold">Network:</span>
                  {show.networkName} ({show.networkCountry})
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-600" size={20} />
                  <span className="font-semibold">Schedule:</span>
                  {show.scheduleDays}
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-600" size={20} />
                  <span className="font-semibold">Time:</span>
                  {show.scheduleTime || 'N/A'}
                </div>
                
                <div>
                  <span className="font-semibold">Status:</span> {show.status}
                </div>

                <div>
                  <span className="font-semibold">Genres:</span> {show.genres.split(',').join(', ')}
                </div>
                
                <div>
                  <span className="font-semibold">Language:</span> {show.language}
                </div>
                
                <div>
                  <span className="font-semibold">Premiered:</span> {show.premiered}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}