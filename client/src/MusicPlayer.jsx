import { useRef, useState, useEffect } from "react";

const STORAGE_KEY = "portfolio_music_on";
const DEFAULT_VOLUME = 0.2;

// Add all your music files here — place them in client/public/music/
const PLAYLIST = [
  "/music/background.mp3",
  "/music/track2.mp3",
  "/music/track4.mp3",
  "/music/track5.mp3",
  "/music/track6.mp3",
];

// Filter to only tracks that actually exist by attempting to load them
// Falls back gracefully if a file is missing

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackName, setTrackName] = useState("");

  const getTrackName = (src) => {
    const parts = src.split("/").pop().replace(".mp3", "");
    return parts.replace(/-/g, " ").replace(/_/g, " ");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = DEFAULT_VOLUME;
    }
    setTrackName(getTrackName(PLAYLIST[0]));

    if (localStorage.getItem(STORAGE_KEY) === "true") {
      const tryPlay = () => {
        audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
        document.removeEventListener("click", tryPlay);
      };
      document.addEventListener("click", tryPlay, { once: true });
      return () => document.removeEventListener("click", tryPlay);
    }
  }, []);

  // When track ends, advance to next track
  const handleEnded = () => {
    const next = (trackIndex + 1) % PLAYLIST.length;
    setTrackIndex(next);
    setTrackName(getTrackName(PLAYLIST[next]));
  };

  // When trackIndex changes and we're playing, load and play the new track
  useEffect(() => {
    if (!audioRef.current || !playing) return;
    audioRef.current.src = PLAYLIST[trackIndex];
    audioRef.current.load();
    audioRef.current.volume = DEFAULT_VOLUME;
    audioRef.current.play().catch(() => {});
  }, [trackIndex]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "false");
    } else {
      audioRef.current.src = PLAYLIST[trackIndex];
      audioRef.current.load();
      audioRef.current.volume = DEFAULT_VOLUME;
      audioRef.current.play().then(() => {
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, "true");
      }).catch(() => {});
    }
  };

  const nextTrack = () => {
    const next = (trackIndex + 1) % PLAYLIST.length;
    setTrackIndex(next);
    setTrackName(getTrackName(PLAYLIST[next]));
    if (playing) {
      audioRef.current.src = PLAYLIST[next];
      audioRef.current.load();
      audioRef.current.volume = DEFAULT_VOLUME;
      audioRef.current.play().catch(() => {});
    }
  };

  const prevTrack = () => {
    const prev = (trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setTrackIndex(prev);
    setTrackName(getTrackName(PLAYLIST[prev]));
    if (playing) {
      audioRef.current.src = PLAYLIST[prev];
      audioRef.current.load();
      audioRef.current.volume = DEFAULT_VOLUME;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleEnded}
        src={PLAYLIST[trackIndex]}
      />

      <div className="music-player">
        <button className="music-nav-btn" onClick={prevTrack} title="Previous track" aria-label="Previous">&#9664;</button>

        <button
          onClick={toggle}
          className="music-toggle-btn"
          title={playing ? "Pause" : "Play"}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? "⏸" : "▶"}
        </button>

        <button className="music-nav-btn" onClick={nextTrack} title="Next track" aria-label="Next">&#9654;</button>

        <div className="music-info">
          <span className="music-icon-small">{playing ? "🔊" : "🔇"}</span>
          <span className="music-track-name">{trackName}</span>
          <span className="music-track-count">{trackIndex + 1}/{PLAYLIST.length}</span>
        </div>
      </div>
    </>
  );
}
