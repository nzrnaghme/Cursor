import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { identity, cv, getCvHref } from '../data/content'
import ParticlesBackground from './ParticlesBackground'
import { slideFromLeft, slideFromRight, staggerContainer, easeSmooth } from '../utils/motion'

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false })
  const containerRef = useRef<HTMLDivElement>(null)

  const [localTime, setLocalTime] = useState('')
  const [timeZone, setTimeZone] = useState('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        setLocalTime(
          now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/Los_Angeles',
          })
        )
        setTimeZone(
          Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Los_Angeles',
            timeZoneName: 'short',
          })
            .formatToParts(now)
            .find((p) => p.type === 'timeZoneName')?.value ?? 'PT'
        )
      } catch {
        setLocalTime('--:--')
        setTimeZone('America/Los_Angeles')
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const cvHref = getCvHref()
  const currentYear = new Date().getFullYear()

  return (
    <section
      id="contact"
      className="py-20 px-6 min-h-[70vh] flex items-center bg-gradient-to-br from-[#252525] to-[#1a1a1a] text-white relative"
      ref={containerRef}
      aria-labelledby="contact-heading"
    >
      <ParticlesBackground className="opacity-40" />
      <motion.div className="max-w-[1100px] mx-auto w-full relative z-10">
        <motion.div
          className="mb-8"
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeSmooth }}
        >
          <h2
            id="contact-heading"
            className="text-[clamp(1.75rem,4vw,3rem)] font-light mb-3 tracking-[-0.02em] text-white"
          >
            Contact
          </h2>
          <p className="text-[#6b8e23] font-light">{identity.displayName}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="flex flex-col gap-6" variants={slideFromLeft}>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">
                Email
              </h3>
              <a
                href={`mailto:${identity.email}`}
                className="text-xl text-white hover:text-[#6b8e23] font-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm"
              >
                {identity.email}
              </a>
            </div>

            <div>
              <motion.a
                href={cvHref}
                download="Naghmeh_Melody_Nazar_Research_CV.pdf"
                className="inline-block px-6 py-3 bg-[#6b8e23] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#556b2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                aria-label={`Download ${cv.label}`}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {cv.label}
              </motion.a>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">
                Location
              </h3>
              <p className="text-gray-300 font-light">{identity.location}</p>
            </div>
          </motion.div>

          <motion.div className="flex flex-col gap-6" variants={slideFromRight}>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">
                Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#6b8e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm"
                  >
                    GitHub →
                  </a>
                </li>
                <li>
                  <a
                    href={identity.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#6b8e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm"
                  >
                    LinkedIn →
                  </a>
                </li>
                <li>
                  <a
                    href={identity.portfolio}
                    className="text-gray-300 hover:text-[#6b8e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] rounded-sm"
                  >
                    {identity.portfolio.replace('https://', '')} →
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-6 border border-white/10 bg-[#2a2a2a] rounded-lg">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-3">
                Get in touch
              </h3>
              <p className="text-sm text-gray-300 mb-4 font-light">
                For research collaborations, PhD inquiries, or project discussions.
              </p>
              <a
                href={`mailto:${identity.email}?subject=Research%20inquiry`}
                className="inline-block w-full text-center px-6 py-3 bg-[#6b8e23] text-white text-sm font-medium uppercase tracking-wider hover:bg-[#556b2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm transition-transform hover:-translate-y-0.5"
              >
                Send Email
              </a>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase tracking-wider">© {currentYear}</span>
                <span className="text-white">{identity.displayName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 uppercase tracking-wider">Local time (LA)</span>
                <span className="text-white" aria-live="polite">
                  {localTime} {timeZone}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
