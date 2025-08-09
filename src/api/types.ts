// Các kiểu dữ liệu dùng chung cho module API

export interface ImageSet {
  SMALL?: string;
  DEFAULT?: string;
  [key: string]: string | undefined;
}

export interface ArtistSummary {
  id: string;
  name: string;
}

export interface PlaylistSummary {
  id: string;
  name: string;
  images?: ImageSet;
  artists?: ArtistSummary[];
}

export interface AlbumSummary {
  id: string;
  name: string;
  images?: ImageSet;
  artists?: ArtistSummary[];
}

export interface SongSummary {
  id: string;
  title: string;
  duration?: number | string;
  images?: ImageSet;
  artists?: ArtistSummary[];
  audio?: string;
} 