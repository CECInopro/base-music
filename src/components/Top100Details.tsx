import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import AudioPlay from "./AudioPlay";
import "../styles/top100details.scss";

const songs = [
    { id: 1, title: "Muon roi ma sao con", artist: "Son Tung MTP", duration: "4:01", img: "/image/default-music.png", audio: "https://maobsgjuildrbytcgfwj.supabase.co/storage/v1/object/public/music-file//MuonRoiMaSaoCon-SonTungMTP-7011803.mp3" },
    { id: 2, title: "Nhat", artist: "Phan Manh Quynh", duration: "3:28", img: "/image/default-music.png", audio: "https://maobsgjuildrbytcgfwj.supabase.co/storage/v1/object/public/music-file//Nhat-PhanManhQuynh-5987005.mp3" },
    { id: 3, title: "Hay Trao Cho Anh", artist: "Son Tung MTP", duration: "4:05", img: "/image/default-music.png", audio: "https://maobsgjuildrbytcgfwj.supabase.co/storage/v1/object/public/music-file//HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3" },
    { id: 4, title: "Chung Ta Cua Hien Tai", artist: "Son Tung MTP", duration: "5:01", img: "/image/default-music.png", audio: "https://maobsgjuildrbytcgfwj.supabase.co/storage/v1/object/public/music-file//ChungTaCuaHienTai-SonTungMTP-6892340.mp3" },
    { id: 5, title: "De Mi Noi Cho Ma Nghe", artist: "Hoang Thuy Linh", duration: "3:45", img: "/image/default-music.png", audio: "https://maobsgjuildrbytcgfwj.supabase.co/storage/v1/object/public/music-file//DeMiNoiChoMaNghe-HoangThuyLinh-6153588.mp3" },
    { id: 6, title: "HongKong1", artist: "Nguyen Trong Tai", duration: "4:05", img: "/image/default-music.png" },
    { id: 7, title: "Tinh Yeu Mau Nang", artist: "Doan Hieu", duration: "3:40", img: "/image/default-music.png" },
    { id: 8, title: "Laylalay", artist: "Jack", duration: "3:55", img: "/image/default-music.png" },
    { id: 9, title: "Bac Phan", artist: "Jack", duration: "4:20", img: "/image/default-music.png" },
    { id: 10, title: "Co Ai Thuong Em Nhu Anh", artist: "Toc Tien", duration: "4:10", img: "/image/default-music.png" },
    { id: 11, title: "Anh O Day Ma", artist: "Duc Phuc", duration: "3:50", img: "/image/default-music.png" },
    { id: 12, title: "Yeu Duong Kho Qua Thi Chay Ve Khoc Voi Anh", artist: "Erik", duration: "4:25", img: "/image/default-music.png" },
    { id: 13, title: "Buon Hay Vui", artist: "Ho Quang Hieu", duration: "3:40", img: "/image/default-music.png" },
    { id: 14, title: "Thuong Em La Dieu Anh Khong The Ngo", artist: "Noo Phuoc Thinh", duration: "4:15", img: "/image/default-music.png" },
    { id: 15, title: "Tinh Yeu Khong Co Loi", artist: "My Tam", duration: "4:05", img: "/image/default-music.png" },
    { id: 16, title: "Mot Buoc Yeu Van Dam Dau", artist: "Mr. Siro", duration: "5:00", img: "/image/default-music.png" },
    { id: 17, title: "Anh Sai Roi", artist: "Son Tung MTP", duration: "3:58", img: "/image/default-music.png" },
    { id: 18, title: "Co Em Cho", artist: "Madihu", duration: "4:11", img: "/image/default-music.png" },
    { id: 19, title: "Ngay Khong Em", artist: "Thang Crazy", duration: "4:08", img: "/image/default-music.png" },
    { id: 20, title: "Xin Dung Lang Quen", artist: "Trinh Thang Binh", duration: "4:02", img: "/image/default-music.png" },
    { id: 21, title: "Cu Chill Thoi", artist: "Chillies", duration: "3:49", img: "/image/default-music.png" },
    { id: 22, title: "Cai Ten Ky Dieu", artist: "Hoa Minzy", duration: "4:20", img: "/image/default-music.png" },
    { id: 23, title: "Em Day Chang Phai Thuy Kieu", artist: "Hoang Thuy Linh", duration: "3:33", img: "/image/default-music.png" },
    { id: 24, title: "Nang Tho", artist: "Hoang Dung", duration: "4:18", img: "/image/default-music.png" },
    { id: 25, title: "Anh Dung Di", artist: "Nguyen Tran Trung Quan", duration: "4:30", img: "/image/default-music.png" },
    { id: 26, title: "Tu Ngay Em Den", artist: "Da LAB", duration: "3:56", img: "/image/default-music.png" },
    { id: 27, title: "Thang Tu La Loi Noi Doi Cua Em", artist: "Ha Anh Tuan", duration: "4:15", img: "/image/default-music.png" },
    { id: 28, title: "Vung Ky Uc", artist: "Nguyen Trong Tai", duration: "4:07", img: "/image/default-music.png" },
    { id: 29, title: "Chung Ta Khong Thuoc Ve Nhau", artist: "Son Tung MTP", duration: "4:00", img: "/image/default-music.png" },
    { id: 30, title: "Em Gai Mua", artist: "Huong Tram", duration: "4:12", img: "/image/default-music.png" },
    { id: 31, title: "Nguoi Am Phu", artist: "OSAD", duration: "3:42", img: "/image/default-music.png" },
    { id: 32, title: "Mot Nha", artist: "Da LAB", duration: "4:09", img: "/image/default-music.png" },
    { id: 33, title: "Tinh Da Day", artist: "B Ray", duration: "4:16", img: "/image/default-music.png" }
];


const Top100Details: React.FC = () => {
    const [currentSongId, setCurrentSongId] = useState<number | null>(null);
    const [isShowPlayer, setIsShowPlayer] = useState(false);

    const handlePlayById = (id: number) => {
        setCurrentSongId(id);
        setIsShowPlayer(true);
    };

    const currentSong = songs.find(song => song.id === currentSongId);

    return (
        <div className="top100-details">
            <div className="top100-layout">
                <div className="album-info">
                    <img src="/image/default-music.png" alt="Album" />
                    <h2>Nhạc Phim</h2>
                    <div className="album-desc">Many singers - 36 Songs</div>
                    <button className="play-btn" onClick={() => handlePlayById(songs[0].id)}>
                        <span className="play-icon">▶</span> Play all
                    </button>
                    <div className="album-actions">
                        <button className="icon-btn" title="Favorite"><span>♡</span></button>
                        <button className="icon-btn" title="Share"><span>↗</span></button>
                    </div>
                </div>
                <div className="songs-list">
                    <div className="songs-header">
                        <div className="col-index">#</div>
                        <div className="col-img"></div>
                        <div className="col-title">Title</div>
                        <div className="col-artist">Artist</div>
                        <div className="col-album">Album</div>
                        <div className="col-duration">Duration</div>
                    </div>
                    {songs.map((song, idx) => (
                        <div
                            className="song-row"
                            key={song.id}
                            onClick={() => handlePlayById(song.id)}
                            style={{ cursor: "pointer", background: currentSongId === song.id ? "#3a1818" : undefined }}
                        >
                            <div className="col-index">{idx + 1}</div>
                            <div className="col-img">
                                <img src={song.img} alt={song.title} />
                            </div>
                            <div className="col-title">{song.title}</div>
                            <div className="col-artist">{song.artist}</div>
                            <div className="col-album">Nhạc Phim</div>
                            <div className="col-duration">{song.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
            {isShowPlayer && currentSong && (
                <AudioPlay
                    song={currentSong}
                    onPrev={() => {
                        let idx = songs.findIndex(s => s.id === currentSongId);
                        const prevIdx = (idx - 1 + songs.length) % songs.length;
                        setCurrentSongId(songs[prevIdx].id);
                    }}
                    onNext={() => {
                        let idx = songs.findIndex(s => s.id === currentSongId);
                        const nextIdx = (idx + 1) % songs.length;
                        setCurrentSongId(songs[nextIdx].id);
                    }}
                />
            )}
        </div>
    );
};

export default Top100Details;