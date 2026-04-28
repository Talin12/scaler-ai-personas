import MessageBubble from './MessageBubble.jsx'

export default function ChatWindow({
  persona,
  messages,
  isLoading,
  error,
  typingNode,
  emptyStateNode,
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-3 sm:px-6">
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-2xl text-sm font-semibold text-white"
            style={{ backgroundColor: persona.color }}
            aria-hidden="true"
          >
            {persona.initial}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">{persona.name}</div>
            <div className="text-xs text-white/60">Persona chat • conversation resets on switch</div>
          </div>
        </div>

        <div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 sm:block">
          Model: <span className="text-white/90">openrouter/auto</span>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03]">
        {messages.length === 0 ? (
          <div className="p-3 sm:p-6">{emptyStateNode}</div>
        ) : (
          <div className="flex flex-col gap-4 p-3 sm:p-6">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} persona={persona} />
            ))}

            {isLoading ? (
              <div className="flex w-full justify-start gap-3">
                <div className="mt-1 shrink-0">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold text-white shadow-sm"
                    style={{ backgroundColor: persona.color }}
                    aria-hidden="true"
                  >
                    {persona.initial}
                  </div>
                </div>
                <div className="max-w-[85%] sm:max-w-[70%]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90">
                    {typingNode}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

