import { useState } from 'react'

/** Copies `value` to the clipboard and briefly shows a confirmation. */
export default function CopyButton({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard blocked (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      disabled={!value}
      className={`rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}
