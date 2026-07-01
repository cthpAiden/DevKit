import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { inputClass, labelClass, errorClass } from '../components/ui'

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(h)) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (!/^[0-9a-f]{6}$/i.test(h)) return null
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-800 py-2 last:border-0">
      <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <code className="text-sm text-slate-200">{value}</code>
        <CopyButton value={value} />
      </div>
    </div>
  )
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [raw, setRaw] = useState('#6366f1')

  function onRaw(next: string) {
    setRaw(next)
    const rgb = hexToRgb(next)
    if (rgb) {
      const norm = '#' + rgb.map((n) => n.toString(16).padStart(2, '0')).join('')
      setHex(norm)
    }
  }

  function onPick(next: string) {
    setHex(next)
    setRaw(next)
  }

  const rgb = hexToRgb(hex)
  const invalid = hexToRgb(raw) === null

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert a color between HEX, RGB, and HSL. Pick from the swatch or type a hex value."
    >
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className={labelClass}>Swatch</label>
          <input
            type="color"
            value={hex}
            onChange={(e) => onPick(e.target.value)}
            className="h-12 w-20 cursor-pointer rounded-lg border border-slate-700 bg-slate-900"
          />
        </div>
        <div>
          <label className={labelClass}>HEX</label>
          <input
            className={inputClass + ' w-40 font-mono'}
            value={raw}
            onChange={(e) => onRaw(e.target.value)}
            placeholder="#6366f1"
            spellCheck={false}
          />
        </div>
      </div>

      {invalid && <p className={errorClass}>⚠ Enter a valid hex color, e.g. #6366f1 or #63f.</p>}

      {rgb && (
        <div className="mt-4 max-w-md rounded-lg border border-slate-700 bg-slate-900 px-3 py-1">
          <Row label="HEX" value={hex} />
          <Row label="RGB" value={`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`} />
          {(() => {
            const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2])
            return <Row label="HSL" value={`hsl(${h}, ${s}%, ${l}%)`} />
          })()}
        </div>
      )}
    </ToolLayout>
  )
}
