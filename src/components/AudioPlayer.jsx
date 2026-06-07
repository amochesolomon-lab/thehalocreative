import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { previewTracks } from '../data/siteData';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = previewTracks[currentTrackIndex];

  // Initialize audio object once
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    audioRef.current.src = currentTrack.src;
    
    if (wasPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  }, [currentTrackIndex]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play failed:", err));
    }
  };

  // Handle skip
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % previewTracks.length);
  };

  // Handle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={`audio-player-widget ${expanded ? 'expanded' : 'collapsed'}`}>
      {/* Visualizer Icon Toggle */}
      <button 
        type="button" 
        className="player-toggle" 
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle music player"
      >
        {isPlaying ? (
          <div className="audio-wave">
            <span className="wave-bar bar-1"></span>
            <span className="wave-bar bar-2"></span>
            <span className="wave-bar bar-3"></span>
            <span className="wave-bar bar-4"></span>
          </div>
        ) : (
          <Music className="music-icon" size={18} />
        )}
      </button>

      {/* Expanded Controls Card */}
      {expanded && (
        <div className="player-panel">
          <div className="track-info">
            <span className="track-title">{currentTrack.title}</span>
            <span className="track-album">{currentTrack.album}</span>
          </div>

          <div className="player-controls">
            <button 
              type="button" 
              className="control-btn play-btn" 
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
            </button>
            
            <button 
              type="button" 
              className="control-btn" 
              onClick={handleNext}
              aria-label="Next Track"
            >
              <SkipForward size={16} />
            </button>
            
            <button 
              type="button" 
              className="control-btn" 
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
