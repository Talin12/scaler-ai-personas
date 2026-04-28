export default function SuggestionChips({ suggestions, onSelect }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 pb-6 pt-2 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="text-sm font-semibold text-white">Quick start</div>
        <div className="mt-1 text-sm text-white/70">
          Try one of these to start the conversation.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSelect(s)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white/90 transition hover:border-white/20 hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

