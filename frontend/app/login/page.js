'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      router.push(searchParams.get('next') || '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl text-ink">
            Shelf
          </Link>
          <p className="text-ink-soft mt-2 text-sm">Welcome back.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-paper-card rounded-sm2 shadow-shelf border border-ink/5 p-6 space-y-4"
        >
          {error && (
            <p className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm2 px-3 py-2">
              {error}
            </p>
          )}

          <label className="block">
            <span className="text-sm font-medium text-ink-soft">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-ink-soft">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-pine text-white font-medium py-2.5 rounded-sm2 hover:bg-pine-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          New here?{' '}
          <Link href="/signup" className="text-pine font-medium hover:underline">
            Create a shelf
          </Link>
        </p>
      </div>
    </main>
  );
}
