'use client';

import { useState } from 'react';
import { STATUS_CONFIG, STATUS_ORDER } from './statusConfig';
import BookForm from './BookForm';

export default function BookCard({ book, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const config = STATUS_CONFIG[book.status];

  if (editing) {
    return (
      <BookForm
        initialBook={book}
        onCancel={() => setEditing(false)}
        onSubmit={async (values) => {
          await onUpdate(book._id, values);
          setEditing(false);
        }}
      />
    );
  }

  const handleStatusChange = async (status) => {
    if (status === book.status) return;
    setBusy(true);
    try {
      await onUpdate(book._id, { status });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove "${book.title}" from your shelf?`)) return;
    setBusy(true);
    try {
      await onDelete(book._id);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`bg-paper-card rounded-sm2 border-l-4 border border-ink/5 shadow-shelf p-5 flex flex-col gap-3 transition-opacity ${
        busy ? 'opacity-60' : ''
      }`}
      style={{ borderLeftColor: statusBorderColor(book.status) }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg text-ink truncate">{book.title}</h3>
          <p className="text-sm text-ink-soft truncate">{book.author}</p>
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}
        >
          {config.label}
        </span>
      </div>

      {book.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-ink-faint bg-paper-dim px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-ink/8">
        <div className="flex gap-1">
          {STATUS_ORDER.map((status) => (
            <button
              key={status}
              disabled={busy}
              onClick={() => handleStatusChange(status)}
              title={`Mark as ${STATUS_CONFIG[status].label}`}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-transform hover:scale-110 ${
                book.status === status
                  ? `${STATUS_CONFIG[status].dot} border-transparent`
                  : 'bg-transparent border-ink/20'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-ink-soft hover:text-pine transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs font-medium text-ink-soft hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function statusBorderColor(status) {
  switch (status) {
    case 'want-to-read':
      return '#5B7C99';
    case 'reading':
      return '#C68D2E';
    case 'completed':
      return '#3F7D5C';
    default:
      return 'transparent';
  }
}
