import { fetcher } from './Fetcher';
import type { ArtistSummary, PlaylistSummary, SongSummary } from './types';

export interface IArtistDetailFromApi extends ArtistSummary {
  images?: { avatar?: string; cover?: string };
  bio?: string;
}

export interface ITransformedArtist {
  id: string;
  name: string;
  image: string;
  songs?: number;
  favorite?: number;
}

/**
 * GET /artists/{artistId}
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getArtistDetail(artistId: string): Promise<IArtistDetailFromApi> {
  return fetcher<IArtistDetailFromApi>({ url: `/artists/${artistId}`, method: 'get', params: { language: 'vi' } });
}

/**
 * GET /artists/{artistId}/songs
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getArtistSongs(artistId: string): Promise<SongSummary[]> {
  return fetcher<SongSummary[]>({ url: `/artists/${artistId}/songs`, method: 'get', params: { language: 'vi' } });
}

/**
 * GET /artists/{artistId}/playlists
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getArtistPlaylists(artistId: string): Promise<PlaylistSummary[]> {
  return fetcher<PlaylistSummary[]>({ url: `/artists/${artistId}/playlists`, method: 'get', params: { language: 'vi' } });
}

/**
 * GET /artists/favorites
 * Map dữ liệu về định dạng ITransformedArtist dùng cho UI
 */
export async function getFavoriteArtists(): Promise<ITransformedArtist[]> {
  const fetched: IArtistDetailFromApi[] = await fetcher<IArtistDetailFromApi[]>({ url: '/artists/favorites', method: 'get', params: { language: 'vi' } });
  return (fetched || []).map((a) => ({
    id: a.id,
    name: a.name,
    image: a.images?.avatar || '',
  }));
} 