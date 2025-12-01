import Link from 'next/link';
import { LogIn, UserPlus, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="page-bg flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="card text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 mb-6 shadow-glow">
            <Zap className="w-10 h-10 text-black" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-3">
            User Dashboard
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
            A secure authentication system with profile management
          </p>
          
          <div className="space-y-4">
            <Link
              href="/login"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Sign In
            </Link>
            
            <Link
              href="/signup"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-zinc-400 text-sm text-center">
            <span className="text-cyan-400 font-medium">Demo Account:</span>{' '}
            demo@example.com / password123
          </p>
        </div>
      </div>
    </main>
  );
}
