'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, Zap } from 'lucide-react';

export default function Navbar({ userName }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 navbar-glass z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
              <Zap size={18} className="text-black" />
            </div>
            <span className="font-semibold text-white hidden sm:block">User Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            {userName && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/30 to-teal-500/30 flex items-center justify-center">
                  <User size={14} className="text-cyan-400" />
                </div>
                <span className="text-zinc-300 text-sm hidden sm:block">
                  {userName}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-red-400 
                         hover:bg-red-500/10 border border-transparent hover:border-red-500/20
                         transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
