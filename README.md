# Slice - Local Sample Browser

Slice is a desktop-inspired web application for browsing and managing your local audio sample library. Similar to Splice Sounds, but designed to work with your existing library of royalty-free samples stored locally on your machine.

## Features

- **Sample Browser**: Browse your audio samples by category, sample pack, or file type
- **Audio Preview**: Preview samples directly in the app with waveform visualization
- **Favorites System**: Mark samples as favorites for quick access
- **Filtering System**: Filter samples by multiple criteria
- **Local Storage**: Works with your existing folder structure of audio samples

## Technology Stack

- **Next.js**: React framework with App Router
- **TypeScript**: For type-safe code
- **TailwindCSS**: For styling
- **Howler.js**: Audio playback
- **LocalStorage API**: For storing user preferences

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/slice.git
cd slice
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Go to the Settings page and set your Sample Directory path
2. Browse your samples in the Browser page
3. Preview samples by clicking on them
4. Add samples to your favorites by clicking the heart icon

## Demo Limitations

This web app is currently a demo with the following limitations:

- It uses mock data instead of reading actual files from your file system
- Audio samples are loaded from external URLs for demonstration purposes
- In a full implementation, it would use the File System API or be wrapped in a desktop application using Electron or Tauri

## Roadmap

- Add waveform visualization for audio files
- Implement tagging system for custom organization
- Add BPM and key detection for music samples
- Integrate with a desktop framework for full file system access
- Add drag and drop support to DAWs

## License

This project is licensed under the MIT License - see the LICENSE file for details.
