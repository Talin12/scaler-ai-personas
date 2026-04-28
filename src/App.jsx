import { useMemo, useState } from 'react'
import ChatWindow from './components/ChatWindow.jsx'
import PersonaSwitcher from './components/PersonaSwitcher.jsx'
import SuggestionChips from './components/SuggestionChips.jsx'
import TypingIndicator from './components/TypingIndicator.jsx'
import anshumanSystemPrompt from './prompts/anshumanPrompt.js'
import abhimanyuSystemPrompt from './prompts/abhimanyuPrompt.js'
import kshitijSystemPrompt from './prompts/kshitijPrompt.js'

const OPENROUTER_MODEL = 'openrouter/auto'
const MAX_TOKENS = 1000

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function extractOpenRouterReplyText(data) {
  return data?.choices?.[0]?.message?.content
}

async function callOpenRouter({ apiKey, systemPrompt, history }) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: 'system', content: systemPrompt }, ...history],
      max_tokens: MAX_TOKENS,
    }),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error('bad_response')
  return data
}

export default function App() {
  const personas = useMemo(
    () => [
      {
        id: 'anshuman',
        name: 'Anshuman Singh',
        initial: 'A',
        color: '#FF6B35',
        systemPrompt: anshumanSystemPrompt,
        suggestions: [
          'How do I crack FAANG interviews?',
          "What's your advice for DSA preparation?",
          'How did you build Scaler?',
        ],
      },
      {
        id: 'abhimanyu',
        name: 'Abhimanyu Saxena',
        initial: 'A',
        color: '#7C3AED',
        systemPrompt: abhimanyuSystemPrompt,
        suggestions: [
          'How did InterviewBit start?',
          'What makes a great software engineer?',
          'How do you think about company culture?',
        ],
      },
      {
        id: 'kshitij',
        name: 'Kshitij Mishra',
        initial: 'K',
        color: '#06B6D4',
        systemPrompt: kshitijSystemPrompt,
        suggestions: [
          'How should I approach competitive programming?',
          "What's your system design advice?",
          'How do you stay motivated as an engineer?',
        ],
      },
    ],
    [],
  )

  const [activePersonaId, setActivePersonaId] = useState(personas[0].id)
  const activePersona = personas.find((p) => p.id === activePersonaId) ?? personas[0]

  const [history, setHistory] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [ids, setIds] = useState([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  function resetConversation(nextPersonaId) {
    setActivePersonaId(nextPersonaId)
    setHistory([])
    setTimestamps([])
    setIds([])
    setDraft('')
    setError('')
    setIsLoading(false)
  }

  async function send(text) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    setError('')

    if (!apiKey) {
      setError(
        'Missing API key. Add VITE_OPENROUTER_API_KEY to your .env file and restart the dev server.',
      )
      return
    }

    const now = Date.now()
    const userId = uid()
    const userTurn = { role: 'user', content: trimmed }
    const nextHistory = [...history, userTurn]
    setHistory(nextHistory)
    setTimestamps((prev) => [...prev, now])
    setIds((prev) => [...prev, userId])
    setDraft('')
    setIsLoading(true)

    try {
      const data = await callOpenRouter({
        apiKey,
        systemPrompt: activePersona.systemPrompt,
        history: nextHistory,
      })
      const reply = extractOpenRouterReplyText(data)
      if (!reply) {
        setError('Something went wrong. Please try again.')
        return
      }

      const assistantId = uid()
      const assistantTurn = { role: 'assistant', content: reply }
      setHistory((prev) => [...prev, assistantTurn])
      setTimestamps((prev) => [...prev, Date.now()])
      setIds((prev) => [...prev, assistantId])
    } catch (e) {
      if (e instanceof TypeError) {
        setError('Network error. Check your connection.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const emptyStateNode = (
    <SuggestionChips
      suggestions={activePersona.suggestions}
      onSelect={(s) => {
        setDraft(s)
        send(s)
      }}
    />
  )

  return (
    <div className="flex h-dvh flex-col bg-[#0b0d12] text-white">
      <PersonaSwitcher personas={personas} activePersonaId={activePersonaId} onSelect={resetConversation} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <ChatWindow
          persona={activePersona}
          messages={history.map((m, idx) => ({
            id: ids[idx] ?? String(idx),
            role: m.role,
            content: m.content ?? '',
            timestamp: timestamps[idx] ?? Date.now(),
          }))}
          isLoading={isLoading}
          error={error}
          typingNode={<TypingIndicator label={`${activePersona.name} is typing`} />}
          emptyStateNode={emptyStateNode}
        />

        <div className="shrink-0 border-t border-white/10 bg-[#0b0d12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0d12]/60">
          <div className="mx-auto w-full max-w-5xl px-3 py-3 sm:px-6">
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(draft)
                  }
                }}
                placeholder={`Message ${activePersona.name}...`}
                className="min-h-[44px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 shadow-sm outline-none focus:border-[#FF6B35]/50"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => send(draft)}
                disabled={isLoading || !draft.trim()}
                className="rounded-2xl bg-[#FF6B35] px-4 py-3 text-sm font-semibold text-black shadow-sm transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-white/50">
              <div>
                <span className="text-white/70">Tip:</span> Press Enter to send, Shift+Enter for a new line.
              </div>
              <div className="hidden sm:block">
                Active persona:{' '}
                <span className="font-semibold" style={{ color: activePersona.color }}>
                  {activePersona.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}