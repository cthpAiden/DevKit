import { useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import ToolLayout from '../components/ToolLayout'
import { areaClass, btnClass, labelClass } from '../components/ui'

const SAMPLE = `# DevKit

A **live** Markdown preview. Type on the left, see HTML on the right.

## Features
- GitHub-flavored Markdown
- Safe output (sanitized with DOMPurify)
- Great for writing your \`README.md\` and reports

> Tip: this is perfect for FPT assignment write-ups.

\`\`\`js
console.log("Hello, DevKit!")
\`\`\`

| Tool | Use |
| --- | --- |
| JSON | format & validate |
| SQL | beautify queries |
`

export default function MarkdownPreview() {
  const [input, setInput] = useState(SAMPLE)

  const html = useMemo(() => {
    const raw = marked.parse(input, { async: false }) as string
    return DOMPurify.sanitize(raw)
  }, [input])

  return (
    <ToolLayout
      title="Markdown Preview"
      description="Write GitHub-flavored Markdown and see a live, sanitized HTML preview — ideal for READMEs and reports."
    >
      <div className="mb-2 flex flex-wrap gap-2">
        <button className={btnClass} onClick={() => setInput(SAMPLE)}>
          Load sample
        </button>
        <button className={btnClass} onClick={() => setInput('')}>
          Clear
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Markdown</label>
          <textarea
            className={areaClass + ' min-h-[24rem]'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Write Markdown here…"
            spellCheck={false}
          />
        </div>
        <div>
          <label className={labelClass}>Preview</label>
          <div
            className="md-body min-h-[24rem] overflow-auto rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolLayout>
  )
}
