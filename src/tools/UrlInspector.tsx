import { useMemo, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { inputClass, btnClass, labelClass, errorClass } from '../components/ui'

const SAMPLE = 'https://user:pass@www.example.com:8080/path/to/page?q=devkit&lang=en#section-2'

interface Parsed {
  parts: { label: string; value: string }[]
  params: { key: string; value: string }[]
  error: string
}

function parseUrl(input: string): Parsed {
  const empty: Parsed = { parts: [], params: [], error: '' }
  const t = input.trim()
  if (!t) return empty
  try {
    const u = new URL(t)
    const parts = [
      { label: 'Origin', value: u.origin },
      { label: 'Protocol', value: u.protocol },
      { label: 'Host', value: u.host },
      { label: 'Hostname', value: u.hostname },
      { label: 'Port', value: u.port || '(default)' },
      { label: 'Path', value: u.pathname },
      { label: 'Query', value: u.search || '(none)' },
      { label: 'Fragment', value: u.hash || '(none)' },
    ]
    const params = [...u.searchParams.entries()].map(([key, value]) => ({ key, value }))
    return { parts, params, error: '' }
  } catch {
    return { ...empty, error: 'Not a valid absolute URL (include the scheme, e.g. https://…).' }
  }
}

export default function UrlInspector() {
  const [input, setInput] = useState('')
  const parsed = useMemo(() => parseUrl(input), [input])

  return (
    <ToolLayout
      title="URL Inspector"
      description="Break a URL into its components and list every query parameter."
    >
      <div className="mb-2 flex flex-wrap gap-2">
        <button className={btnClass} onClick={() => setInput(SAMPLE)}>
          Load sample
        </button>
        <button className={btnClass} onClick={() => setInput('')}>
          Clear
        </button>
      </div>

      <label className={labelClass}>URL</label>
      <input
        className={inputClass + ' font-mono'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="https://example.com/path?key=value"
        spellCheck={false}
      />

      {parsed.error && <p className={errorClass}>⚠ {parsed.error}</p>}

      {parsed.parts.length > 0 && (
        <>
          <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1">
            {parsed.parts.map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between gap-2 border-b border-slate-800 py-2 last:border-0"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">{p.label}</span>
                <div className="flex min-w-0 items-center gap-2">
                  <code className="truncate text-sm text-slate-200">{p.value}</code>
                  <CopyButton value={p.value} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className={labelClass}>
              Query parameters ({parsed.params.length})
            </label>
            {parsed.params.length === 0 ? (
              <p className="text-sm text-slate-500">No query parameters.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase text-slate-500">
                      <th className="border-b border-slate-700 py-2 pr-4">Key</th>
                      <th className="border-b border-slate-700 py-2">Value</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {parsed.params.map((p, i) => (
                      <tr key={i}>
                        <td className="border-b border-slate-800 py-2 pr-4 text-indigo-300">{p.key}</td>
                        <td className="border-b border-slate-800 py-2 text-slate-300">{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </ToolLayout>
  )
}
