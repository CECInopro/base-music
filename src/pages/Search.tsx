import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchAllCombined, ISearchAllResult } from '@api/search';

const DEFAULT_IMAGE = '/image/default-music.png';

const Search: React.FC = () => {
  const [params] = useSearchParams();
  const query = (params.get('q') || '').trim();

  const { data, isLoading, isError } = useQuery<ISearchAllResult>({
    queryKey: ['SEARCH_ALL', query],
    queryFn: () => searchAllCombined(query),
    enabled: query.length > 0,
  });

  const noResults = query && !isLoading && data && !(
    (data.songs && data.songs.length > 0) ||
    (data.artists && data.artists.length > 0) ||
    (data.playlists && data.playlists.length > 0) ||
    (data.albums && data.albums.length > 0)
  );

  return (
    <div className="home-content">
      <h2 className="section-title">Search results{query ? ` for "${query}"` : ''}</h2>

      {!query && <div style={{ color: '#fff' }}>Type something in the search bar…</div>}
      {query && isLoading && <div style={{ color: '#fff' }}>Searching…</div>}
      {query && isError && <div style={{ color: 'salmon' }}>Cannot search right now.</div>}
      {noResults && <div style={{ color: '#fff' }}>No results found.</div>}

      {query && !isLoading && data && (
        <>
          {Array.isArray(data.songs) && data.songs.length > 0 && (
            <>
              <h3 className="section-title">Songs</h3>
              <div className="song-list">
                {data.songs.map((s) => (
                  <div key={s.id} className="song-item">
                    <img src={s.images?.DEFAULT || s.images?.SMALL || DEFAULT_IMAGE} alt={s.title} />
                    <div className="song-title">{s.title}</div>
                    <div className="song-artist">{(s.artists || []).map((a) => a.name).join(', ')}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Array.isArray(data.artists) && data.artists.length > 0 && (
            <>
              <h3 className="section-title">Artists</h3>
              <div className="artist-list">
                {data.artists.map((a) => (
                  <div key={a.id} className="artist-card">
                    <img src={DEFAULT_IMAGE} alt={a.name} />
                    <div className="artist-name">{a.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Array.isArray(data.playlists) && data.playlists.length > 0 && (
            <>
              <h3 className="section-title">Playlists</h3>
              <div className="top100-list">
                {data.playlists.map((p) => (
                  <div key={p.id} className="top100-item">
                    <img src={p.images?.DEFAULT || p.images?.SMALL || DEFAULT_IMAGE} alt={p.name} />
                    <div className="top100-title">{p.name}</div>
                    <div className="top100-artist">{(p.artists || []).map((ar) => ar.name).join(', ')}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {Array.isArray(data.albums) && data.albums.length > 0 && (
            <>
              <h3 className="section-title">Albums</h3>
              <div className="top100-list">
                {data.albums.map((a) => (
                  <div key={a.id} className="top100-item">
                    <img src={a.images?.DEFAULT || a.images?.SMALL || DEFAULT_IMAGE} alt={a.name} />
                    <div className="top100-title">{a.name}</div>
                    <div className="top100-artist">{(a.artists || []).map((ar) => ar.name).join(', ')}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;


