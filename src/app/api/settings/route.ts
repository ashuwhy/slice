import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

// Save configuration
async function saveConfig(config: any) {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

// GET handler to retrieve current settings
export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error getting settings:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve settings' },
      { status: 500 }
    );
  }
}

// POST handler to update settings
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { samplesDirectory } = body;
    
    if (!samplesDirectory) {
      return NextResponse.json(
        { error: 'Samples directory path is required' },
        { status: 400 }
      );
    }
    
    // Verify the directory exists
    try {
      await fs.access(samplesDirectory);
    } catch (error) {
      return NextResponse.json(
        { error: 'Directory does not exist or is not accessible' },
        { status: 400 }
      );
    }
    
    // Update and save configuration
    const config = await getConfig();
    config.samplesDirectory = samplesDirectory;
    await saveConfig(config);
    
    // Return success
    return NextResponse.json({ success: true, samplesDirectory });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
} 