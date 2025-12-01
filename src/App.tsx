import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="app">
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>
      
      <Navigation 
        currentSection={currentSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollToSection={scrollToSection}
        setLoading={setIsLoading}
      />
      <Home scrollToSection={scrollToSection} />
      <About />
      <Projects />
      <Contact />
      <ScrollToTop />
    </div>
  )
}

export default App


