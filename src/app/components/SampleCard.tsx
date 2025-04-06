import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import AudioPlayer from './AudioPlayer';

export interface SampleInfo {
  id: string;
  name: string;
  path: string;
  category: string;
  pack: string;
  favorite: boolean;
  fileType: string;
  url: string;
}

interface SampleCardProps {
  sample: SampleInfo;
  onToggleFavorite: (sampleId: string) => void;
}

export default function SampleCard({ sample, onToggleFavorite }: SampleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      <div 
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={handleToggleExpand}
      >
        <div>
          <h3 className="font-medium text-white truncate max-w-xs">{sample.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-400">
            <span className="truncate">{sample.pack}</span>
            <span className="mx-2">•</span>
            <span className="uppercase text-xs bg-slate-700 px-1.5 py-0.5 rounded">
              {sample.fileType}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(sample.id);
          }}
          className="text-gray-400 hover:text-pink-500 focus:outline-none"
        >
          {sample.favorite ? (
            <HeartSolidIcon className="w-5 h-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-700">
          <div className="text-xs text-gray-400 mb-2">
            <span>Path: {sample.path}</span>
          </div>
          <AudioPlayer url={sample.url} filename={sample.name} />
        </div>
      )}
    </div>
  );
} 