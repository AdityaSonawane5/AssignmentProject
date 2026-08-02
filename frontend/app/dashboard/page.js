'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import Navbar from '@/components/Navbar';
import StatsCard from '@/components/StatsCard';
import FilterBar from '@/components/FilterBar';
import BookForm from '@/components/BookForm';
import BookList from '@/components/BookList';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);

  // Client-side route guard: the auth cookie lives on the API's domain, so
  // Next.js middleware on the frontend can't reliably read it once the two
  // are deployed on separate domains. Gating here, after /api/auth/me
  // resolves, works regardless of where each piece is hosted.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=/dashboard');
    }
  }, [authLoading, user, router]);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/api/books', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load your books.');
      setBooks(data.books);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      loadBooks();
    }
  }, [authLoading, user, loadBooks]);

  const handleCreate = async (values) => {
    const res = await apiFetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not add that book.');
    setBooks((prev) => [data.book, ...prev]);
    setShowForm(false);
  };

  const handleUpdate = async (id, values) => {
    const res = await apiFetch(`/api/books/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not update that book.');
    setBooks((prev) => prev.map((b) => (b._id === id ? data.book : b)));
  };

  const handleDelete = async (id) => {
    const res = await apiFetch(`/api/books/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Could not delete that book.');
    }
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  const availableTags = useMemo(() => {
    const set = new Set();
    books.forEach((b) => b.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [books]);

  const visibleBooks = useMemo(() => {
    return books.filter((b) => {
      if (statusFilter && b.status !== statusFilter) return false;
      if (tagFilter && !b.tags.includes(tagFilter)) return false;
      return true;
    });
  }, [books, statusFilter, tagFilter]);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-ink">
              {user ? `${firstName(user.name)}'s shelf` : 'Your shelf'}
            </h1>
            <p className="text-sm text-ink-soft mt-1">
              Everything you're reading, have read, or plan to.
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-pine text-white text-sm font-medium px-4 py-2.5 rounded-sm2 hover:bg-pine-light transition-colors shadow-shelf shrink-0"
            >
              + Add a book
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm2 px-3 py-2 mb-6">
            {error}
          </p>
        )}

        {showForm && (
          <BookForm onCancel={() => setShowForm(false)} onSubmit={handleCreate} />
        )}

        <StatsCard books={books} />

        {books.length > 0 && (
          <FilterBar
            activeStatus={statusFilter}
            onStatusChange={setStatusFilter}
            activeTag={tagFilter}
            onTagChange={setTagFilter}
            availableTags={availableTags}
          />
        )}

        {loading ? (
          <p className="text-sm text-ink-faint">Loading your shelf…</p>
        ) : (
          <BookList
            books={visibleBooks}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            hasAnyBooks={books.length > 0}
          />
        )}
      </main>
    </div>
  );
}

function firstName(name) {
  return name?.split(' ')[0] || '';
}
