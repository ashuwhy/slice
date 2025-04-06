'use client';

import { useState } from 'react';
import Header from '../components/Header';
import SampleCard from '../components/SampleCard';
import useSamples from '../hooks/useSamples';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function FavoritesPage() {
  const { samples, isLoading, error, handleToggleFavorite } = useSamples();
  const [searchTerm, setSearchTerm] = useState('');
  
  const favoriteSamples = samples.filter(sample => 
    sample.favorite && 
    (searchTerm === '' || 
      sample.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.path.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Your Favorite Samples</h1>
          <p className="text-gray-400">Quick access to your favorite audio samples</p>
        </div>
        
        {error ? (
          <div className="bg-red-900/50 border border-red-600 rounded-md p-6 my-4">
            <h2 className="text-xl font-semibold mb-2 text-red-200">Error Loading Samples</h2>
            <p className="text-red-200">{error}</p>
            <p className="mt-4 text-red-200">
              Please check if the sample directory is correctly set in the settings page.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search favorites..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : favoriteSamples.length === 0 ? (
              <div className="bg-slate-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No Favorites Yet</h3>
                <p className="text-gray-400 mb-4">
                  You haven't added any samples to your favorites.
                </p>
                <p className="text-gray-400">
                  Browse samples and click the heart icon to add favorites.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteSamples.map((sample) => (
                  <SampleCard
                    key={sample.id}
                    sample={sample}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
} 