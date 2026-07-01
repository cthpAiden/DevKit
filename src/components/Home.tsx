import { Link } from 'react-router-dom'
import { tools } from '../tools/registry'

export default function Home() {
  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          🧰 DevKit
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          A small toolbox of everyday developer utilities. Everything runs{' '}
          <span className="font-semibold text-slate-200">100% in your browser</span> —
          no accounts, no uploads, your data never leaves your machine.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.id}
            to={t.path}
            className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-indigo-500/60 hover:bg-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.icon}</span>
              <h2 className="font-semibold text-white group-hover:text-indigo-300">
                {t.name}
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-400">{t.blurb}</p>
            <span className="mt-3 inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
              {t.when}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
