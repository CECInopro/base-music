import React, { useState } from "react";
import "../styles/global.scss";
import "../styles/style.scss";
import { Link } from "react-router-dom";
import AudioPlay from "../components/AudioPlay";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@api/QueryKey";
import { getTop100Playlists } from "@api/playlists";
import { getRecommendedSongs, ITransformedSong } from "@api/songs";

// Dữ liệu mẫu cho danh sách Video Trending (giữ nguyên)
const youtubeTrending = [
    { title: "MV HOT 1", img: "/image/default-music.png", channel: "GRAMMY GOLD", duration: "5:27" },
    { title: "MV HOT 2", img: "/image/default-music.png", channel: "19.Official", duration: "4:44" },
    { title: "MV HOT 3", img: "/image/default-music.png", channel: "Genierock", duration: "3:37" },
    { title: "MV HOT 4", img: "/image/default-music.png", channel: "DOKJAN STUDIO", duration: "5:45" },
    { title: "MV HOT 5", img: "/image/default-music.png", channel: "DOKJAN STUDIO", duration: "4:18" },
];

const favoriteArtists = [
    { name: "Sơn Tùng M-TP", img: "/image/default-avatar.png", songs: 9, favorite: 18 },
    { name: "Thùy Chi", img: "/image/default-avatar.png", songs: 0, favorite: 13 },
    { name: "Hòa Minzy", img: "/image/default-avatar.png", songs: 0, favorite: 11 },
    { name: "Bùi Anh Tuấn", img: "/image/default-avatar.png", songs: 0, favorite: 9 },
    { name: "Bằng Kiều", img: "/image/default-avatar.png", songs: 0, favorite: 7 },
    { name: "Hà Anh Tuấn", img: "/image/default-avatar.png", songs: 0, favorite: 5 },
];

const Home: React.FC = () => {
    const [currentSongId, setCurrentSongId] = useState<number | null>(null);

    // Lấy Top 100 playlists/albums từ API
    const {
        data: top100Data = [],
        isLoading: loadingTop100,
        isError: isErrorTop100,
    } = useQuery({
        queryKey: [QUERY_KEY.TOP_100.GET_LIST_ALBUM_TOP_100],
        queryFn: getTop100Playlists,
    });

    // Lấy danh sách bài hát gợi ý từ API (không cần user; có page/pageSize)
    const page = 1;
    const pageSize = 20;
    const {
        data: recommendedSongs = [],
        isLoading: loadingSongs,
        isError: isErrorSongs,
    } = useQuery<ITransformedSong[]>({
        queryKey: [QUERY_KEY.PLAY_MUSIC.GET_SUGGEST_SONGS, page, pageSize],
        queryFn: () => getRecommendedSongs(page, pageSize),
    });

    // Debug dữ liệu trả về từ API
    console.log("recommendedSongs data:", recommendedSongs);
    console.log("top100Data data:", top100Data);
    console.log("loadingSongs:", loadingSongs, "isErrorSongs:", isErrorSongs);
    console.log("loadingTop100:", loadingTop100, "isErrorTop100:", isErrorTop100);

    // Map dữ liệu bài hát gợi ý sang định dạng AudioPlay đang dùng
    const todaySongs = (recommendedSongs || []).map((song, idx) => ({
        id: idx + 1,
        title: song.title,
        duration: song.duration || "0:00",
        img: song.image || "/image/default-music.png",
        artist: song.artist,
        audio: song.song,
    }));

    const currentSong = todaySongs.find((song) => song.id === currentSongId) || null;

    // Map dữ liệu Top 100 từ API sang cấu trúc UI hiện tại
    const top100 = (top100Data || []).map((item) => ({
        title: item.title,
        img: item.image || "/image/default-music.png",
        artist: item.artist,
    }));

    return (
        <div className="home-content">
            <h2 className="section-title">What to listen today</h2>
            {loadingSongs && <div>Loading songs...</div>}
            {isErrorSongs && <div>Không tải được danh sách gợi ý</div>}
            <div className="song-list">
                {todaySongs.map((song, idx) => (
                    <div className="song-item" key={idx} onClick={() => setCurrentSongId(song.id)}>
                        <img src={song.img} alt={song.title} />
                        <div className="song-title">{song.title}</div>
                        <div className="song-artist">{song.artist}</div>
                    </div>
                ))}
            </div>

            <h2 className="section-title">TOP 100 Music</h2>
            {loadingTop100 && <div>Loading Top 100...</div>}
            {isErrorTop100 && <div>Không tải được Top 100</div>}
            <div className="top100-list">
                {!Array.isArray(top100) && (
                    <div style={{ color: "red" }}>Không lấy được danh sách Top 100 hoặc dữ liệu trả về không hợp lệ.</div>
                )}
                {Array.isArray(top100) && top100.slice(0, 20).map((item, idx) => (
                    <Link
                        to={`/top100/${idx}`}
                        className="top100-item"
                        key={`${item.title}-${idx}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <img src={item.img} alt={item.title} />
                        <div className="top100-title">{item.title}</div>
                        <div className="top100-artist">{item.artist}</div>
                    </Link>
                ))}
            </div>

            <h2 className="section-title">YouTube Trending</h2>
            <div className="youtube-list">
                {youtubeTrending.map((yt, idx) => (
                    <div className="youtube-card" key={idx}>
                        <div className="youtube-thumb">
                            <img src={yt.img} alt={yt.title} />
                            <span className="youtube-duration">{yt.duration}</span>
                        </div>
                        <div className="youtube-title">{yt.title}</div>
                        <div className="youtube-channel">{yt.channel}</div>
                    </div>
                ))}
            </div>

            <h2 className="section-title">Favorite artist</h2>

            <div className="artist-list">
                {favoriteArtists.map((ar, idx) => (
                    <div className="artist-card" key={idx}>
                        <img src={ar.img} alt={ar.name} />
                        <div className="artist-name">{ar.name}</div>
                        <div className="artist-info">{ar.songs} Songs</div>
                        <div className="artist-info">{ar.favorite} Favorite</div>
                        <button className="favorite-btn">+ Favorite</button>
                    </div>
                ))}
            </div>
            {currentSongId && (
                <AudioPlay
                    song={currentSong!}
                    onPrev={() => {
                        const idx = todaySongs.findIndex((s) => s.id === currentSongId);
                        const prevIdx = (idx - 1 + todaySongs.length) % todaySongs.length;
                        setCurrentSongId(todaySongs[prevIdx]?.id ?? null);
                    }}
                    onNext={() => {
                        const idx = todaySongs.findIndex((s) => s.id === currentSongId);
                        const nextIdx = (idx + 1) % todaySongs.length;
                        setCurrentSongId(todaySongs[nextIdx]?.id ?? null);
                    }}
                />
            )}
        </div>

    );
};

export default Home;
