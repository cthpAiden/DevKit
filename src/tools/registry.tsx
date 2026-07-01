import type { ReactNode } from 'react'
import JsonFormatter from './JsonFormatter'
import BaseConverter from './BaseConverter'
import SqlFormatter from './SqlFormatter'
import Base64Tool from './Base64Tool'
import RegexTester from './RegexTester'
import HashUuid from './HashUuid'
import MarkdownPreview from './MarkdownPreview'
import TimestampConverter from './TimestampConverter'
import JwtDecoder from './JwtDecoder'
import CaseConverter from './CaseConverter'
import TextDiff from './TextDiff'
import ColorConverter from './ColorConverter'
import UrlInspector from './UrlInspector'
import TextStats from './TextStats'
import LoremIpsum from './LoremIpsum'
import PasswordGenerator from './PasswordGenerator'

/** Sidebar/home categories, in display order. */
export const GROUPS = ['Text & Docs', 'Data & Format', 'Encoding & Security', 'Web'] as const
export type Group = (typeof GROUPS)[number]

export interface Tool {
  /** Stable id, also used as the React key. */
  id: string
  /** Display name in the sidebar and cards. */
  name: string
  /** Route path, e.g. "/json". */
  path: string
  /** Emoji icon (keeps the app dependency-free). */
  icon: string
  /** Category the tool belongs to. */
  group: Group
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
  // Text & Docs
  {
    id: 'markdown',
    name: 'Markdown Preview',
    path: '/markdown',
    icon: '📝',
    group: 'Text & Docs',
    blurb: 'Live GitHub-flavored Markdown → sanitized HTML preview.',
    when: 'Now · READMEs & reports',
    element: <MarkdownPreview />,
  },
  {
    id: 'stats',
    name: 'Text Stats',
    path: '/stats',
    icon: '📊',
    group: 'Text & Docs',
    blurb: 'Count characters, words, lines, and reading time.',
    when: 'Now · reports',
    element: <TextStats />,
  },
  {
    id: 'case',
    name: 'Case Converter',
    path: '/case',
    icon: '🔤',
    group: 'Text & Docs',
    blurb: 'camelCase, snake_case, kebab-case, and more.',
    when: 'Now · naming',
    element: <CaseConverter />,
  },
  {
    id: 'diff',
    name: 'Text Diff',
    path: '/diff',
    icon: '🔀',
    group: 'Text & Docs',
    blurb: 'Compare two texts line by line.',
    when: 'Now · code review',
    element: <TextDiff />,
  },
  {
    id: 'lorem',
    name: 'Lorem Ipsum',
    path: '/lorem',
    icon: '🅰️',
    group: 'Text & Docs',
    blurb: 'Generate placeholder text for mockups.',
    when: 'UI & design',
    element: <LoremIpsum />,
  },

  // Data & Format
  {
    id: 'json',
    name: 'JSON Formatter',
    path: '/json',
    icon: '🧩',
    group: 'Data & Format',
    blurb: 'Pretty-print, minify, and validate JSON.',
    when: 'Now · APIs & config',
    element: <JsonFormatter />,
  },
  {
    id: 'sql',
    name: 'SQL Formatter',
    path: '/sql',
    icon: '🗄️',
    group: 'Data & Format',
    blurb: 'Beautify SQL queries across dialects.',
    when: 'Later · DBI202',
    element: <SqlFormatter />,
  },
  {
    id: 'base',
    name: 'Base Converter',
    path: '/base',
    icon: '🔢',
    group: 'Data & Format',
    blurb: 'Convert between binary, octal, decimal, and hex.',
    when: 'CS fundamentals',
    element: <BaseConverter />,
  },
  {
    id: 'timestamp',
    name: 'Timestamp',
    path: '/timestamp',
    icon: '🕐',
    group: 'Data & Format',
    blurb: 'Convert Unix time ↔ human-readable dates.',
    when: 'Later · databases',
    element: <TimestampConverter />,
  },

  // Encoding & Security
  {
    id: 'base64',
    name: 'Base64 / URL',
    path: '/base64',
    icon: '🔁',
    group: 'Encoding & Security',
    blurb: 'Encode & decode Base64 and URL-encoding (Unicode-safe).',
    when: 'Web courses',
    element: <Base64Tool />,
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    path: '/jwt',
    icon: '🎫',
    group: 'Encoding & Security',
    blurb: 'Inspect a JSON Web Token’s header and payload.',
    when: 'Auth · SWP391',
    element: <JwtDecoder />,
  },
  {
    id: 'hash',
    name: 'Hash & UUID',
    path: '/hash',
    icon: '🔐',
    group: 'Encoding & Security',
    blurb: 'SHA-1/256/384/512 hashes and random UUIDs.',
    when: 'Security & DB keys',
    element: <HashUuid />,
  },
  {
    id: 'password',
    name: 'Password Generator',
    path: '/password',
    icon: '🔑',
    group: 'Encoding & Security',
    blurb: 'Strong random passwords via the crypto RNG.',
    when: 'Practical security',
    element: <PasswordGenerator />,
  },

  // Web
  {
    id: 'regex',
    name: 'Regex Tester',
    path: '/regex',
    icon: '🔍',
    group: 'Web',
    blurb: 'Live match highlighting and capture groups.',
    when: 'Now · validation',
    element: <RegexTester />,
  },
  {
    id: 'url',
    name: 'URL Inspector',
    path: '/url',
    icon: '🌐',
    group: 'Web',
    blurb: 'Break a URL into parts and query parameters.',
    when: 'Web & APIs',
    element: <UrlInspector />,
  },
  {
    id: 'color',
    name: 'Color Converter',
    path: '/color',
    icon: '🎨',
    group: 'Web',
    blurb: 'Convert colors between HEX, RGB, and HSL.',
    when: 'Web & design',
    element: <ColorConverter />,
  },
]

/** Tools grouped by category, preserving GROUPS order. */
export const toolsByGroup: { group: Group; tools: Tool[] }[] = GROUPS.map((group) => ({
  group,
  tools: tools.filter((t) => t.group === group),
}))
