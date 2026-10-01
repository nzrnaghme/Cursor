import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { identity, cv, getCvHref } from '../data/content'
import ParticlesBackground from './ParticlesBackground'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

const Home = () => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const cvHref = getCvHref()

  return (
    <section
      id="home"
      tabIndex={-1}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1a1a1a] to-[#1f1f1f] text-white"
      ref={containerRef}
      aria-label="Introduction"
    >
      <motion.div className="absolute inset-0 z-0" style={reduceMotion ? undefined : { opacity, scale }} aria-hidden="true">
        <ParticlesBackground className="z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[#2d5a6e]/15 z-[1]" />
      </motion.div>

      <div className="relative z-[2] max-w-[1100px] w-full px-6 pt-28 pb-8 sm:pt-32" ref={ref}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_280px] gap-x-8 lg:gap-x-12 gap-y-5 items-start"
          variants={staggerContainer(0.08, 0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="min-w-0 sm:col-start-1 sm:row-start-1" variants={fadeUp}>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-5 text-[#7eb8c9]">
              {identity.eyebrow}
            </p>
            <h1 className="text-[clamp(1.85rem,5.5vw,3.25rem)] font-light leading-tight mb-3 tracking-[-0.03em] text-white">
              {identity.displayName}
            </h1>
            <p className="text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-[#a9c66c] font-light">
              {identity.headline}
            </p>
          </motion.div>

          <motion.div
            className="justify-self-center sm:col-start-2 sm:row-start-1 sm:row-span-4 sm:pt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: easeSmooth }}
          >
            <motion.img
              src="/images/profile-photo.png"
              alt="Portrait of Naghmeh (Melody) Nazar"
              width={832}
              height={1248}
              className="w-[104px] sm:w-[180px] lg:w-[280px] h-auto object-contain drop-shadow-2xl"
              loading="eager"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.p className="text-base leading-relaxed text-gray-300 max-w-[640px] font-light sm:col-start-1 sm:row-start-2" variants={fadeUp}>
            {identity.bio}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 sm:col-start-1 sm:row-start-3" variants={fadeUp}>
            <motion.a
              href="#research"
              className="px-5 py-3 text-sm font-medium uppercase tracking-wider bg-[#526d1d] text-white hover:bg-[#455b18] rounded-sm inline-flex items-center"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Research
            </motion.a>
            <motion.a
              href={cvHref}
              download="Naghmeh_Melody_Nazar_Research_CV.pdf"
              className="px-5 py-3 text-sm font-medium uppercase tracking-wider bg-transparent text-white border-2 border-white/30 hover:border-[#6b8e23] hover:bg-[#526d1d] rounded-sm inline-flex items-center"
              aria-label={`Download ${cv.label}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Download Research CV
            </motion.a>
          </motion.div>

          <motion.nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:col-start-1 sm:row-start-4" aria-label="Contact links" variants={fadeUp}>
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
                className="text-gray-300 hover:text-[#a9c66c] rounded-sm py-1"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>

        <motion.a
          href="#research"
          className="mt-8 mx-auto w-fit flex flex-col items-center gap-1 text-gray-400 text-xs uppercase hover:text-[#a9c66c] rounded-sm"
          aria-label="Scroll to research section"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <span>Scroll to research</span>
          <motion.span
            className="text-2xl text-[#a9c66c]"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}

export default Home
