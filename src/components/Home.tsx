import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import Scene3D from './Scene3D'
import './Home.css'

interface HomeProps {
  scrollToSection: (section: string) => void
}

const Home = ({ scrollToSection }: HomeProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section id="home" className="home" ref={containerRef}>
      <motion.div 
        className="home-background"
        style={{ opacity, scale }}
      >
        <div className="home-video-overlay"></div>
        <div className="home-3d-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene3D />
          </Canvas>
        </div>
      </motion.div>

      <motion.div 
        className="home-container"
        ref={ref}
        style={{ y }}
      >
        <motion.div
          className="home-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.h3 
            className="home-subtitle"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Digital Production Studio
          </motion.h3>
          
          <motion.h1 
            className="home-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            We help brands create digital experiences that connect with their audience
          </motion.h1>

          <motion.p 
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Beyond Visions<br />
            Within Reach
          </motion.p>

          <motion.p 
            className="home-description-secondary"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            We bring your ideas to life through visually captivating designs and interactive experiences. 
            With our talented team, we push the boundaries by solving complex problems, delivering tailored 
            solutions that exceed expectations and engage audiences.
          </motion.p>

          <motion.div
            className="home-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button 
              className="home-button primary"
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About us
            </motion.button>
            <motion.button 
              className="home-button secondary"
              onClick={() => scrollToSection('work')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span>scroll to explore</span>
          <motion.div 
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Home
