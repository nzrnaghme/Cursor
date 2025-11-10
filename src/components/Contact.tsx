import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const Contact = () => {
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
    { name: 'Twitter / X', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' }
  ]

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <motion.div 
        className="contact-container"
        style={{ opacity }}
      >
        <motion.div 
          className="contact-header"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h2 className="contact-title">Is Your Big Idea Ready to Go Wild?</h2>
          <motion.p 
            className="contact-subtitle"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Let's work together!
          </motion.p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="contact-section">
              <h4 className="contact-section-title">General enquiries</h4>
              <a href="mailto:hello@lusion.co" className="contact-link">
                hello@lusion.co
              </a>
            </div>

            <div className="contact-section">
              <h4 className="contact-section-title">New business</h4>
              <a href="mailto:business@lusion.co" className="contact-link">
                business@lusion.co
              </a>
            </div>

            <div className="contact-section">
              <h4 className="contact-section-title">Location</h4>
              <p className="contact-location">
                Suite 29 Marsh Street<br />
                Bristol, BS1 4AA<br />
                United Kingdom
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="contact-sidebar"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="contact-socials">
              <h4 className="contact-section-title">Socials</h4>
              <ul className="social-links">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      whileHover={{ x: 5 }}
                    >
                      {link.name} →
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-newsletter">
              <h4 className="contact-section-title">Subscribe to our newsletter</h4>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="newsletter-input"
                />
                <motion.button 
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>

            <div className="contact-meta">
              <div className="contact-meta-item">
                <span className="contact-meta-label">Version</span>
                <span className="contact-meta-value">2024 © Edition</span>
              </div>
              <div className="contact-meta-item">
                <span className="contact-meta-label">Local time</span>
                <span className="contact-meta-value">{localTime}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="contact-footer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>©2024 LUSION Creative Studio</p>
          <p>Built with ❤️</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact
