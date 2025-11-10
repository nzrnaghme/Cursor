import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MusicPlayer from './MusicPlayer'
import Loading from './Loading'
import './Navigation.css'

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
    { id: 'projects', label: 'Projects' }
  ]

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    setLoading(true)
    
    // Small delay to show loading animation
    setTimeout(() => {
      scrollToSection(sectionId)
      // Hide loading after scroll animation completes
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, 300)
  }

  return (
    <>
      <motion.nav 
        className="navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <div className="nav-left">
            <MusicPlayer />
          </div>
          <div className="nav-right">
            <motion.button 
              className="nav-button lets-talk"
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
              <span className="button-dot"></span>
            </motion.button>
            <div className="menu-wrapper" ref={menuRef}>
              <motion.button 
                className="nav-button menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {menuOpen ? 'Close' : 'Menu'}
                <span className="button-dots">
                  <span></span>
                  <span></span>
                </span>
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="menu-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ul className="menu-list">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <motion.button
                            className={`menu-item ${currentSection === item.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
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
