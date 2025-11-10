import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './MusicPlayer.css'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio()
      // Add your music file here:
      // Option 1: Place music file in public folder and reference it
      // audio.src = '/music/background-music.mp3'
      // Option 2: Use an external URL
      // audio.src = 'https://example.com/music.mp3'
      audio.loop = true
      audio.volume = 0.5
      audioRef.current = audio
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Audio play failed:', error)
          // If no audio file is set, just toggle the visual state
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.button
      className={`music-player ${isPlaying ? 'playing' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div className="music-icon-container">
        {isPlaying ? (
          // Animated wavy line when playing - magic line effect
          <motion.svg
            className="music-wave"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated wave bars - magic line running effect */}
            <motion.rect
              x="3"
              y="12"
              width="2"
              height="8"
              rx="1"
              fill="currentColor"
              animate={{ 
                height: [8, 4, 8, 12, 8],
                y: [12, 16, 12, 8, 12]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.rect
              x="7"
              y="8"
              width="2"
              height="12"
              rx="1"
              fill="currentColor"
              animate={{ 
                height: [12, 6, 12, 16, 12],
                y: [8, 14, 8, 4, 8]
              }}
              transition={{ 
                duration: 0.9, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.1,
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.rect
              x="11"
              y="4"
              width="2"
              height="16"
              rx="1"
              fill="currentColor"
              animate={{ 
                height: [16, 8, 16, 20, 16],
                y: [4, 12, 4, 0, 4]
              }}
              transition={{ 
                duration: 0.7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2,
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.rect
              x="15"
              y="10"
              width="2"
              height="10"
              rx="1"
              fill="currentColor"
              animate={{ 
                height: [10, 5, 10, 14, 10],
                y: [10, 15, 10, 6, 10]
              }}
              transition={{ 
                duration: 0.85, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.15,
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
            <motion.rect
              x="19"
              y="6"
              width="2"
              height="14"
              rx="1"
              fill="currentColor"
              animate={{ 
                height: [14, 7, 14, 18, 14],
                y: [6, 13, 6, 2, 6]
              }}
              transition={{ 
                duration: 0.75, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.25,
                times: [0, 0.25, 0.5, 0.75, 1]
              }}
            />
          </motion.svg>
        ) : isHovered ? (
          // Pause icon (two vertical lines) when hovered and paused
          <svg
            className="music-pause"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="4" width="3" height="16" fill="currentColor" />
            <rect x="13" y="4" width="3" height="16" fill="currentColor" />
          </svg>
        ) : (
          // Static wavy line when paused and not hovered
          <svg
            className="music-static"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12 L4 20 M8 8 L8 20 M12 4 L12 20 M16 10 L16 20 M20 6 L20 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <audio ref={audioRef} />
    </motion.button>
  )
}

export default MusicPlayer

