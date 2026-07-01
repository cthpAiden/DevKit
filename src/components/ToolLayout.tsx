import type { ReactNode } from 'react'

/** Consistent header + content wrapper shared by every tool page. */
export default function ToolLayout({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </header>
      {children}
    </div>
  )
}
