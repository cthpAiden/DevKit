import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { inputClass, btnClass, labelClass, errorClass } from '../components/ui'

/** Turn a Unix timestamp string into a Date. Auto-detects seconds vs milliseconds. */
function fromUnix(raw: string): Date | null {
  const trimmed = raw.trim()
  if (!/^\d+$/.test(trimmed)) return null
  // 13+ digits is almost certainly milliseconds; fewer is seconds.
  const ms = trimmed.length >= 13 ? Number(trimmed) : Number(trimmed) * 1000
  const d = new Date(ms)
  return Number.isNaN(d.getTime()) ? null : d
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-800 py-2">
      <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm text-slate-200">{value}</code>
        <CopyButton value={value} />
      </div>
    </div>
  )
}

export default function TimestampConverter() {
  const [unix, setUnix] = useState('')
  const [human, setHuman] = useState('')

  const date = fromUnix(unix)
  const unixError = unix.trim() !== '' && date === null

  function useNow() {
    setUnix(String(Math.floor(Date.now() / 1000)))
  }

  // datetime-local value ("YYYY-MM-DDTHH:mm") is parsed in the local timezone.
  const humanDate = human ? new Date(human) : null
  const humanValid = humanDate && !Number.isNaN(humanDate.getTime())

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix time and human-readable dates, in both directions."
    >
      <section>
        <div className="mb-1 flex items-center justify-between">
          <label className={labelClass}>Unix timestamp → date</label>
          <button className={btnClass} onClick={useNow}>
            Now
          </button>
        </div>
        <input
          className={inputClass + ' font-mono'}
          value={unix}
          onChange={(e) => setUnix(e.target.value)}
          placeholder="e.g. 1751414400 (seconds) or 1751414400000 (ms)"
          spellCheck={false}
          inputMode="numeric"
        />
        {unixError && <p className={errorClass}>⚠ Enter a whole number (Unix seconds or milliseconds).</p>}
        {date && (
          <div className="mt-3">
            <Row label="ISO 8601 (UTC)" value={date.toISOString()} />
            <Row label="UTC" value={date.toUTCString()} />
            <Row label="Local" value={date.toLocaleString()} />
            <Row label="Unix (seconds)" value={String(Math.floor(date.getTime() / 1000))} />
            <Row label="Unix (ms)" value={String(date.getTime())} />
          </div>
        )}
      </section>

      <section className="mt-8 border-t border-slate-800 pt-6">
        <label className={labelClass}>Date → Unix timestamp</label>
        <input
          type="datetime-local"
          className={inputClass}
          value={human}
          onChange={(e) => setHuman(e.target.value)}
        />
        {humanValid && (
          <div className="mt-3">
            <Row label="Unix (seconds)" value={String(Math.floor(humanDate!.getTime() / 1000))} />
            <Row label="Unix (ms)" value={String(humanDate!.getTime())} />
            <Row label="ISO 8601 (UTC)" value={humanDate!.toISOString()} />
          </div>
        )}
      </section>
    </ToolLayout>
  )
}
