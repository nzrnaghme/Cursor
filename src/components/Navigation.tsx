import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, cv, getCvHref } from '../data/content'
import MusicPlayer from './MusicPlayer'
import { easeSmooth } from '../utils/motion'

interface NavigationProps {
  currentSection: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const Navigation = ({
  currentSection,
  menuOpen,
  setMenuOpen,
}: NavigationProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const cvHref = getCvHref()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen, setMenuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen, setMenuOpen])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[1000] p-4 sm:p-6 pointer-events-none bg-[#1a2332]/80 backdrop-blur-sm border-b border-white/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="pointer-events-auto">
          <MusicPlayer />
        </div>
        <div
          className="flex items-center gap-3 pointer-events-auto relative"
          ref={menuRef}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false)
          }}
        >
          <div className="hidden lg:flex items-center gap-6 mr-2" aria-label="Section navigation">
            {navItems.slice(0, -1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={currentSection === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`text-xs uppercase tracking-wider font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm ${
                  currentSection === item.id ? 'text-[#a9c66c]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={cvHref}
              download="Naghmeh_Melody_Nazar_Research_CV.pdf"
              className="text-xs uppercase tracking-wider font-medium text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm"
            >
              CV
            </a>
          </div>

          <motion.a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider bg-[#526d1d] text-white hover:bg-[#556b2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setMenuOpen(false)}
            aria-current={currentSection === 'contact' ? 'location' : undefined}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact
          </motion.a>

          <motion.button
            ref={menuButtonRef}
            type="button"
            className="px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider bg-[#f5f5f5] text-black hover:bg-[#e5e5e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-menu"
                className="absolute top-[calc(100%+0.5rem)] right-0 bg-white rounded-xl shadow-lg p-2 min-w-[240px] z-[1001] border border-black/5 lg:hidden max-h-[70vh] overflow-y-auto"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: easeSmooth }}
              >
                <ul className="list-none p-0 m-0">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={currentSection === item.id ? 'location' : undefined}
                        className={`block w-full py-3 px-4 text-left text-sm font-medium uppercase tracking-wider rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6b8e23] ${
                          currentSection === item.id
                            ? 'text-[#526d1d] bg-[#f5f5f5]'
                            : 'text-black hover:bg-[#f5f5f5]'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={cvHref}
                      download="Naghmeh_Melody_Nazar_Research_CV.pdf"
                      className="block w-full py-3 px-4 text-sm font-medium uppercase tracking-wider text-black hover:bg-[#f5f5f5] rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6b8e23]"
                      onClick={() => setMenuOpen(false)}
                    >
                      CV — {cv.label}
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
