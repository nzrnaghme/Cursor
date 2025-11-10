import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Work.css'

interface Project {
  id: number
  title: string
  category: string
  tags: string[]
  year: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Devin AI',
    category: 'Concept • 3D Illustration • Motion Graphics • Video',
    tags: ['concept', '3d', 'mograph', 'video'],
    year: '2024'
  },
  {
    id: 2,
    title: 'Porsche: Dream Machine',
    category: 'Web • Design • Development • 3D',
    tags: ['web', 'design', 'development', '3d'],
    year: '2024'
  },
  {
    id: 3,
    title: 'Synthetic Human',
    category: 'Web • Design • Development • 3D',
    tags: ['web', 'design', 'development', '3d'],
    year: '2024'
  },
  {
    id: 4,
    title: 'Meta: Spatial Fusion',
    category: 'Web • Design • Development • 3D • Web3',
    tags: ['web', 'design', 'development', '3d', 'web3'],
    year: '2024'
  },
  {
    id: 5,
    title: 'Spaace - NFT Marketplace',
    category: 'Web • Design • Development • 3D',
    tags: ['web', 'design', 'development', '3d'],
    year: '2023'
  },
  {
    id: 6,
    title: 'DDD 2024',
    category: 'Concept • Web • Game Design • 3D',
    tags: ['concept', 'web', 'game design', '3d'],
    year: '2024'
  },
  {
    id: 7,
    title: 'Choo Choo World',
    category: 'AR • Development • 3D',
    tags: ['ar', 'development', '3d'],
    year: '2023'
  },
  {
    id: 8,
    title: 'Soda Experience',
    category: 'Web • Design • Development',
    tags: ['web', 'design', 'development'],
    year: '2023'
  }
]

const Work = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id="work" className="work" ref={containerRef}>
      <motion.div 
        className="work-container"
        style={{ opacity }}
      >
        <motion.div 
          className="work-header"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h4 className="work-label">Featured Work</h4>
          <p className="work-description">
            A Selection of our most passionately crafted works with forward-thinking clients and friends over the years.
          </p>
        </motion.div>

        <div className="work-list">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="work-footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button 
            className="work-more"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See all projects
            <span className="work-more-arrow">→</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  return (
    <motion.a
      href="#"
      className="work-item"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99] 
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="work-item-content">
        <div className="work-item-main">
          <span className="work-item-number">{String(index + 1).padStart(2, '0')}</span>
          <div className="work-item-info">
            <h2 className="work-item-title">{project.title}</h2>
            <p className="work-item-category">{project.category}</p>
          </div>
        </div>
        <div className="work-item-meta">
          <div className="work-item-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="work-item-tag">{tag}</span>
            ))}
          </div>
          <span className="work-item-year">{project.year}</span>
          <motion.span 
            className="work-item-arrow"
            whileHover={{ x: 5, y: -5 }}
          >
            →
          </motion.span>
        </div>
      </div>
      <div className="work-item-image">
        <div className="work-item-placeholder"></div>
      </div>
    </motion.a>
  )
}

export default Work
