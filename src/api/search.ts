import { fetcher } from './Fetcher';
import type { AlbumSummary, ArtistSummary, PlaylistSummary, SongSummary } from './types';

export interface ISearchAllResult {
  songs?: SongSummary[];
  artists?: ArtistSummary[];
  playlists?: PlaylistSummary[];
  albums?: AlbumSummary[];
  // ... các nhóm khác nếu có (youtube, etc.)
}

/**
 * GET /search/all?query=...
 * @see https://music.tinasoft.io/api/v1/swagger-ui/index.html
 */
export async function searchAll(query: string): Promise<ISearchAllResult> {
  return fetcher<ISearchAllResult>({ url: `/search/all`, method: 'get', params: { query, language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

/**
 * GET /search/songs?query=...
 */
async function tryManyParams<T>(path: string, query: string): Promise<T> {
  const paramVariants = [
    { query },
    { q: query },
    { keyword: query },
    { keywords: query },
  ];

  // run sequentially to reduce API noise; stop at first non-empty result if it's an array
  for (const params of paramVariants) {
    try {
      const res = await fetcher<T>({ url: path, method: 'get', params: { ...params, language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
      // If T is array-like, prefer non-empty
      if (Array.isArray(res)) {
        if ((res as unknown[]).length > 0) return res;
      } else if (res) {
        return res;
      }
      // continue trying next variant
    } catch {
      // ignore and try next
    }
  }
  // final attempt: default with { query }
  return fetcher<T>({ url: path, method: 'get', params: { query, language: 'vi' }, headers: { language: 'vi', 'X-Accept-Language': 'vi' } });
}

export async function searchSongs(query: string): Promise<SongSummary[]> {
  return tryManyParams<SongSummary[]>(`/search/songs`, query);
}

/**
 * GET /search/artists?query=...
 */
export async function searchArtists(query: string): Promise<ArtistSummary[]> {
  return tryManyParams<ArtistSummary[]>(`/search/artists`, query);
}

/**
 * GET /search/playlists?query=...
 */
export async function searchPlaylists(query: string): Promise<PlaylistSummary[]> {
  return tryManyParams<PlaylistSummary[]>(`/search/playlists`, query);
}

/**
 * GET /search/albums?query=...
 */
export async function searchAlbums(query: string): Promise<AlbumSummary[]> {
  return tryManyParams<AlbumSummary[]>(`/search/albums`, query);
}

/**
 * Robust search-all: try /search/all first; if it fails, query each endpoint in parallel and merge.
 */
export async function searchAllCombined(query: string): Promise<ISearchAllResult> {
  try {
    return await searchAll(query);
  } catch {
    const [songs, artists, playlists, albums] = await Promise.all([
      searchSongs(query).catch(() => []),
      searchArtists(query).catch(() => []),
      searchPlaylists(query).catch(() => []),
      searchAlbums(query).catch(() => []),
    ]);
    return { songs, artists, playlists, albums };
  }
}