import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ParticlesBackground from './ParticlesBackground'

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const [localTime, setLocalTime] = useState(
    new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(
        new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const socialLinks = [
    { name: 'Github', url: 'https://github.com/nzrnaghme' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/naghme-nazar/' }
  ]


  return (
    <section id="contact" className="py-20 px-6 min-h-screen flex items-center bg-gradient-to-br from-[#252525] to-[#1a1a1a] text-white relative" ref={containerRef}>
      <ParticlesBackground className="opacity-50" />
      <motion.div 
        className="max-w-[1200px] mx-auto w-full relative z-10"
      >
        <motion.div 
          className="mb-8"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light mb-3 tracking-[-0.02em] leading-tight text-white">Let's Connect</h2>
          <motion.p 
            className="text-xl text-[#6b8e23] font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Melody Nazar
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="mb-6">
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">General enquiries</h4>
              <a href="mailto:melodynzr@gmail.com" className="text-xl text-white transition-colors hover:text-[#6b8e23] inline-block font-light">
                melodynzr@gmail.com
              </a>
            </div>

            <div className="mb-6">
              <motion.a
                href="https://drive.google.com/file/d/1I6n-rMPIN7j-VpM6OlpNo1K0y9bDzEzg/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#6b8e23] text-white rounded border-none text-sm font-medium cursor-pointer uppercase tracking-wider transition-all hover:bg-[#556b2f]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </div>


            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">Location</h4>
              <p className="text-base leading-relaxed text-gray-300 font-light">
                Los Angles, California<br />
                United State
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="mb-4">
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-2">Socials</h4>
              <ul className="list-none p-0 m-0 flex flex-col">
                {socialLinks.map((link) => (
                  <li key={link.name} className="mb-2">
                    <motion.a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base text-white transition-colors hover:text-[#6b8e23] inline-block font-light"
                      whileHover={{ x: 5 }}
                    >
                      {link.name} →
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border-2 border-white/10 bg-[#2a2a2a] rounded-lg">
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-3">Get in touch</h4>
              <p className="text-sm text-gray-300 mb-4 font-light">
                Have a question or want to discuss a project? Feel free to reach out via email.
              </p>
              <motion.a
                href="mailto:melodynzr@gmail.com?subject=Hello&body=Hi Melody,"
                className="inline-block px-6 py-3 bg-[#6b8e23] text-white rounded border-none text-sm font-medium cursor-pointer uppercase tracking-wider transition-all hover:bg-[#556b2f] text-center w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Email
              </motion.a>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Version</span>
                <span className="text-sm text-white">2025 © Edition</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Local time</span>
                <span className="text-sm text-white">{localTime}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-center items-center pt-6 border-t border-white/10 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>Built with ❤️</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
