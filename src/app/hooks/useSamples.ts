import { useState, useEffect } from 'react';
import { SampleInfo } from '../components/SampleCard';
import { 
  getUniqueCategories, 
  getUniquePacks, 
  getUniqueFileTypes,
  toggleFavorite,
  saveFavorites,
  loadFavoritesIntoSamples
} from '../lib/sampleUtils';

export default function useSamples() {
  const [samples, setSamples] = useState<SampleInfo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [packs, setPacks] = useState<string[]>([]);
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSamples = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch samples from our API endpoint
        const response = await fetch('/api/samples');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch samples');
        }
        
        const data = await response.json();
        
        if (!data.samples || !Array.isArray(data.samples)) {
          throw new Error('Invalid response from API');
        }
        
        // Apply favorites from localStorage
        const samplesWithFavorites = loadFavoritesIntoSamples(data.samples);
        
        setSamples(samplesWithFavorites);
        setCategories(getUniqueCategories(samplesWithFavorites));
        setPacks(getUniquePacks(samplesWithFavorites));
        setFileTypes(getUniqueFileTypes(samplesWithFavorites));
      } catch (err) {
        console.error('Error fetching samples:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Use empty arrays to avoid UI issues
        setSamples([]);
        setCategories([]);
        setPacks([]);
        setFileTypes([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSamples();
  }, []);
  
  const handleToggleFavorite = (sampleId: string) => {
    const updatedSamples = toggleFavorite(samples, sampleId);
    setSamples(updatedSamples);
    saveFavorites(updatedSamples);
  };
  
  return {
    samples,
    categories,
    packs,
    fileTypes,
    isLoading,
    error,
    handleToggleFavorite
  };
} 