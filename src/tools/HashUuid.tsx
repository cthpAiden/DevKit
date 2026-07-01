import { useEffect, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, labelClass } from '../components/ui'

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const
type Algo = (typeof ALGOS)[number]

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function HashUuid() {
  const [text, setText] = useState('')
  const [hashes, setHashes] = useState<Record<Algo, string>>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  })
  const [uuids, setUuids] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    if (!text) {
      setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' })
      return
    }
    const bytes = new TextEncoder().encode(text)
    Promise.all(ALGOS.map((algo) => crypto.subtle.digest(algo, bytes))).then((buffers) => {
      if (cancelled) return
      const next = {} as Record<Algo, string>
      ALGOS.forEach((algo, i) => {
        next[algo] = toHex(buffers[i])
      })
      setHashes(next)
    })
    return () => {
      cancelled = true
    }
  }, [text])

  function generateUuid() {
    setUuids((prev) => [crypto.randomUUID(), ...prev].slice(0, 10))
  }

  return (
    <ToolLayout
      title="Hash & UUID Generator"
      description="Compute cryptographic hashes of text and generate random UUIDs — all via the browser's Web Crypto API."
    >
      <section>
        <label className={labelClass}>Text to hash</label>
        <textarea
          className={areaClass}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text to hash…"
          spellCheck={false}
        />
        <div className="mt-4 space-y-3">
          {ALGOS.map((algo) => (
            <div key={algo}>
              <div className="mb-1 flex items-center justify-between">
                <label className={labelClass}>{algo}</label>
                <CopyButton value={hashes[algo]} />
              </div>
              <div className="break-all rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-300">
                {hashes[algo] || <span className="text-slate-600">—</span>}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          MD5 is intentionally omitted — browsers don&apos;t provide it, and it&apos;s
          considered insecure. Prefer SHA-256 or stronger.
        </p>
      </section>

      <section className="mt-8 border-t border-slate-800 pt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClass}>UUID v4 generator</label>
          <button className={btnClass} onClick={generateUuid}>
            Generate
          </button>
        </div>
        {uuids.length === 0 ? (
          <p className="text-sm text-slate-500">Click “Generate” to create a random UUID.</p>
        ) : (
          <ul className="space-y-2">
            {uuids.map((id, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
              >
                <code className="text-sm text-indigo-300">{id}</code>
                <CopyButton value={id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </ToolLayout>
  )
}
