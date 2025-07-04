import React from "react";


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
    <div className="home-content" style={{ padding: 24, background: '#230505', minHeight: '100vh' }}>
        <h2 style={{ color: '#fff', fontSize: 28, marginBottom: 16 }}>What to listen today</h2>
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            {todayAlbums.map((album, idx) => (
                <div key={idx} style={{ width: 120, textAlign: 'center', background: '#2d0a0a', borderRadius: 12, padding: 12 }}>
                    <img src={album.img} alt={album.title} style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover', margin: '0 auto' }} />
                    <div style={{ color: '#fff', marginTop: 8, fontWeight: 600 }}>{album.title}</div>
                </div>
            ))}
        </div>
        <h2 style={{ color: '#fff', fontSize: 28, marginBottom: 16 }}>TOP 100 Music</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {top100.map((album, idx) => (
                <div key={idx} style={{ width: 160, background: '#2d0a0a', borderRadius: 12, padding: 12, marginBottom: 16 }}>
                    <img src={album.img} alt={album.title} style={{ width: 140, height: 140, borderRadius: 12, objectFit: 'cover', margin: '0 auto' }} />
                    <div style={{ color: '#fff', marginTop: 8, fontWeight: 600 }}>{album.title}</div>
                    <div style={{ color: '#ccc', fontSize: 14 }}>{album.artist}</div>
                </div>
            ))}
        </div>
        <h2 style={{ color: '#fff', fontSize: 28, marginBottom: 16 }}>YouTube Trending</h2>
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            {youtubeTrending.map((item, idx) => (
                <div key={idx} style={{ width: 220, background: '#2d0a0a', borderRadius: 12, padding: 12 }}>
                    <div style={{ position: "relative" }}>
                        <img src={item.img} alt={item.title} style={{ width: "100%", height: 120, borderRadius: 12, objectFit: "cover" }} />
                        <span style={{
                            position: "absolute", right: 8, bottom: 8, background: "rgba(0,0,0,0.7)", color: "#fff",
                            fontSize: 12, borderRadius: 4, padding: "2px 6px"
                        }}>{item.duration}</span>
                    </div>
                    <div style={{ color: '#fff', marginTop: 8, fontWeight: 600, fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                    <div style={{ color: '#ccc', fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.channel}</div>
                </div>
            ))}
        </div>
        <h2 style={{ color: '#fff', fontSize: 28, marginBottom: 16 }}>Favorite artist</h2>
        <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
            {favoriteArtists.map((artist, idx) => (
                <div key={idx} style={{ width: 180, textAlign: 'center' }}>
                    <img src={artist.img} alt={artist.name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", margin: "0 auto", background: "#222" }} />
                    <div style={{ color: '#fff', marginTop: 12, fontWeight: 600, fontSize: 18 }}>{artist.name}</div>
                    <div style={{ color: '#ccc', fontSize: 14 }}>{artist.songs} Songs</div>
                    <div style={{ color: '#ccc', fontSize: 14, marginBottom: 8 }}>{artist.favorite} Favorite</div>
                    <button style={{
                        background: "#ff5722", color: "#fff", border: "none", borderRadius: 24, padding: "8px 24px",
                        fontWeight: 600, fontSize: 16, cursor: "pointer"
                    }}>+ Favorite</button>
                </div>
            ))}
        </div>
    </div>
);

export default Home;