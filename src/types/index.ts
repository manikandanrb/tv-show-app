export interface TVShow {
  id: number;
  name: string;
  summary: string;
  imageUrl: string;
  networkCountry: string;
  networkName: string; 
  scheduleDays: string;
  scheduleTime: string;
  status: string;
  genres: string;
  premiered: string;
  rating: number;
  language: string;
}

export interface Response<T> {
  data: T;
  status: number;
}