import Link from "next/link";
import { HomeIcon, FolderIcon, HeartIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold mr-1">Slice</span>
              <span className="text-blue-400 text-xl font-bold">Samples</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <NavLink href="/" icon={<HomeIcon className="w-5 h-5" />} label="Home" />
            <NavLink href="/browser" icon={<FolderIcon className="w-5 h-5" />} label="Browser" />
            <NavLink href="/favorites" icon={<HeartIcon className="w-5 h-5" />} label="Favorites" />
            <NavLink href="/settings" icon={<Cog6ToothIcon className="w-5 h-5" />} label="Settings" />
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700"
    >
      {icon}
      <span className="ml-2 hidden md:block">{label}</span>
    </Link>
  );
} 