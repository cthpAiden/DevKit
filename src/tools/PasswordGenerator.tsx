import { useCallback, useEffect, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { btnPrimaryClass, labelClass } from '../components/ui'

const SETS = [
  { id: 'lower', label: 'a-z', chars: 'abcdefghijklmnopqrstuvwxyz' },
  { id: 'upper', label: 'A-Z', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { id: 'digits', label: '0-9', chars: '0123456789' },
  { id: 'symbols', label: '!@#$…', chars: '!@#$%^&*()-_=+[]{};:,.<>?' },
] as const

type SetId = (typeof SETS)[number]['id']

/** Cryptographically secure pick from a character pool. */
function generatePassword(length: number, pool: string): string {
  if (!pool) return ''
  const values = new Uint32Array(length)
  crypto.getRandomValues(values)
  let out = ''
  for (let i = 0; i < length; i++) out += pool[values[i] % pool.length]
  return out
}

function strengthLabel(bits: number): { label: string; color: string } {
  if (bits < 40) return { label: 'Weak', color: 'text-red-400' }
  if (bits < 60) return { label: 'Fair', color: 'text-amber-400' }
  if (bits < 80) return { label: 'Strong', color: 'text-emerald-400' }
  return { label: 'Very strong', color: 'text-emerald-300' }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [enabled, setEnabled] = useState<Record<SetId, boolean>>({
    lower: true,
    upper: true,
    digits: true,
    symbols: false,
  })
  const [password, setPassword] = useState('')

  const pool = SETS.filter((s) => enabled[s.id]).map((s) => s.chars).join('')

  const regenerate = useCallback(() => {
    setPassword(generatePassword(length, pool))
  }, [length, pool])

  useEffect(() => {
    regenerate()
  }, [regenerate])

  const bits = pool ? Math.round(length * Math.log2(pool.length)) : 0
  const strength = strengthLabel(bits)

  function toggle(id: SetId) {
    setEnabled((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      // Never allow an empty pool.
      if (!SETS.some((s) => next[s.id])) return prev
      return next
    })
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong random passwords using the browser's cryptographic RNG. Nothing is stored or sent anywhere."
    >
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <div className="flex items-center gap-3">
          <code className="min-w-0 flex-1 break-all text-lg text-indigo-200">
            {password || '—'}
          </code>
          <CopyButton value={password} />
        </div>
        <div className={`mt-2 text-sm ${strength.color}`}>
          {strength.label} · ~{bits} bits of entropy
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>Length: {length}</label>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {SETS.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={enabled[s.id]}
              onChange={() => toggle(s.id)}
              className="accent-indigo-500"
            />
            <code>{s.label}</code>
          </label>
        ))}
      </div>

      <div className="mt-4">
        <button className={btnPrimaryClass} onClick={regenerate}>
          ↻ Regenerate
        </button>
      </div>
    </ToolLayout>
  )
}
