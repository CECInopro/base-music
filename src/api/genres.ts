import { fetcher } from './Fetcher';
import type { PlaylistSummary } from './types';

export interface IGenreFromApi {
  id: string;
  name: string;
  playlists: Array<PlaylistSummary & { images: { DEFAULT: string; SMALL?: string } }>;
}

/**
 * GET /genres/top
 * Trả về danh sách thể loại kèm các playlists của từng thể loại
 */
export async function getTopGenresPlaylists(): Promise<IGenreFromApi[]> {
  return fetcher<IGenreFromApi[]>({ url: '/genres/top', method: 'get', params: { language: 'vi' } });
}
