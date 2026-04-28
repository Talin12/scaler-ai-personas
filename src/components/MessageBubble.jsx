function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function MessageBubble({ message, persona }) {
  const isUser = message.role === 'user'
  const time = formatTime(message.timestamp)

  return (
    <div className={['flex w-full gap-3', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      {!isUser && (
        <div className="mt-1 shrink-0">
          <div
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: persona.color }}
            aria-hidden="true"
          >
            {persona.initial}
          </div>
        </div>
      )}

      <div className={['max-w-[85%] sm:max-w-[70%]', isUser ? 'items-end' : 'items-start'].join(' ')}>
        <div
          className={[
            'rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm',
            isUser
              ? 'border-[#FF6B35]/30 bg-[#FF6B35]/15 text-white'
              : 'border-white/10 bg-white/5 text-white/95',
          ].join(' ')}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        <div className={['mt-1 text-xs text-white/50', isUser ? 'text-right' : 'text-left'].join(' ')}>
          {time}
        </div>
      </div>

      {isUser && <div className="w-9 shrink-0" aria-hidden="true" />}
    </div>
  )
}

