import { useState, useEffect } from 'react'
import { format } from 'sql-formatter'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, inputClass, btnClass, errorClass, labelClass } from '../components/ui'

const DIALECTS = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'tsql', label: 'SQL Server (T-SQL)' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'bigquery', label: 'BigQuery' },
] as const

type Dialect = (typeof DIALECTS)[number]['value']

const SAMPLE =
  'select id, name, email from users u join orders o on o.user_id = u.id where u.active = 1 and o.total > 100 order by o.total desc'

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [dialect, setDialect] = useState<Dialect>('sql')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }
    try {
      setOutput(format(input, { language: dialect, keywordCase: 'upper' }))
      setError('')
    } catch (e) {
      setOutput('')
      setError(e instanceof Error ? e.message : 'Could not format this SQL')
    }
  }, [input, dialect])

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Beautify messy SQL queries. Pick the dialect your database uses for the best results."
    >
      <div className="flex flex-wrap items-center gap-2">
        <select
          className={inputClass + ' w-auto'}
          value={dialect}
          onChange={(e) => setDialect(e.target.value as Dialect)}
        >
          {DIALECTS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <button className={btnClass} onClick={() => setInput(SAMPLE)}>
          Load sample
        </button>
        <button className={btnClass} onClick={() => setInput('')}>
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
            placeholder="Paste an SQL query here…"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={labelClass}>Formatted</label>
            <CopyButton value={output} />
          </div>
          <textarea
            className={areaClass}
            value={output}
            readOnly
            placeholder="Formatted SQL…"
            spellCheck={false}
          />
        </div>
      </div>

      {error && <p className={errorClass}>⚠ {error}</p>}
    </ToolLayout>
  )
}
