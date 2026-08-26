import { ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticlesBackground from './ParticlesBackground'
import { fadeUp, staggerContainer, easeSmooth } from '../utils/motion'

interface SectionShellProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  particles?: boolean
}

const SectionShell = ({
  id,
  title,
  subtitle,
  children,
  className = 'bg-gradient-to-b from-[#252525] to-[#1a1a1a]',
  particles = true,
}: SectionShellProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

  return (
    <section
      id={id}
      className={`py-20 px-6 min-h-screen flex items-center relative overflow-hidden ${className}`}
      ref={containerRef}
      aria-labelledby={`${id}-heading`}
    >
      {particles && <ParticlesBackground className="opacity-40" />}
      <motion.div
        className="max-w-[1100px] mx-auto w-full relative z-10"
        ref={ref}
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.header className="mb-10" variants={fadeUp}>
          <motion.h2
            id={`${id}-heading`}
            className="text-[clamp(1.75rem,4vw,3rem)] font-light tracking-[-0.02em] text-white mb-3 relative inline-block"
          >
            {title}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-[#6b8e23] rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeSmooth }}
              aria-hidden
            />
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-gray-300 font-light max-w-[720px] leading-relaxed mt-4"
              variants={fadeUp}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.header>
        <motion.div variants={fadeUp}>{children}</motion.div>
      </motion.div>
    </section>
  )
}

export default SectionShell
