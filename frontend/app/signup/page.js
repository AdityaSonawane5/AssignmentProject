'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await signup(form);
      router.push('/dashboard');
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
          <p className="text-ink-soft mt-2 text-sm">
            Create your shelf — it only takes a moment.
          </p>
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

          <Field
            label="Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            minLength={8}
            helper="At least 8 characters."
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-pine text-white font-medium py-2.5 rounded-sm2 hover:bg-pine-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating your shelf…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-soft mt-6">
          Already have a shelf?{' '}
          <Link href="/login" className="text-pine font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({ label, helper, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-soft">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
      />
      {helper && <span className="text-xs text-ink-faint mt-1 block">{helper}</span>}
    </label>
  );
}
