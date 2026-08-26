import { useReducedMotion } from 'framer-motion'

export const easeSmooth = [0.22, 1, 0.36, 1] as const
export const easeOut = [0.6, -0.05, 0.01, 0.99] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeSmooth },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const slideFromRight = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
}

export const staggerContainer = (stagger = 0.08, delay = 0.12) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const cardHoverLift = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: {
    y: -6,
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
    transition: { duration: 0.3, ease: easeSmooth },
  },
}

/** Returns motion props safe for prefers-reduced-motion */
export function useMotionSafe() {
  const reduce = useReducedMotion()
  return {
    reduce: !!reduce,
    transition: reduce ? { duration: 0 } : { duration: 0.55, ease: easeSmooth },
    initial: reduce ? false : undefined,
  }
}
