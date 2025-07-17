import React, { useRef, useState, useEffect } from "react";
import "../styles/AudioPlay.scss";
interface Song {
    id: number;
    title: string;
    artist: string;
    img: string;
    audio?: string;
    duration: string;
}

interface AudioPlayProps {
    song: Song;
    onPrev: () => void;
    onNext: () => void;
}

const AudioPlay: React.FC<AudioPlayProps> = ({ song, onPrev, onNext }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
        setIsPlaying(true);
        setCurrentTime(0);
    }, [song]);

    const handleTogglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
        }
    };

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="custom-audio-player">
            <div className="player-info">
                <img src={song.img} alt={song.title} className="player-img" />
                <div>
                    <div className="player-title">{song.title}</div>
                    <div className="player-artist">{song.artist}</div>
                </div>
            </div>
            <div className="player-controls">
                <button onClick={onPrev}>⏮</button>
                <button onClick={handleTogglePlay}>{isPlaying ? "⏸" : "▶"}</button>
                <button onClick={onNext}>⏭</button>
            </div>
            <div className="player-progress">
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min={0}
                    max={audioRef.current?.duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                />
                <span>{formatTime(audioRef.current?.duration || 0)}</span>
            </div>
            {song.audio && (
                <audio
                    ref={audioRef}
                    src={song.audio}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={onNext}
                />
            )}

        </div>
    );
};

export default AudioPlay;
