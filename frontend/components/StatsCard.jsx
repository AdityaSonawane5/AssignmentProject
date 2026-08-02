import { STATUS_CONFIG, STATUS_ORDER } from './statusConfig';

export default function StatsCard({ books }) {
  const total = books.length;
  const counts = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = books.filter((b) => b.status === status).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="bg-paper-card rounded-sm2 border border-ink/5 shadow-shelf px-5 py-4">
        <p className="text-3xl font-display text-ink">{total}</p>
        <p className="text-xs text-ink-faint mt-1 uppercase tracking-wide">
          Total books
        </p>
      </div>
      {STATUS_ORDER.map((status) => (
        <div
          key={status}
          className="bg-paper-card rounded-sm2 border border-ink/5 shadow-shelf px-5 py-4"
        >
          <p className={`text-3xl font-display ${STATUS_CONFIG[status].text}`}>
            {counts[status]}
          </p>
          <p className="text-xs text-ink-faint mt-1 uppercase tracking-wide">
            {STATUS_CONFIG[status].label}
          </p>
        </div>
      ))}
    </div>
  );
}
