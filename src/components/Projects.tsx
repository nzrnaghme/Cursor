import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Projects.css'

const Projects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, -50])

  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A stunning digital experience that pushes the boundaries of web design and user interaction.',
      category: 'Web Design',
      year: '2024'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Interactive 3D visualization with immersive user experience and cutting-edge technology.',
      category: '3D Design',
      year: '2024'
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Brand identity and website redesign that captures the essence of modern digital culture.',
      category: 'Branding',
      year: '2023'
    },
    {
      id: 4,
      title: 'Project Four',
      description: 'E-commerce platform with seamless user experience and innovative payment solutions.',
      category: 'Web Development',
      year: '2023'
    },
    {
      id: 5,
      title: 'Project Five',
      description: 'Mobile application design with intuitive interface and beautiful animations.',
      category: 'Mobile Design',
      year: '2024'
    },
    {
      id: 6,
      title: 'Project Six',
      description: 'Creative agency website showcasing portfolio with dynamic content and smooth transitions.',
      category: 'Web Design',
      year: '2023'
    }
  ]

  return (
    <section id="projects" className="projects" ref={containerRef}>
      <motion.div 
        className="projects-container"
        style={{ opacity, y }}
      >
        <motion.div 
          className="projects-header"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <div className="projects-header-top">
            <div>
              <h2 className="projects-title">Projects</h2>
              <p className="projects-description">
                A selection of our most passionately crafted works with forward-thinking clients.
              </p>
            </div>
            <div className="view-toggle">
              <motion.button
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
              <motion.button
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`projects-display ${viewMode}`}
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="project-image">
                    <div className="project-placeholder">{project.title}</div>
                  </div>
                  <div className="project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <span className="project-year">{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="projects-list">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-list-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="project-list-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="project-list-image">
                    <div className="project-list-placeholder">{project.title}</div>
                  </div>
                  <div className="project-list-content">
                    <div className="project-list-header">
                      <h3 className="project-list-title">{project.title}</h3>
                      <span className="project-list-year">{project.year}</span>
                    </div>
                    <span className="project-list-category">{project.category}</span>
                    <p className="project-list-description">{project.description}</p>
                  </div>
                  <div className="project-list-arrow">→</div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
