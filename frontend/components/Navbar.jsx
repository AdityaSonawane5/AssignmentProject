'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-ink/8">
      <Link href="/dashboard" className="font-display text-xl text-ink">
        Shelf
      </Link>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-ink-soft hidden sm:inline">
            {user.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-4 py-2 rounded-sm2 border border-ink/15 text-ink-soft hover:bg-white hover:text-ink transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
