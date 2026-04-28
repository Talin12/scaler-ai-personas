export default function PersonaSwitcher({ personas, activePersonaId, onSelect }) {
  return (
    <div className="w-full border-b border-white/10 bg-[#0b0d12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0d12]/60">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-3 py-3 sm:px-6">
        <div className="flex flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {personas.map((p) => {
            const active = p.id === activePersonaId
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className={[
                  'group flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left transition',
                  active
                    ? 'border-white/20 bg-white/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10',
                ].join(' ')}
              >
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold text-white"
                  style={{ backgroundColor: p.color }}
                  aria-hidden="true"
                >
                  {p.initial}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-white">{p.name}</span>
                  <span className="text-xs text-white/60">
                    {active ? 'Active persona' : 'Tap to switch'}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 sm:flex">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: '#FF6B35' }} />
          Scaler-style chat
        </div>
      </div>
    </div>
  )
}

