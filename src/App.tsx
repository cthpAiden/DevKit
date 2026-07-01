import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import { tools } from './tools/registry'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="rounded-md border border-slate-700 px-2.5 py-1 text-lg leading-none hover:bg-slate-800"
        >
          ☰
        </button>
        <span className="font-semibold">🧰 DevKit</span>
      </div>

      <div className="flex">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-10 md:py-8">
          <div className="mx-auto max-w-4xl">
            <Routes>
              <Route path="/" element={<Home />} />
              {tools.map((t) => (
                <Route key={t.id} path={t.path} element={t.element} />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}
