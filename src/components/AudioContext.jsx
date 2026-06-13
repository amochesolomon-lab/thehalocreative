import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { previewTracks } from '../data/siteData';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  console.log("AudioProvider rendering");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  
  const currentTrack = previewTracks[currentTrackIndex];

  // Initialize Audio instance properly
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    // Add pause event listener for debugging
    const handlePause = () => console.log("Audio instance paused");
    audioRef.current.addEventListener('pause', handlePause);

    return () => {
      console.log("Cleaning up Audio instance");
      audioRef.current.removeEventListener('pause', handlePause);
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    console.log("Updating Audio source:", currentTrack.src);
    const wasPlaying = !audioRef.current.paused;
    audioRef.current.src = currentTrack.src;
    if (wasPlaying) {
      audioRef.current.play().catch(err => console.error("Audio playback error:", err));
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % previewTracks.length);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, currentTrack, togglePlay, handleNext, muted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
