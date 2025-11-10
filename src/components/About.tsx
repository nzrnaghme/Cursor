import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
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

  return (
    <section id="about" className="about" ref={containerRef}>
      <motion.div 
        className="about-container"
        style={{ opacity, y }}
      >
        <motion.div 
          className="about-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.h2 
            className="about-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Connecting Ideals to Uniquely Crafted Experiences
          </motion.h2>

          <motion.div 
            className="about-description"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p>
              At Lusion, we don't follow trends for the sake of it. We believe in a different approach - 
              one that's centered around you, your audience, and the art of creating a memorable, 
              personalized experience.
            </p>
            <p>
              Our commitment goes beyond fleeting trends; it's about crafting tailor-made digital journeys 
              that resonate uniquely and leave a lasting impact.
            </p>
          </motion.div>

          <motion.div 
            className="about-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h3 
              className="about-cta-text"
              whileHover={{ scale: 1.02 }}
            >
              Step into a new world<br />
              and let your<br />
              <span className="about-cta-highlight">imagination run wild</span>
            </motion.h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
