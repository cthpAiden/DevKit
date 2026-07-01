import { NavLink } from 'react-router-dom'
import { toolsByGroup } from '../tools/registry'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
  }`

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto border-r border-slate-800 bg-slate-900 p-4 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 md:transform-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavLink to="/" onClick={onClose} className="mb-6 flex items-center gap-2 px-2">
          <span className="text-2xl">🧰</span>
          <div>
            <div className="text-lg font-bold text-white">DevKit</div>
            <div className="text-xs text-slate-400">in-browser dev tools</div>
          </div>
        </NavLink>

        <nav className="space-y-4">
          <NavLink to="/" end onClick={onClose} className={linkClass}>
            <span className="w-5 text-center">🏠</span> Home
          </NavLink>

          {toolsByGroup.map(({ group, tools }) => (
            <div key={group}>
              <div className="mb-1 px-3 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">
                {group}
              </div>
              <div className="space-y-1">
                {tools.map((t) => (
                  <NavLink key={t.id} to={t.path} onClick={onClose} className={linkClass}>
                    <span className="w-5 text-center">{t.icon}</span> {t.name}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <p className="mt-6 border-t border-slate-800 px-2 pt-4 text-xs text-slate-500">
          Runs 100% in your browser. Nothing is uploaded.
        </p>
      </aside>
    </>
  )
}
