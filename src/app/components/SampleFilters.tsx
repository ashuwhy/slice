import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SampleFiltersProps {
  categories: string[];
  packs: string[];
  fileTypes: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  selectedPacks: string[];
  selectedFileTypes: string[];
  showFavoritesOnly: boolean;
}

export default function SampleFilters({ 
  categories, 
  packs, 
  fileTypes, 
  onFilterChange 
}: SampleFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategories: [],
    selectedPacks: [],
    selectedFileTypes: [],
    showFavoritesOnly: false
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, searchTerm: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    const selectedCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    
    const newFilters = { ...filters, selectedCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePackChange = (pack: string) => {
    const selectedPacks = filters.selectedPacks.includes(pack)
      ? filters.selectedPacks.filter(p => p !== pack)
      : [...filters.selectedPacks, pack];
    
    const newFilters = { ...filters, selectedPacks };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFileTypeChange = (fileType: string) => {
    const selectedFileTypes = filters.selectedFileTypes.includes(fileType)
      ? filters.selectedFileTypes.filter(f => f !== fileType)
      : [...filters.selectedFileTypes, fileType];
    
    const newFilters = { ...filters, selectedFileTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFavoritesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, showFavoritesOnly: e.target.checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      searchTerm: '',
      selectedCategories: [],
      selectedPacks: [],
      selectedFileTypes: [],
      showFavoritesOnly: false
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-600 rounded-md bg-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search samples..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-300">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Sample Packs</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {packs.map((pack) => (
              <div key={pack} className="flex items-center">
                <input
                  type="checkbox"
                  id={`pack-${pack}`}
                  checked={filters.selectedPacks.includes(pack)}
                  onChange={() => handlePackChange(pack)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor={`pack-${pack}`} className="ml-2 text-sm text-gray-300">
                  {pack}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">File Types</h3>
        <div className="flex flex-wrap gap-2">
          {fileTypes.map((fileType) => (
            <button
              key={fileType}
              onClick={() => handleFileTypeChange(fileType)}
              className={`text-xs px-3 py-1 rounded-full border ${
                filters.selectedFileTypes.includes(fileType)
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600'
              }`}
            >
              {fileType.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorites-only"
            checked={filters.showFavoritesOnly}
            onChange={handleFavoritesChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="favorites-only" className="ml-2 text-sm text-gray-300">
            Favorites Only
          </label>
        </div>

        <button
          onClick={clearFilters}
          className="flex items-center text-sm text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-4 w-4 mr-1" />
          Clear Filters
        </button>
      </div>
    </div>
  );
} 