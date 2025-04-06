import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Slice <span className="text-blue-400">Samples</span>
          </h1>
          <p className="text-lg text-gray-300">
            Your local audio sample browser for music production
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FolderCard 
            title="Browse Samples"
            description="Browse and preview all your audio samples"
            href="/browser"
          />
          <FolderCard 
            title="Set Sample Directory"
            description="Configure the location of your sample folders"
            href="/settings"
          />
          <FolderCard 
            title="Favorites"
            description="Access your favorite audio samples"
            href="/favorites"
          />
        </div>

        <section className="mt-12 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Go to "Set Sample Directory" to select where your samples are stored</li>
            <li>Browse samples by category, type, or pack name</li>
            <li>Preview sounds directly in the browser</li>
            <li>Mark your favorites for quick access</li>
          </ol>
        </section>
      </div>
    </main>
  );
}

function FolderCard({ 
  title, 
  description, 
  href 
}: { 
  title: string; 
  description: string; 
  href: string 
}) {
  return (
    <Link 
      href={href}
      className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
}
