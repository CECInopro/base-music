import { fetcher } from './Fetcher';
import type { SongSummary } from './types';

export interface IArtistInSongFromApi {
  id: string;
  name: string;
}

export interface IAudioInSongFromApi {
  id: string;
  url: string;
}

export interface IImagesInSongFromApi {
  SMALL?: string;
  DEFAULT?: string;
}

export interface ISongFromApi {
  id: string;
  name: string;
  duration: number;
  artists?: IArtistInSongFromApi[];
  audios?: IAudioInSongFromApi[];
  images?: IImagesInSongFromApi;
}

export interface ITransformedSong {
  id: string;
  image: string;
  title: string;
  artist: string;
  song: string;
  duration: string;
}

interface ISongDetailFromApi extends SongSummary {
  lyrics?: string;
  views?: number;
  likes?: number;
}

/**
 * GET /songs/{songId}
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getSongById(songId: string): Promise<ISongDetailFromApi> {
  return fetcher<ISongDetailFromApi>({ url: `/songs/${songId}`, method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

/**
 * GET /songs/{songId}/recommended
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getSongsRecommended(songId: string): Promise<SongSummary[]> {
  return fetcher<SongSummary[]>({ url: `/songs/${songId}/recommended`, method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

/**
 * GET /songs/recommended
 * Map dữ liệu về định dạng ITransformedSong dùng cho UI
 */
export async function getRecommendedSongs(page?: number, pageSize?: number): Promise<ITransformedSong[]> {
  const fetched: ISongFromApi[] = await fetcher<ISongFromApi[]>({
    url: '/songs/recommended',
    method: 'get',
    params: { language: 'vi', page, pageSize },
    headers: { language: 'vi', 'X-Accept-Language': 'vi' },
  });
  return (fetched || []).map((song) => ({
    id: song.id,
    image: song.images?.DEFAULT || song.images?.SMALL || '',
    title: song.name,
    artist: (song.artists && song.artists.length > 0) ? song.artists[0].name : 'Unknown Artist',
    song: (song.audios && song.audios.length > 0) ? song.audios[0].url : '',
    duration: String(song.duration ?? ''),
  }));
} 