'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FolderIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [samplePath, setSamplePath] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Fetch the current settings from the API
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        
        const data = await response.json();
        if (data.samplesDirectory) {
          setSamplePath(data.samplesDirectory);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings. Using default directory.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSamplePath(e.target.value);
    // Clear previous messages
    setError(null);
    setSuccess(null);
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ samplesDirectory: samplePath }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }
      
      setSuccess('Sample directory path saved! Restart the app to see changes.');
      
      // Trigger a rescan of the samples
      try {
        await fetch('/api/samples');
      } catch (err) {
        console.error('Error rescanning samples:', err);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Sample Directory</h2>
            <p className="text-gray-300 mb-6">
              Set the location where your audio samples are stored on your local drive.
              This should be the root folder that contains all your sample packs.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded-md text-red-200">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-900/50 border border-green-600 rounded-md text-green-200">
                {success}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="samplePath" className="block text-sm font-medium text-gray-300 mb-2">
                Sample Directory Path
              </label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FolderIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="samplePath"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/path/to/your/samples"
                    value={samplePath}
                    onChange={handlePathChange}
                    disabled={isLoading}
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Default: /Volumes/part_one/Music Production/Samples/Cymatics
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-slate-700 rounded-md">
              <h3 className="text-sm font-medium mb-2">Note:</h3>
              <p className="text-sm text-gray-300">
                The app will scan the specified directory for audio samples. 
                This operation may take some time depending on the number of files.
                After changing the directory, a full rescan will be triggered.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-300">
              Slice is a local audio sample browser for music producers. 
              Browse, preview, and organize your sample library offline.
            </p>
            <div className="mt-4 text-sm text-gray-400">
              Version 1.0.0
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 