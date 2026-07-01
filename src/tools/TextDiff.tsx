import { useMemo, useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import { areaClass, labelClass } from '../components/ui'

type Op = { type: 'eq' | 'add' | 'del'; text: string }

/** Longest-common-subsequence line diff between two texts. */
function diffLines(a: string[], b: string[]): Op[] {
  const n = a.length
  const m = b.length
  // dp[i][j] = LCS length of a[i:] and b[j:]
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const ops: Op[] = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: 'eq', text: a[i] })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: 'del', text: a[i] })
      i++
    } else {
      ops.push({ type: 'add', text: b[j] })
      j++
    }
  }
  while (i < n) ops.push({ type: 'del', text: a[i++] })
  while (j < m) ops.push({ type: 'add', text: b[j++] })
  return ops
}

export default function TextDiff() {
  const [left, setLeft] = useState('line one\nline two\nline three')
  const [right, setRight] = useState('line one\nline 2\nline three\nline four')

  const ops = useMemo(() => diffLines(left.split('\n'), right.split('\n')), [left, right])
  const added = ops.filter((o) => o.type === 'add').length
  const removed = ops.filter((o) => o.type === 'del').length

  return (
    <ToolLayout
      title="Text Diff"
      description="Compare two blocks of text line by line. Great for checking code output against expected results."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Original</label>
          <textarea
            className={areaClass}
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div>
          <label className={labelClass}>Changed</label>
          <textarea
            className={areaClass}
            value={right}
            onChange={(e) => setRight(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <span className="text-emerald-400">+{added} added</span>
        <span className="text-red-400">−{removed} removed</span>
      </div>

      <div className="mt-2 overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 font-mono text-sm">
        {ops.map((o, i) => (
          <div
            key={i}
            className={
              o.type === 'add'
                ? 'whitespace-pre-wrap bg-emerald-950/50 px-3 py-0.5 text-emerald-300'
                : o.type === 'del'
                  ? 'whitespace-pre-wrap bg-red-950/50 px-3 py-0.5 text-red-300'
                  : 'whitespace-pre-wrap px-3 py-0.5 text-slate-400'
            }
          >
            <span className="select-none opacity-60">
              {o.type === 'add' ? '+ ' : o.type === 'del' ? '- ' : '  '}
            </span>
            {o.text || ' '}
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
