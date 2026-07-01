import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { inputClass, btnClass, labelClass } from '../components/ui'

interface BaseDef {
  label: string
  radix: number
  pattern: RegExp
  placeholder: string
}

const BASES: BaseDef[] = [
  { label: 'Binary (base 2)', radix: 2, pattern: /^[01]*$/, placeholder: '101010' },
  { label: 'Octal (base 8)', radix: 8, pattern: /^[0-7]*$/, placeholder: '52' },
  { label: 'Decimal (base 10)', radix: 10, pattern: /^[0-9]*$/, placeholder: '42' },
  { label: 'Hexadecimal (base 16)', radix: 16, pattern: /^[0-9a-fA-F]*$/, placeholder: '2a' },
]

/** Parse an unsigned integer string in an arbitrary base using BigInt. */
function parseInBase(str: string, radix: number): bigint | null {
  if (!str) return null
  let result = 0n
  const big = BigInt(radix)
  for (const ch of str.toLowerCase()) {
    const digit = parseInt(ch, radix)
    if (Number.isNaN(digit)) return null
    result = result * big + BigInt(digit)
  }
  return result
}

export default function BaseConverter() {
  const [fields, setFields] = useState<string[]>(['', '', '', ''])

  function onChange(index: number, raw: string) {
    const def = BASES[index]
    // Reject characters that aren't valid for this base.
    if (!def.pattern.test(raw)) return
    const value = parseInBase(raw, def.radix)
    setFields(
      BASES.map((b, i) =>
        i === index ? raw : value === null ? '' : value.toString(b.radix),
      ),
    )
  }

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert an unsigned integer between binary, octal, decimal, and hex. Edit any field to update the rest."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {BASES.map((b, i) => (
          <div key={b.radix}>
            <label className={labelClass}>{b.label}</label>
            <div className="flex gap-2">
              <input
                className={inputClass + ' font-mono uppercase'}
                value={fields[i]}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder={b.placeholder}
                spellCheck={false}
                inputMode={b.radix === 10 ? 'numeric' : 'text'}
              />
              <CopyButton value={fields[i]} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className={btnClass} onClick={() => setFields(['', '', '', ''])}>
          Clear
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Handles arbitrarily large values (BigInt). Negative numbers and fractions
        aren&apos;t supported.
      </p>
    </ToolLayout>
  )
}
