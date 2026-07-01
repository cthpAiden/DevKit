import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, errorClass, labelClass, inputClass } from '../components/ui'

type Mode = 'base64' | 'url'

/** Unicode-safe Base64 encode (handles emoji, accents, etc.). */
function base64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

function base64Decode(b64: string): string {
  const binary = atob(b64.trim())
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('base64')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function encode() {
    setError('')
    try {
      setOutput(mode === 'base64' ? base64Encode(input) : encodeURIComponent(input))
    } catch (e) {
      setOutput('')
      setError(e instanceof Error ? e.message : 'Could not encode')
    }
  }

  function decode() {
    setError('')
    try {
      setOutput(mode === 'base64' ? base64Decode(input) : decodeURIComponent(input))
    } catch {
      setOutput('')
      setError(
        mode === 'base64'
          ? 'Input is not valid Base64.'
          : 'Input is not valid URL-encoded text.',
      )
    }
  }

  return (
    <ToolLayout
      title="Base64 & URL Encoder / Decoder"
      description="Convert text to and from Base64 or URL-encoding. Unicode is handled correctly."
    >
      <div className="flex flex-wrap items-center gap-2">
        <select
          className={inputClass + ' w-auto'}
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="base64">Base64</option>
          <option value="url">URL-encoding</option>
        </select>
        <button className={btnClass} onClick={encode}>
          Encode →
        </button>
        <button className={btnClass} onClick={decode}>
          ← Decode
        </button>
        <button
          className={btnClass}
          onClick={() => {
            setInput('')
            setOutput('')
            setError('')
          }}
        >
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
            placeholder="Type or paste text…"
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
            placeholder="Result…"
            spellCheck={false}
          />
        </div>
      </div>

      {error && <p className={errorClass}>⚠ {error}</p>}
    </ToolLayout>
  )
}
