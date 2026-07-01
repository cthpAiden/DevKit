import { useMemo, useState, type ReactNode } from 'react'
import ToolLayout from '../components/ToolLayout'
import { inputClass, areaClass, labelClass, errorClass } from '../components/ui'

const FLAGS = [
  { flag: 'g', label: 'global' },
  { flag: 'i', label: 'ignore case' },
  { flag: 'm', label: 'multiline' },
  { flag: 's', label: 'dotall' },
  { flag: 'u', label: 'unicode' },
]

interface Match {
  start: number
  end: number
  text: string
  groups: (string | undefined)[]
}

function findMatches(re: RegExp, text: string): Match[] {
  const out: Match[] = []
  if (re.global) {
    for (const m of text.matchAll(re)) {
      out.push({
        start: m.index ?? 0,
        end: (m.index ?? 0) + m[0].length,
        text: m[0],
        groups: m.slice(1),
      })
    }
  } else {
    const m = re.exec(text)
    if (m) {
      out.push({ start: m.index, end: m.index + m[0].length, text: m[0], groups: m.slice(1) })
    }
  }
  return out
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('Contact us at hello@devkit.io or admin@fpt.edu.vn today!')

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [] as Match[], error: '' }
    try {
      const re = new RegExp(pattern, flags)
      return { matches: findMatches(re, text), error: '' }
    } catch (e) {
      return { matches: [] as Match[], error: e instanceof Error ? e.message : 'Invalid regex' }
    }
  }, [pattern, flags, text])

  function toggleFlag(flag: string) {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, '') : prev + flag))
  }

  const highlighted: ReactNode = useMemo(() => {
    if (error || !matches.length) return text
    const nodes: ReactNode[] = []
    let last = 0
    matches.forEach((m, i) => {
      if (m.start > last) nodes.push(<span key={`t${i}`}>{text.slice(last, m.start)}</span>)
      nodes.push(
        <mark key={`m${i}`} className="rounded bg-indigo-500/40 text-white">
          {text.slice(m.start, m.end)}
        </mark>,
      )
      last = m.end
    })
    if (last < text.length) nodes.push(<span key="tail">{text.slice(last)}</span>)
    return nodes
  }, [matches, text, error])

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test JavaScript regular expressions with live match highlighting and capture groups."
    >
      <div className="grid gap-4">
        <div>
          <label className={labelClass}>Regular expression</label>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">/</span>
            <input
              className={inputClass + ' font-mono'}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="pattern"
              spellCheck={false}
            />
            <span className="text-slate-500">/{flags}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            {FLAGS.map((f) => (
              <label key={f.flag} className="flex items-center gap-1.5 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={flags.includes(f.flag)}
                  onChange={() => toggleFlag(f.flag)}
                  className="accent-indigo-500"
                />
                <code>{f.flag}</code> {f.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Test string</label>
          <textarea
            className={areaClass}
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {error ? (
        <p className={errorClass}>⚠ {error}</p>
      ) : (
        <>
          <div className="mt-4">
            <label className={labelClass}>Preview ({matches.length} match{matches.length === 1 ? '' : 'es'})</label>
            <div className="min-h-[3rem] whitespace-pre-wrap break-words rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
              {highlighted}
            </div>
          </div>

          {matches.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase text-slate-500">
                    <th className="border-b border-slate-700 py-2 pr-4">#</th>
                    <th className="border-b border-slate-700 py-2 pr-4">Match</th>
                    <th className="border-b border-slate-700 py-2 pr-4">Index</th>
                    <th className="border-b border-slate-700 py-2">Groups</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {matches.map((m, i) => (
                    <tr key={i} className="align-top">
                      <td className="border-b border-slate-800 py-2 pr-4 text-slate-500">{i + 1}</td>
                      <td className="border-b border-slate-800 py-2 pr-4 text-indigo-300">{m.text}</td>
                      <td className="border-b border-slate-800 py-2 pr-4 text-slate-400">{m.start}</td>
                      <td className="border-b border-slate-800 py-2 text-slate-400">
                        {m.groups.length ? m.groups.map((g) => g ?? '∅').join(', ') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </ToolLayout>
  )
}
