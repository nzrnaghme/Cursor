import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Research from './components/Research'
import Publications from './components/Publications'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ResearchDirections from './components/ResearchDirections'
import Contact from './components/Contact'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import { navItems } from './data/content'
import './App.css'

const SECTION_IDS = navItems.map((item) => item.id)

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120
      for (const section of ['home', ...SECTION_IDS]) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:bg-[#6b8e23] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>

      <Navigation
        currentSection={currentSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollToSection={scrollToSection}
        setLoading={setIsLoading}
      />

      <main id="main-content">
        <Home scrollToSection={scrollToSection} />
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
  )
}

export default App
