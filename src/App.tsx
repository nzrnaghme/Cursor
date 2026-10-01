import { useState, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Research from './components/Research'
import Publications from './components/Publications'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ResearchDirections from './components/ResearchDirections'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import { restoreInitialSection } from './utils/sectionNavigation'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => restoreInitialSection(window.location.hash))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('main section[id]')
      let activeSection = 'home'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 120) activeSection = section.id
      }
      setCurrentSection(activeSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:bg-[#526d1d] focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        <Navigation
          currentSection={currentSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main id="main-content" tabIndex={-1}>
          <Home />
          <About />
          <Research />
          <Publications />
          <Projects />
          <Experience />
          <ResearchDirections />
          <Contact />
        </main>

        <ScrollToTop />
      </div>
    </MotionConfig>
  )
}

export default App
