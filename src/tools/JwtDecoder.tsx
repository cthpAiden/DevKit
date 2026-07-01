import { useMemo, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, errorClass, labelClass } from '../components/ui'
import { base64UrlDecode } from '../lib/encoding'

const SAMPLE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFpZGVuIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MDAwMDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const CLAIM_LABELS: Record<string, string> = {
  iat: 'Issued at',
  exp: 'Expires',
  nbf: 'Not before',
}

interface Decoded {
  header: string
  payload: string
  claims: { key: string; label: string; date: string }[]
  error: string
}

function decodeJwt(token: string): Decoded {
  const empty: Decoded = { header: '', payload: '', claims: [], error: '' }
  const t = token.trim()
  if (!t) return empty
  const parts = t.split('.')
  if (parts.length < 2) {
    return { ...empty, error: 'A JWT has three dot-separated parts: header.payload.signature' }
  }
  try {
    const headerObj = JSON.parse(base64UrlDecode(parts[0]))
    const payloadObj = JSON.parse(base64UrlDecode(parts[1]))
    const claims = Object.keys(CLAIM_LABELS)
      .filter((k) => typeof payloadObj[k] === 'number')
      .map((k) => ({
        key: k,
        label: CLAIM_LABELS[k],
        date: new Date(payloadObj[k] * 1000).toLocaleString(),
      }))
    return {
      header: JSON.stringify(headerObj, null, 2),
      payload: JSON.stringify(payloadObj, null, 2),
      claims,
      error: '',
    }
  } catch {
    return { ...empty, error: 'Could not decode — the header/payload is not valid base64url JSON.' }
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const decoded = useMemo(() => decodeJwt(token), [token])

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Inspect the header and payload of a JSON Web Token. Decoding only — the signature is not verified."
    >
      <div className="mb-2 flex flex-wrap gap-2">
        <button className={btnClass} onClick={() => setToken(SAMPLE)}>
          Load sample
        </button>
        <button className={btnClass} onClick={() => setToken('')}>
          Clear
        </button>
      </div>

      <label className={labelClass}>Token</label>
      <textarea
        className={areaClass + ' min-h-[6rem]'}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste a JWT (header.payload.signature)…"
        spellCheck={false}
      />

      {decoded.error && <p className={errorClass}>⚠ {decoded.error}</p>}

      {decoded.header && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={labelClass}>Header</label>
              <CopyButton value={decoded.header} />
            </div>
            <pre className="overflow-auto rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs text-indigo-200">
              {decoded.header}
            </pre>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className={labelClass}>Payload</label>
              <CopyButton value={decoded.payload} />
            </div>
            <pre className="overflow-auto rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs text-emerald-200">
              {decoded.payload}
            </pre>
          </div>
        </div>
      )}

      {decoded.claims.length > 0 && (
        <div className="mt-4">
          <label className={labelClass}>Standard time claims</label>
          <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
            {decoded.claims.map((c) => (
              <div key={c.key} className="flex justify-between border-b border-slate-800 py-1 last:border-0">
                <span className="text-slate-400">
                  {c.label} <code className="text-xs">({c.key})</code>
                </span>
                <span className="text-slate-200">{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
