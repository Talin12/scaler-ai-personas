export default function TypingIndicator({ label = 'Typing' }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">{label}</span>
      <span className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:300ms]" />
      </span>
    </div>
  )
}

