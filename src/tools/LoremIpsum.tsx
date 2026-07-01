import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import CopyButton from '../components/CopyButton'
import { areaClass, btnClass, btnPrimaryClass, inputClass, labelClass } from '../components/ui'

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  )

const rand = (max: number) => Math.floor(Math.random() * max)

function makeSentence(): string {
  const len = 6 + rand(9)
  const words: string[] = []
  for (let i = 0; i < len; i++) words.push(WORDS[rand(WORDS.length)])
  const sentence = words.join(' ')
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
}

function makeParagraph(): string {
  const count = 3 + rand(4)
  const sentences: string[] = []
  for (let i = 0; i < count; i++) sentences.push(makeSentence())
  return sentences.join(' ')
}

type Unit = 'paragraphs' | 'sentences' | 'words'

function generate(count: number, unit: Unit): string {
  const n = Math.max(1, Math.min(100, count))
  if (unit === 'paragraphs') return Array.from({ length: n }, makeParagraph).join('\n\n')
  if (unit === 'sentences') return Array.from({ length: n }, makeSentence).join(' ')
  const words: string[] = []
  for (let i = 0; i < n; i++) words.push(WORDS[rand(WORDS.length)])
  const text = words.join(' ')
  return text.charAt(0).toUpperCase() + text.slice(1) + '.'
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [unit, setUnit] = useState<Unit>('paragraphs')
  const [output, setOutput] = useState(() => generate(3, 'paragraphs'))

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for mockups and UI layouts."
    >
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className={labelClass}>Amount</label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className={inputClass + ' w-24'}
          />
        </div>
        <div>
          <label className={labelClass}>Unit</label>
          <select
            className={inputClass + ' w-auto'}
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button className={btnPrimaryClass} onClick={() => setOutput(generate(count, unit))}>
          Generate
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between">
          <label className={labelClass}>Output</label>
          <CopyButton value={output} />
        </div>
        <textarea
          className={areaClass + ' min-h-[14rem]'}
          value={output}
          readOnly
          spellCheck={false}
        />
      </div>

      <div className="mt-2">
        <button className={btnClass} onClick={() => setOutput('')}>
          Clear
        </button>
      </div>
    </ToolLayout>
  )
}
