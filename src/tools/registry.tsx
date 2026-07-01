import type { ReactNode } from 'react'
import JsonFormatter from './JsonFormatter'
import BaseConverter from './BaseConverter'
import SqlFormatter from './SqlFormatter'
import Base64Tool from './Base64Tool'
import RegexTester from './RegexTester'
import HashUuid from './HashUuid'
import MarkdownPreview from './MarkdownPreview'
import TimestampConverter from './TimestampConverter'

export interface Tool {
  /** Stable id, also used as the React key. */
  id: string
  /** Display name in the sidebar and cards. */
  name: string
  /** Route path, e.g. "/json". */
  path: string
  /** Emoji icon (keeps the app dependency-free). */
  icon: string
  /** Short description shown on the home cards. */
  blurb: string
  /** When this tool becomes useful during the SE degree. */
  when: string
  /** The rendered tool component. */
  element: ReactNode
}

// Adding a new tool = write its component, then add ONE entry here.
// The sidebar, routes, and home page all read from this array.
export const tools: Tool[] = [
  {
    id: 'markdown',
    name: 'Markdown Preview',
    path: '/markdown',
    icon: '📝',
    blurb: 'Live GitHub-flavored Markdown → sanitized HTML preview.',
    when: 'Now · READMEs & reports',
    element: <MarkdownPreview />,
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    path: '/json',
    icon: '🧩',
    blurb: 'Pretty-print, minify, and validate JSON.',
    when: 'Now · APIs & config',
    element: <JsonFormatter />,
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    path: '/regex',
    icon: '🔍',
    blurb: 'Live match highlighting and capture groups.',
    when: 'Now · validation',
    element: <RegexTester />,
  },
  {
    id: 'base64',
    name: 'Base64 / URL',
    path: '/base64',
    icon: '🔁',
    blurb: 'Encode & decode Base64 and URL-encoding (Unicode-safe).',
    when: 'Web courses',
    element: <Base64Tool />,
  },
  {
    id: 'hash',
    name: 'Hash & UUID',
    path: '/hash',
    icon: '🔐',
    blurb: 'SHA-1/256/384/512 hashes and random UUIDs.',
    when: 'Security & DB keys',
    element: <HashUuid />,
  },
  {
    id: 'base',
    name: 'Base Converter',
    path: '/base',
    icon: '🔢',
    blurb: 'Convert between binary, octal, decimal, and hex.',
    when: 'CS fundamentals',
    element: <BaseConverter />,
  },
  {
    id: 'sql',
    name: 'SQL Formatter',
    path: '/sql',
    icon: '🗄️',
    blurb: 'Beautify SQL queries across dialects.',
    when: 'Later · DBI202',
    element: <SqlFormatter />,
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    path: '/timestamp',
    icon: '🕐',
    blurb: 'Convert Unix time ↔ human-readable dates.',
    when: 'Later · databases',
    element: <TimestampConverter />,
  },
]
