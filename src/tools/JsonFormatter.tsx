import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, errorClass, labelClass } from '../components/ui'

const SAMPLE =
  '{"name":"DevKit","tools":8,"free":true,"tags":["json","dev","fpt"],"nested":{"ok":true}}'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function run(indent: number) {
    setError('')
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed: unknown = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
    } catch (e) {
      setOutput('')
      setError(e instanceof Error ? e.message : 'Invalid JSON')
    }
  }

  function clear() {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Pretty-print, minify, and validate JSON. Parsing happens entirely in your browser."
    >
      <div className="flex flex-wrap gap-2">
        <button className={btnClass} onClick={() => run(2)}>
          Format · 2 spaces
        </button>
        <button className={btnClass} onClick={() => run(4)}>
          Format · 4 spaces
        </button>
        <button className={btnClass} onClick={() => run(0)}>
          Minify
        </button>
        <button className={btnClass} onClick={() => setInput(SAMPLE)}>
          Load sample
        </button>
        <button className={btnClass} onClick={clear}>
          Clear
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Input</label>
          <textarea
            className={areaClass}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here…"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={labelClass}>Output</label>
            <CopyButton value={output} />
          </div>
          <textarea
            className={areaClass}
            value={output}
            readOnly
            placeholder="Formatted result…"
            spellCheck={false}
          />
        </div>
      </div>

      {error && <p className={errorClass}>⚠ {error}</p>}
      {!error && output && (
        <p className="mt-3 text-sm text-emerald-400">✓ Valid JSON</p>
      )}
    </ToolLayout>
  )
}
