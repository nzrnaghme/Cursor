import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { identity, cv, getCvHref } from '../data/content'
import ParticlesBackground from './ParticlesBackground'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

interface HomeProps {
  scrollToSection: (section: string) => void
}

const Home = ({ scrollToSection }: HomeProps) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  const cvHref = getCvHref()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1a1a1a] to-[#1f1f1f] text-white"
      ref={containerRef}
      aria-label="Introduction"
    >
      <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
        <ParticlesBackground className="z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#2d5a6e]/15 z-[1]" />
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 w-full lg:w-auto flex justify-end px-2 pt-6 z-[1] pointer-events-none translate-x-2 sm:translate-x-4"
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.9, ease: easeSmooth }}
      >
        <motion.img
          src="/images/profile-photo.png"
          alt="Portrait of Naghmeh (Melody) Nazar"
          className="w-[150px] sm:w-[190px] md:w-[240px] lg:w-[320px] h-auto object-contain drop-shadow-2xl"
          loading="eager"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.8, ease: easeSmooth }}
        />
      </motion.div>

      <motion.div
        className="relative z-[2] max-w-[1100px] w-full px-6 py-16 flex flex-col justify-center min-h-screen"
        ref={ref}
        style={{ y }}
      >
        <motion.div
          className="max-w-[720px] w-full mt-20 sm:mt-24 md:mt-32 lg:mt-0"
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p
            className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-4 text-[#7eb8c9]"
            variants={fadeUp}
          >
            {identity.eyebrow}
          </motion.p>

          <motion.h1
            className="text-[clamp(1.85rem,5.5vw,3.5rem)] font-light leading-tight mb-3 tracking-[-0.03em] text-white"
            variants={fadeUp}
          >
            {identity.displayName}
          </motion.h1>

          <motion.p
            className="text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed mb-4 text-[#6b8e23] font-light"
            variants={fadeUp}
          >
            {identity.headline}
          </motion.p>

          <motion.p
            className="text-base leading-relaxed mb-8 text-gray-300 max-w-[640px] font-light"
            variants={fadeUp}
          >
            {identity.bio}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 mb-6" variants={fadeUp}>
            <motion.button
              type="button"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wider bg-[#6b8e23] text-white hover:bg-[#556b2f] rounded-sm"
              onClick={() => scrollToSection('research')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Research
            </motion.button>
            <motion.a
              href={cvHref}
              download="Naghmeh_Melody_Nazar_Research_CV.pdf"
              className="px-6 py-3 text-sm font-medium uppercase tracking-wider bg-transparent text-white border-2 border-white/30 hover:border-[#6b8e23] hover:bg-[#6b8e23] rounded-sm inline-flex items-center"
              aria-label={`Download ${cv.label}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Download Research CV
            </motion.a>
          </motion.div>

          <motion.nav
            className="flex flex-wrap gap-4 text-sm"
            aria-label="Contact links"
            variants={fadeUp}
          >
            {[
              { label: 'GitHub →', href: identity.github },
              { label: 'LinkedIn →', href: identity.linkedIn },
              { label: 'Email →', href: `mailto:${identity.email}` },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-gray-300 hover:text-[#6b8e23] rounded-sm"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>

        <motion.button
          type="button"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs uppercase hover:text-[#6b8e23] rounded-sm motion-reduce:animate-none"
          onClick={() => scrollToSection('research')}
          aria-label="Scroll to research section"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span>Scroll to research</span>
          <motion.span
            className="text-2xl text-[#6b8e23]"
            aria-hidden
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Home
