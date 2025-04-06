import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
    // Get the full path from the samples registry
    const samplesRegistryPath = path.join(process.cwd(), 'samples-registry.json');
    
    let samplesRegistry;
    try {
      const registryData = await fs.readFile(samplesRegistryPath, 'utf-8');
      samplesRegistry = JSON.parse(registryData);
    } catch (error) {
      return NextResponse.json({ error: 'Sample registry not found' }, { status: 404 });
    }
    
    const sample = samplesRegistry.find((s: any) => s.id === id);
    
    if (!sample) {
      return NextResponse.json({ error: 'Sample not found' }, { status: 404 });
    }
    
    const filePath = sample.path;
    
    try {
      const fileBuffer = await fs.readFile(filePath);
      
      // Determine content type based on file extension
      const ext = path.extname(filePath).toLowerCase();
      
      let contentType = 'audio/mpeg'; // Default
      
      if (ext === '.wav') contentType = 'audio/wav';
      else if (ext === '.mp3') contentType = 'audio/mpeg';
      else if (ext === '.ogg') contentType = 'audio/ogg';
      else if (ext === '.flac') contentType = 'audio/flac';
      else if (ext === '.aif' || ext === '.aiff') contentType = 'audio/x-aiff';
      
      // Return the file with appropriate headers
      return new Response(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': fileBuffer.length.toString(),
          'Accept-Ranges': 'bytes',
        },
      });
    } catch (error) {
      console.error('Error reading file:', error);
      return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 