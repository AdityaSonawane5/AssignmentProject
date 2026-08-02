import BookCard from './BookCard';

export default function BookList({ books, onUpdate, onDelete, hasAnyBooks }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-ink/15 rounded-sm2">
        <p className="font-display text-xl text-ink mb-2">
          {hasAnyBooks ? 'Nothing matches this filter' : 'Your shelf is empty'}
        </p>
        <p className="text-sm text-ink-soft">
          {hasAnyBooks
            ? 'Try a different status or tag.'
            : 'Add the first book to start your collection.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
