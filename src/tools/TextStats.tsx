import { useMemo, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import { areaClass, labelClass } from '../components/ui'

function computeStats(text: string) {
  const chars = [...text].length
  const charsNoSpaces = [...text.replace(/\s/g, '')].length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text === '' ? 0 : text.split(/\r\n|\r|\n/).length
  const sentences = (text.match(/[^.!?]+[.!?]+/g) || []).length
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0
  const bytes = new TextEncoder().encode(text).length
  const readingSeconds = Math.round((words / 200) * 60)
  return { chars, charsNoSpaces, words, lines, sentences, paragraphs, bytes, readingSeconds }
}

function formatDuration(seconds: number): string {
  if (seconds < 1) return '0s'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

export default function TextStats() {
  const [text, setText] = useState('')
  const stats = useMemo(() => computeStats(text), [text])

  const cards: { label: string; value: string | number }[] = [
    { label: 'Characters', value: stats.chars },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces },
    { label: 'Words', value: stats.words },
    { label: 'Lines', value: stats.lines },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Bytes (UTF-8)', value: stats.bytes },
    { label: 'Reading time', value: formatDuration(stats.readingSeconds) },
  ]

  return (
    <ToolLayout
      title="Text Stats & Counter"
      description="Live counts of characters, words, lines, and estimated reading time — handy for reports with limits."
    >
      <label className={labelClass}>Text</label>
      <textarea
        className={areaClass + ' min-h-[10rem]'}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text here…"
        spellCheck={false}
      />

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-3 text-center">
            <div className="text-2xl font-bold text-white">{c.value}</div>
            <div className="mt-1 text-xs text-slate-400">{c.label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
