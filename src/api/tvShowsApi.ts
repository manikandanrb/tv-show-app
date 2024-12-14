import { Response, TVShow } from '../types';
import { fetchApi } from '../utils/api';

export async function searchShow(query: string): Promise<TVShow> {
  return fetchApi<TVShow>(`/shows/search?q=${encodeURIComponent(query)}`);
}

export async function getShows(): Promise<TVShow[]> {
  return fetchApi<TVShow[]>('/shows');
}

export async function getShowDetails(id: number): Promise<TVShow> {
  return fetchApi<TVShow>(`/shows/${id}`);
}

export async function uploadMovies(file: File): Promise<Response<any>> {
  const formdata = new FormData();
  formdata.append("file", file, "tvtitles.txt");
  const requestOptions = {
    method: "POST",
    body: formdata
  };
  return fetchApi<any>(`/shows/process`, requestOptions);
}