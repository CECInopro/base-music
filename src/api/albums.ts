import { fetcher } from './Fetcher';
import type { AlbumSummary, ArtistSummary, ImageSet, SongSummary } from './types';

interface IAlbumFromApi {
  id: string;
  name: string;
  images?: ImageSet;
  artists?: ArtistSummary[];
  // ... các thuộc tính khác từ API
}

interface IAlbumDetailFromApi extends IAlbumFromApi {
  description?: string;
  releaseDate?: string;
  totalTracks?: number;
}

export interface ITransformedAlbumCard {
  id: string;
  image: string;
  title: string;
  artist: string;
}

/**
 * GET /albums/top100
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getTop100Albums(): Promise<ITransformedAlbumCard[]> {
  const albums = await fetcher<IAlbumFromApi[]>({ url: '/albums/top100', method: 'get' });
  return (albums || []).map((a) => ({
    id: a.id,
    image: a.images?.DEFAULT || a.images?.SMALL || '',
    title: a.name,
    artist: (a.artists || []).map((ar) => ar.name).join(', ') || 'Various Artists',
  }));
}

/**
 * GET /albums/{albumId}
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getAlbumDetail(albumId: string): Promise<IAlbumDetailFromApi> {
  return fetcher<IAlbumDetailFromApi>({ url: `/albums/${albumId}`, method: 'get' });
}

/**
 * GET /albums/{albumId}/songs
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function getAlbumSongs(albumId: string): Promise<SongSummary[]> {
  return fetcher<SongSummary[]>({ url: `/albums/${albumId}/songs`, method: 'get' });
} 