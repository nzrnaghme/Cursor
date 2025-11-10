import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MusicPlayer from './MusicPlayer'

interface NavigationProps {
  currentSection: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrollToSection: (section: string) => void
  setLoading: (loading: boolean) => void
}

const Navigation = ({ currentSection, menuOpen, setMenuOpen, scrollToSection, setLoading }: NavigationProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen, setMenuOpen])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' }
  ]

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    setLoading(true)
    
    setTimeout(() => {
      scrollToSection(sectionId)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, 300)
  }

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-[1000] p-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 pointer-events-auto">
            <motion.div
              className="w-12 h-12 rounded-full bg-[#6b8e23] flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-[#556b2f] transition-colors"
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MN
            </motion.div>
            <MusicPlayer />
          </div>
          <div className="flex items-center gap-4 pointer-events-auto relative">
            <motion.button 
              className="px-6 py-3 rounded-full border-none text-sm font-medium cursor-pointer uppercase tracking-wider flex items-center gap-2 transition-all relative whitespace-nowrap bg-[#6b8e23] text-white hover:bg-[#556b2f]"
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  scrollToSection('contact')
                  setTimeout(() => setLoading(false), 1000)
                }, 300)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Let's Talk
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            </motion.button>
            <div className="relative" ref={menuRef}>
              <motion.button 
                className="px-6 py-3 rounded-full border-none text-sm font-medium cursor-pointer uppercase tracking-wider flex items-center gap-2 transition-all relative whitespace-nowrap bg-[#f5f5f5] text-black hover:bg-[#e5e5e5]"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {menuOpen ? 'Close' : 'Menu'}
                <span className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                  <span className="w-1 h-1 rounded-full bg-current"></span>
                </span>
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="absolute top-[calc(100%+0.5rem)] right-0 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-2 min-w-[180px] z-[1001] border border-black/5"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ul className="list-none p-0 m-0 flex flex-col">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <motion.button
                            className={`w-full py-3.5 px-5 bg-transparent border-none text-left text-sm font-medium text-black cursor-pointer uppercase tracking-wider rounded-lg transition-all relative flex items-center gap-3 ${
                              currentSection === item.id 
                                ? '' 
                                : 'hover:bg-[#f5f5f5]'
                            }`}
                            onClick={() => handleNavClick(item.id)}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {currentSection === item.id && (
                              <span className="w-2 h-2 rounded-full bg-[#6b8e23] shrink-0"></span>
                            )}
                            {item.label}
                          </motion.button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation
