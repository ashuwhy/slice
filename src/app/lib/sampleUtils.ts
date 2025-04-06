import { SampleInfo } from '../components/SampleCard';

// In a real app, we would be using File System APIs
// but for the browser-only demo, we'll simulate data

const AUDIO_EXTENSIONS = ['wav', 'mp3', 'ogg', 'flac', 'aif', 'aiff'];

// Mock sample data
const mockSamplePacks = [
  'Drums Collection',
  'Melodic Loops',
  'Bass Essentials',
  'Synth One-Shots',
  'Vocal Chops',
  'FX Elements',
  'Guitar Loops',
  'Foley Sounds'
];

const mockCategories = [
  'Drums',
  'Bass',
  'Synths',
  'FX',
  'Vocals',
  'Guitar',
  'Keys',
  'Percussion'
];

// Function to generate mock sample data
export function generateMockSamples(count: number = 100): SampleInfo[] {
  const samples: SampleInfo[] = [];
  
  for (let i = 0; i < count; i++) {
    const packIndex = Math.floor(Math.random() * mockSamplePacks.length);
    const categoryIndex = Math.floor(Math.random() * mockCategories.length);
    const fileType = AUDIO_EXTENSIONS[Math.floor(Math.random() * AUDIO_EXTENSIONS.length)];
    const pack = mockSamplePacks[packIndex];
    const category = mockCategories[categoryIndex];
    
    samples.push({
      id: `sample-${i}`,
      name: `${category} ${pack} ${i + 1}`,
      path: `/Samples/${pack}/${category}/${category}_${i + 1}.${fileType}`,
      category,
      pack,
      favorite: Math.random() > 0.8, // 20% chance to be favorited
      fileType,
      // In a real app, this would be a FileSystem URL
      // For the demo, we'll use a placeholder
      url: `/api/samples/${i}`, // This would be handled by a server route in a real app
    });
  }
  
  return samples;
}

// Get unique categories from samples
export function getUniqueCategories(samples: SampleInfo[]): string[] {
  const categories = new Set<string>();
  samples.forEach(sample => categories.add(sample.category));
  return Array.from(categories).sort();
}

// Get unique packs from samples
export function getUniquePacks(samples: SampleInfo[]): string[] {
  const packs = new Set<string>();
  samples.forEach(sample => packs.add(sample.pack));
  return Array.from(packs).sort();
}

// Get unique file types from samples
export function getUniqueFileTypes(samples: SampleInfo[]): string[] {
  const fileTypes = new Set<string>();
  samples.forEach(sample => fileTypes.add(sample.fileType));
  return Array.from(fileTypes).sort();
}

// Filter samples based on filter criteria
export function filterSamples(
  samples: SampleInfo[],
  searchTerm: string,
  selectedCategories: string[],
  selectedPacks: string[],
  selectedFileTypes: string[],
  showFavoritesOnly: boolean
): SampleInfo[] {
  return samples.filter(sample => {
    // Filter by search term
    if (
      searchTerm &&
      !sample.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !sample.path.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes(sample.category)) {
      return false;
    }
    
    // Filter by packs
    if (selectedPacks.length > 0 && !selectedPacks.includes(sample.pack)) {
      return false;
    }
    
    // Filter by file types
    if (selectedFileTypes.length > 0 && !selectedFileTypes.includes(sample.fileType)) {
      return false;
    }
    
    // Filter by favorites
    if (showFavoritesOnly && !sample.favorite) {
      return false;
    }
    
    return true;
  });
}

// Save user's sample directory path
export function saveSampleDirectory(path: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sampleDirectoryPath', path);
  }
}

// Load user's sample directory path
export function getSampleDirectory(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sampleDirectoryPath');
  }
  return null;
}

// Toggle favorite status for a sample
export function toggleFavorite(samples: SampleInfo[], sampleId: string): SampleInfo[] {
  return samples.map(sample => {
    if (sample.id === sampleId) {
      return { ...sample, favorite: !sample.favorite };
    }
    return sample;
  });
}

// Save favorites to local storage
export function saveFavorites(samples: SampleInfo[]): void {
  if (typeof window !== 'undefined') {
    const favorites = samples.filter(sample => sample.favorite).map(sample => sample.id);
    localStorage.setItem('sampleFavorites', JSON.stringify(favorites));
  }
}

// Load favorites from local storage and apply to samples
export function loadFavoritesIntoSamples(samples: SampleInfo[]): SampleInfo[] {
  if (typeof window !== 'undefined') {
    const favoritesJson = localStorage.getItem('sampleFavorites');
    if (favoritesJson) {
      try {
        const favorites = JSON.parse(favoritesJson) as string[];
        return samples.map(sample => ({
          ...sample,
          favorite: favorites.includes(sample.id)
        }));
      } catch (error) {
        console.error('Error parsing favorites from localStorage', error);
      }
    }
  }
  return samples;
} 