import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { Howl } from 'howler';

interface AudioPlayerProps {
  url: string;
  filename: string;
}

export default function AudioPlayer({ url, filename }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(false);
    setProgress(0);
    
    // Cleanup previous sound
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }
    
    // Create a new Howl instance
    soundRef.current = new Howl({
      src: [url],
      format: ['mp3', 'wav'],
      onload: () => {
        setIsLoading(false);
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
      onloaderror: () => {
        setIsLoading(false);
      }
    });
    
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [url]);

  const updateProgress = () => {
    if (soundRef.current && isPlaying) {
      const seek = soundRef.current.seek() || 0;
      const duration = soundRef.current.duration() || 1;
      setProgress((seek / duration) * 100);
      requestRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const togglePlayback = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    } else {
      soundRef.current.play();
      requestRef.current = requestAnimationFrame(updateProgress);
    }
    
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    if (!soundRef.current) return;
    
    soundRef.current.stop();
    soundRef.current.play();
    setIsPlaying(true);
    requestRef.current = requestAnimationFrame(updateProgress);
  };

  return (
    <div className="flex items-center space-x-2 bg-slate-700 p-2 rounded-md">
      <button
        onClick={togglePlayback}
        disabled={isLoading}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <ArrowPathIcon className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <PauseIcon className="w-5 h-5" />
        ) : (
          <PlayIcon className="w-5 h-5" />
        )}
      </button>
      
      <div className="flex-1">
        <div className="text-sm font-medium truncate max-w-xs">{filename}</div>
        <div className="h-2 bg-slate-600 rounded-full mt-1">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <button
        onClick={restart}
        disabled={isLoading}
        className="p-2 rounded-full hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowPathIcon className="w-4 h-4" />
      </button>
    </div>
  );
} 