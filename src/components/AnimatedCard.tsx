import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { easeSmooth } from '../utils/motion'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  hover = true,
}: AnimatedCardProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay, ease: easeSmooth }}
    whileHover={
      hover
        ? { y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.3)', transition: { duration: 0.3 } }
        : undefined
    }
  >
    {children}
  </motion.div>
)

export default AnimatedCard
