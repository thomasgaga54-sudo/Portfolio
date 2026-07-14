import { useRef, useState, useEffect } from "react";

const STORAGE_KEY = "portfolio_music_on";
const DEFAULT_VOLUME = 0.2;

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = DEFAULT_VOLUME;
    }
    // If user previously had music on, start it on first interaction
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      const tryPlay = () => {
        audioRef.current?.play().then(() => {
          setPlaying(true);
        }).catch(() => {});
        document.removeEventListener("click", tryPlay);
      };
      document.addEventListener("click", tryPlay, { once: true });
      return () => document.removeEventListener("click", tryPlay);
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "false");
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, "true");
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggle}
        className="music-btn"
        title={playing ? "Pause music" : "Play background music"}
        aria-label={playing ? "Pause music" : "Play background music"}
      >
        <span className="music-icon">{playing ? "🔊" : "🔇"}</span>
        <span className="music-label">{playing ? "Music On" : "Music Off"}</span>
      </button>
    </>
  );
}
