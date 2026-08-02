'use client';

import { useState } from 'react';
import { STATUS_CONFIG, STATUS_ORDER } from './statusConfig';

const emptyForm = { title: '', author: '', tags: '', status: 'want-to-read' };

export default function BookForm({ initialBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    initialBook
      ? {
          title: initialBook.title,
          author: initialBook.author,
          tags: initialBook.tags.join(', '),
          status: initialBook.status,
        }
      : emptyForm
  );
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.author.trim()) {
      setError('Title and author are required.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        author: form.author.trim(),
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status: form.status,
      });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper-card rounded-sm2 border border-ink/8 shadow-shelf p-5 mb-8 space-y-4"
    >
      {error && (
        <p className="text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm2 px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="The Left Hand of Darkness"
            className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Author</span>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            placeholder="Ursula K. Le Guin"
            className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">
            Tags <span className="text-ink-faint font-normal">(comma-separated)</span>
          </span>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="sci-fi, favorites, book club"
            className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink-soft">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm2 border border-ink/15 px-3 py-2 text-sm bg-white focus:border-pine outline-none transition-colors"
          >
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {STATUS_CONFIG[status].label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="bg-pine text-white text-sm font-medium px-4 py-2 rounded-sm2 hover:bg-pine-light transition-colors disabled:opacity-60"
        >
          {submitting
            ? 'Saving…'
            : initialBook
            ? 'Save changes'
            : 'Add to shelf'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium px-4 py-2 rounded-sm2 border border-ink/15 text-ink-soft hover:bg-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
