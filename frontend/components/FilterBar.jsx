import { STATUS_CONFIG, STATUS_ORDER } from './statusConfig';

export default function FilterBar({
  activeStatus,
  onStatusChange,
  activeTag,
  onTagChange,
  availableTags,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusChange(null)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
            activeStatus === null
              ? 'bg-ink text-white border-ink'
              : 'border-ink/15 text-ink-soft hover:bg-white'
          }`}
        >
          All
        </button>
        {STATUS_ORDER.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              activeStatus === status
                ? `${STATUS_CONFIG[status].bg} ${STATUS_CONFIG[status].text} border-transparent`
                : 'border-ink/15 text-ink-soft hover:bg-white'
            }`}
          >
            {STATUS_CONFIG[status].label}
          </button>
        ))}
      </div>

      {availableTags.length > 0 && (
        <div className="flex items-center gap-2 sm:ml-auto">
          <label className="text-xs text-ink-faint uppercase tracking-wide">
            Tag
          </label>
          <select
            value={activeTag || ''}
            onChange={(e) => onTagChange(e.target.value || null)}
            className="text-sm rounded-sm2 border border-ink/15 bg-white px-2 py-1.5 focus:border-pine outline-none"
          >
            <option value="">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
