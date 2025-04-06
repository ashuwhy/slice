import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { SampleInfo } from '@/app/components/SampleCard';

// Audio file extensions to scan for
const AUDIO_EXTENSIONS = ['.wav', '.mp3', '.ogg', '.flac', '.aif', '.aiff'];

// Configuration file path
const CONFIG_PATH = path.join(process.cwd(), 'app-config.json');

// Default configuration
const DEFAULT_CONFIG = {
  samplesDirectory: '/Volumes/part_one/Music Production/Samples/Cymatics'
};

// Read configuration
async function getConfig() {
  try {
    const fileContent = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or is invalid, return default config
    return DEFAULT_CONFIG;
  }
}

// Function to recursively scan directory and find audio files
async function scanDirectory(dir: string, basePath = ''): Promise<SampleInfo[]> {
  const samples: SampleInfo[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subDirSamples = await scanDirectory(fullPath, relativePath);
        samples.push(...subDirSamples);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        
        // Check if it's an audio file
        if (AUDIO_EXTENSIONS.includes(ext)) {
          // Extract category and pack from path
          const pathParts = relativePath.split(path.sep);
          const fileName = path.basename(entry.name, ext);
          
          // Use the immediate parent folder as the sample pack name
          const pack = pathParts.length > 0 ? pathParts[0] : 'Unknown Pack';
          
          // Try to extract a category from the path or filename
          let category = 'Uncategorized';
          if (pathParts.length > 1) {
            category = pathParts[1];
          }
          
          samples.push({
            id: Buffer.from(fullPath).toString('base64url'),
            name: fileName,
            path: fullPath,
            category,
            pack,
            favorite: false, // Default, will be updated from user storage
            fileType: ext.substring(1), // Remove the dot
            url: `/api/samples/${Buffer.from(fullPath).toString('base64url')}`
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
  
  return samples;
}

// Function to save the samples registry to a file
async function saveSamplesRegistry(samples: SampleInfo[]) {
  try {
    const registryPath = path.join(process.cwd(), 'samples-registry.json');
    await fs.writeFile(registryPath, JSON.stringify(samples, null, 2));
  } catch (error) {
    console.error('Error saving samples registry:', error);
  }
}

export async function GET() {
  try {
    // Get the configured samples directory
    const config = await getConfig();
    const samplesDir = config.samplesDirectory;
    
    console.log(`Scanning directory: ${samplesDir}`);
    
    // Check if the directory exists
    try {
      await fs.access(samplesDir);
    } catch (error) {
      return NextResponse.json(
        { error: `Sample directory not found: ${samplesDir}` },
        { status: 404 }
      );
    }
    
    // Scan the directory for audio files
    const samples = await scanDirectory(samplesDir);
    
    // Save the registry for later use by other endpoints
    await saveSamplesRegistry(samples);
    
    // Return the list of samples
    return NextResponse.json({ samples });
  } catch (error) {
    console.error('Error in samples API:', error);
    return NextResponse.json(
      { error: 'Failed to scan sample directory' },
      { status: 500 }
    );
  }
} 