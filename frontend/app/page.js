'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <main className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 sm:px-10 py-6">
        <span className="font-display text-xl tracking-tight text-ink">Shelf</span>
        <nav className="flex items-center gap-3">
          {!loading && user ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-sm2 bg-pine text-white hover:bg-pine-light transition-colors"
            >
              Go to your shelf
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-soft hover:text-ink transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium px-4 py-2 rounded-sm2 bg-pine text-white hover:bg-pine-light transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>

      <section className="flex-1 flex items-center">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16 text-center">
          <p className="text-status-reading font-medium tracking-wide text-sm uppercase mb-4">
            One shelf, quietly kept
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-tight text-ink mb-6">
            Every book you've read,
            <br /> are reading, or mean to.
          </h1>
          <p className="text-ink-soft text-lg max-w-xl mx-auto mb-10">
            Shelf is a small, personal place to keep track of your books —
            no algorithms, no noise, no strangers' opinions. Just your
            collection, exactly as you see it.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-sm2 bg-pine text-white font-medium hover:bg-pine-light transition-colors shadow-shelf"
            >
              Start your shelf
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-sm2 border border-ink/15 text-ink font-medium hover:bg-white transition-colors"
            >
              I already have one
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-10 py-6 text-center text-xs text-ink-faint">
        Built with the MERN stack &amp; Next.js.
      </footer>
    </main>
  );
}
