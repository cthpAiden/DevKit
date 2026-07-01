import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, labelClass } from '../components/ui'

/** Split any string into its component words, handling camelCase and separators. */
function toWords(str: string): string[] {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
}

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()

const CONVERSIONS: { label: string; fn: (words: string[]) => string }[] = [
  { label: 'camelCase', fn: (w) => w.map((x, i) => (i === 0 ? x.toLowerCase() : cap(x))).join('') },
  { label: 'PascalCase', fn: (w) => w.map(cap).join('') },
  { label: 'snake_case', fn: (w) => w.map((x) => x.toLowerCase()).join('_') },
  { label: 'kebab-case', fn: (w) => w.map((x) => x.toLowerCase()).join('-') },
  { label: 'CONSTANT_CASE', fn: (w) => w.map((x) => x.toUpperCase()).join('_') },
  { label: 'Title Case', fn: (w) => w.map(cap).join(' ') },
  { label: 'Sentence case', fn: (w) => { const s = w.map((x) => x.toLowerCase()).join(' '); return s ? cap(s) : '' } },
  { label: 'lower case', fn: (w) => w.map((x) => x.toLowerCase()).join(' ') },
  { label: 'UPPER CASE', fn: (w) => w.map((x) => x.toUpperCase()).join(' ') },
]

export default function CaseConverter() {
  const [input, setInput] = useState('helloWorld example_TEXT')
  const words = toWords(input)

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between naming conventions — camelCase, snake_case, kebab-case and more."
    >
      <label className={labelClass}>Input</label>
      <textarea
        className={areaClass + ' min-h-[5rem]'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text to convert…"
        spellCheck={false}
      />
      <div className="mt-2">
        <button className={btnClass} onClick={() => setInput('')}>
          Clear
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {CONVERSIONS.map((c) => {
          const value = c.fn(words)
          return (
            <div
              key={c.label}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-slate-500">{c.label}</div>
                <code className="block truncate text-sm text-slate-200">{value || '—'}</code>
              </div>
              <CopyButton value={value} />
            </div>
          )
        })}
      </div>
    </ToolLayout>
  )
}
