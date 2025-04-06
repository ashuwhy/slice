'use client';

import { useState } from 'react';
import Header from '../components/Header';
import SampleFilters, { FilterState } from '../components/SampleFilters';
import SampleCard from '../components/SampleCard';
import useSamples from '../hooks/useSamples';
import { filterSamples } from '../lib/sampleUtils';

export default function BrowserPage() {
  const { samples, categories, packs, fileTypes, isLoading, error, handleToggleFavorite } = useSamples();
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: '',
    selectedCategories: [],
    selectedPacks: [],
    selectedFileTypes: [],
    showFavoritesOnly: false
  });

  const filteredSamples = filterSamples(
    samples,
    filterState.searchTerm,
    filterState.selectedCategories,
    filterState.selectedPacks,
    filterState.selectedFileTypes,
    filterState.showFavoritesOnly
  );

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Sample Browser</h1>
        
        {error ? (
          <div className="bg-red-900/50 border border-red-600 rounded-md p-6 my-4">
            <h2 className="text-xl font-semibold mb-2 text-red-200">Error Loading Samples</h2>
            <p className="text-red-200">{error}</p>
            <p className="mt-4 text-red-200">
              Please check if the sample directory is correctly set in the settings page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SampleFilters
                categories={categories}
                packs={packs}
                fileTypes={fileTypes}
                onFilterChange={setFilterState}
              />
            </div>
            
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-60">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredSamples.length === 0 ? (
                <div className="bg-slate-800 rounded-lg p-6 text-center">
                  <p className="text-gray-400">No samples found matching your filters.</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-400">
                      Showing {filteredSamples.length} of {samples.length} samples
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSamples.map((sample) => (
                      <SampleCard
                        key={sample.id}
                        sample={sample}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
} 