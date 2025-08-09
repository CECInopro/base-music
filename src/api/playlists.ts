import { fetcher } from './Fetcher';
import type { ImageSet, ArtistSummary, SongSummary, PlaylistSummary } from './types';

// 1. Định nghĩa Interface cho dữ liệu PLAYLIST TRẢ VỀ TỪ API
interface IArtistInPlaylistFromApi {
  id: string;
  name: string;
}

interface IImagesInPlaylistFromApi {
  SMALL: string;
  DEFAULT: string;
}

interface IPlaylistFromApi {
  id: string;
  name: string;
  images: IImagesInPlaylistFromApi;
  artists: IArtistInPlaylistFromApi[];
}

// 2. Định nghĩa Interface cho định dạng DỮ LIỆU ĐÍCH (newAlbums)
export interface ITransformedAlbum {
  id: string;
  image: string;
  title: string;
  artist: string;
}

/**
 * GET /playlists/top100 (fallback -> /albums/top100)
 * Lấy danh sách Top 100 Playlists/Albums từ API và chuyển đổi sang định dạng mong muốn.
 */
export async function getTop100Playlists(): Promise<ITransformedAlbum[]> {
  try {
    const fetchedPlaylists: IPlaylistFromApi[] = await fetcher<IPlaylistFromApi[]>({
      url: '/playlists/top100',
      method: 'get',
      params: { language: 'vi' },
      headers: { language: 'vi', 'X-Accept-Language': 'vi' },
    });

    const transformedAlbums: ITransformedAlbum[] = (fetchedPlaylists || []).map((playlist) => ({
      id: playlist.id,
      image: playlist.images?.DEFAULT || playlist.images?.SMALL || '',
      title: playlist.name,
      artist:
        playlist.artists && playlist.artists.length > 0
          ? playlist.artists.map((artist) => artist.name).join(', ')
          : 'Various Artists',
    }));

    return transformedAlbums;
  } catch (error) {
    // Fallback: thử lấy từ /albums/top100 nếu endpoint playlists trả lỗi
    try {
      const fetchedAlbums: Array<{
        id: string;
        name: string;
        images?: { DEFAULT?: string; SMALL?: string };
        artists?: Array<{ id: string; name: string }>;
      }> = await fetcher({ url: '/albums/top100', method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });

      return (fetchedAlbums || []).map((a) => ({
        id: a.id,
        image: a.images?.DEFAULT || a.images?.SMALL || '',
        title: a.name,
        artist: (a.artists || []).map((ar) => ar.name).join(', ') || 'Various Artists',
      }));
    } catch (err) {
      // Ném lại lỗi gốc để React Query xử lý
      throw err;
    }
  }
}

/**
 * GET combined Top 100 from both /playlists/top100 and /albums/top100
 * Merge and deduplicate results to ensure we have more items if one endpoint is sparse.
 */
export async function getTop100Combined(): Promise<ITransformedAlbum[]> {
  const playlistsPromise = fetcher<IPlaylistFromApi[]>({
    url: '/playlists/top100',
    method: 'get',
    params: { language: 'vi' },
    headers: { language: 'vi', 'X-Accept-Language': 'vi' },
  }).catch(() => [] as IPlaylistFromApi[]);

  const albumsPromise = fetcher<Array<{ id: string; name: string; images?: { DEFAULT?: string; SMALL?: string }; artists?: Array<{ id: string; name: string }> }>>({
    url: '/albums/top100',
    method: 'get',
    params: { language: 'vi' },
    headers: { language: 'vi', 'X-Accept-Language': 'vi' },
  }).catch(() => [] as Array<{ id: string; name: string; images?: { DEFAULT?: string; SMALL?: string }; artists?: Array<{ id: string; name: string }> }>);

  const [playlists, albums] = await Promise.all([playlistsPromise, albumsPromise]);

  const fromPlaylists: ITransformedAlbum[] = (playlists || []).map((playlist) => ({
    id: playlist.id,
    image: playlist.images?.DEFAULT || playlist.images?.SMALL || '',
    title: playlist.name,
    artist:
      playlist.artists && playlist.artists.length > 0
        ? playlist.artists.map((artist) => artist.name).join(', ')
        : 'Various Artists',
  }));

  const fromAlbums: ITransformedAlbum[] = (albums || []).map((a) => ({
    id: a.id,
    image: a.images?.DEFAULT || a.images?.SMALL || '',
    title: a.name,
    artist: (a.artists || []).map((ar) => ar.name).join(', ') || 'Various Artists',
  }));

  // Deduplicate by id, preserving order: playlists first, then albums
  const seen = new Set<string>();
  const merged: ITransformedAlbum[] = [];
  for (const item of [...fromPlaylists, ...fromAlbums]) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  }

  return merged;
}

/**
 * GET /playlists/{playlistId}
 */
export async function getPlaylistDetail(playlistId: string): Promise<PlaylistSummary & { images?: ImageSet; artists?: ArtistSummary[]; description?: string }>{
  return fetcher<PlaylistSummary & { images?: ImageSet; artists?: ArtistSummary[]; description?: string }>({ url: `/playlists/${playlistId}`, method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

/**
 * GET /playlists/{playlistId}/songs
 */
export async function getPlaylistSongs(playlistId: string): Promise<SongSummary[]> {
  return fetcher<SongSummary[]>({ url: `/playlists/${playlistId}/songs`, method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

/**
 * GET /playlists/{playlistId}/relevant
 */
export async function getRelevantPlaylists(playlistId: string): Promise<PlaylistSummary[]> {
  return fetcher<PlaylistSummary[]>({ url: `/playlists/${playlistId}/relevant`, method: 'get', params: { language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
} 