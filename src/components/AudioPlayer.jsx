import { useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { useAudio } from './AudioContext';

export default function AudioPlayer() {
  const { isPlaying, currentTrack, togglePlay, handleNext, muted, toggleMute } = useAudio();
  const [expanded, setExpanded] = useState(false);

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
