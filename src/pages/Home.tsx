import React from "react";
import "../styles/global.scss";
import "../styles/style.scss";
import { Link } from "react-router-dom";
const todayAlbums = [
    { title: "Nhạc Phim", img: "/image/default-music.png", artist: "Nhiều nghệ sĩ" },
    { title: "Nhạc Remix", img: "/image/default-music.png", artist: "DJ Remix" },
    { title: "Nhạc Trẻ", img: "/image/default-music.png", artist: "Sơn Tùng M-TP" },
    { title: "Nhạc Hàn", img: "/image/default-music.png", artist: "BTS" },
    { title: "Nhạc Hoa", img: "/image/default-music.png", artist: "Châu Kiệt Luân" },
];

const top100 = [
    { title: "Top100Today", img: "/image/default-music.png", artist: "Ali Hoàng Dương" },
    { title: "TOP100TUANMOI", img: "/image/default-music.png", artist: "Ali Hoàng Dương" },
    { title: "TOP100 THÁNG 4", img: "/image/default-music.png", artist: "Ali Hoàng Dương" },
    { title: "testTop100_01", img: "/image/default-music.png", artist: "Giang Hồng Ngọc" },
    { title: "testTop100", img: "/image/default-music.png", artist: "Giang Hồng Ngọc" },
];

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

const Home: React.FC = () => (
    <div className="home-content">
        <h2 className="section-title">What to listen today</h2>
        <div className="album-list">
            {todayAlbums.map((album, idx) => (
                <div className="album-item" key={idx}>
                    <img src={album.img} alt={album.title} />
                    <div className="album-title">{album.title}</div>
                </div>
            ))}
        </div>

        <h2 className="section-title">TOP 100 Music</h2>
        <div className="top100-list">
            {top100.map((item, idx) => (
                <Link
                    to={`/top100/${idx}`}
                    className="top100-item"
                    key={idx}
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
    </div>
);

export default Home;
