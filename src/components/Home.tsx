import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticlesBackground from './ParticlesBackground'

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1f1f1f] text-white" ref={containerRef}>
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity, scale }}
      >
        <ParticlesBackground className="z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#6b8e23]/20 z-[1]"></div>
      </motion.div>

      {/* Profile Image - Top Right */}
      <motion.div
        className="absolute top-0 right-0 w-full lg:w-auto flex justify-end px-4 pt-20 z-[1] pointer-events-none"
        initial={{ opacity: 0, y: -50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="relative">
          <motion.img
            src="/images/profile-photo.png"
            alt="Profile"
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] h-auto object-contain drop-shadow-2xl opacity-100"
            style={{ 
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
              mixBlendMode: 'normal'
            }}
            initial={{ scale: 0.9 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          />
          {/* Decorative glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6b8e23]/10 to-transparent blur-3xl -z-10"></div>
        </div>
      </motion.div>

      <motion.div 
        className="relative z-[2] max-w-[1200px] w-full px-6 py-16 flex flex-col justify-center min-h-screen"
        ref={ref}
        style={{ y }}
      >
        <motion.div
          className="max-w-[800px] w-full mt-20 sm:mt-24 md:mt-32 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.h3 
            className="text-sm font-medium uppercase tracking-wider mb-4 text-[#6b8e23] w-[57%] lg:w-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AI/ML Hardware-Software Engineer
          </motion.h3>
          
          <motion.h1 
            className="text-[clamp(2rem,6vw,4.5rem)] font-light leading-tight mb-4 tracking-[-0.03em] text-white w-[57%] lg:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
Melody Nazar           </motion.h1>

          <motion.p 
            className="text-[clamp(1.1rem,2.5vw,1.75rem)] leading-relaxed mb-4 text-[#6b8e23] font-light w-[57%] lg:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Software Engineering  • Real-Time DSP/ML 
          </motion.p>

          <motion.p 
            className="text-base leading-relaxed mb-6 text-gray-300 max-w-[600px] font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Graduate student in Computer Engineering at CSUN focusing on real-time DSP/ML methods and hardware-accelerated inference on FPGA platforms.
Integrating 5+ years of software engineering experience with expertise in signal processing, embedded ML systems, and data-driven modeling.
My work sits at the intersection of machine learning, sensorimotor signals, and human cognition—building systems that interpret embodied information in real time.
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button 
              className="px-8 py-3 text-sm font-medium border-none cursor-pointer uppercase tracking-wider relative overflow-hidden bg-[#6b8e23] text-white hover:bg-[#556b2f] transition-all"
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </motion.button>
            <motion.button 
              className="px-8 py-3 text-sm font-medium cursor-pointer uppercase tracking-wider relative overflow-hidden bg-transparent text-white border-2 border-white/30 hover:border-[#6b8e23] hover:bg-[#6b8e23] transition-all"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs uppercase cursor-pointer hover:text-[#6b8e23] "
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={() => scrollToSection('projects')}
          // whileHover={{ y: -15, x: 10, scale: 1.15 }}
        >
          <span>scroll to explore</span>
          <motion.div 
            className="text-2xl text-[#6b8e23]"
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
