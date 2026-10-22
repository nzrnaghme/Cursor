import { useCallback, useId } from 'react'
import { useReducedMotion } from 'framer-motion'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'

interface ParticlesBackgroundProps {
  className?: string
}

const ParticlesBackground = ({ className = '' }: ParticlesBackgroundProps) => {
  const particleId = `particles-${useId().replace(/:/g, '')}`
  const reduceMotion = useReducedMotion()
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  if (reduceMotion) return null

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Particles
        id={particleId}
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 40,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: 'push',
              },
              onHover: {
                enable: false,
                mode: 'repulse',
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: '#7eb8c9',
            },
            links: {
              color: '#a9c66c',
              distance: 150,
              enable: true,
              opacity: 0.18,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 0.35,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 24,
            },
            opacity: {
              value: 0.28,
              animation: {
                enable: false,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: 1.5,
              animation: {
                enable: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default ParticlesBackground

