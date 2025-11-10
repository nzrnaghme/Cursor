import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Free relaxing piano music
      // Option 1: Use a local file (recommended) - place your music file in the 'public' folder
      // Uncomment the line below and add your music file to the public folder:
      // audio.src = '/relaxing-piano.mp3'
      
      // Option 2: Use a remote URL (current setup - may not always work due to CORS)
      // Using local file from public folder
      audio.src = '/relaxing-piano.mp3'
      audio.loop = true
      audio.volume = 0.4
      audio.preload = 'auto'
      
      // Handle audio events
      const handleCanPlay = () => {
        console.log('Audio ready to play')
      }
      
      const handleError = (e: Event) => {
        console.error('Audio loading error:', e)
        console.log('Tip: You can add your own relaxing music file in the public folder and reference it as /your-file.mp3')
      }
      
      const handlePlay = () => {
        setIsPlaying(true)
      }
      
      const handlePause = () => {
        setIsPlaying(false)
      }
      
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      
      // Cleanup
      return () => {
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.pause()
      }
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (audio) {
      try {
        if (isPlaying) {
          audio.pause()
        } else {
          await audio.play()
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        // If autoplay is blocked, show a message
        alert('Please interact with the page first, then try playing the music again.')
      }
    }
  }

  return (
    <motion.button
      className={`w-12 h-12 rounded-full border-none flex items-center justify-center cursor-pointer transition-all relative overflow-hidden ${
        isPlaying || isHovered 
          ? 'bg-[#6b8e23]' 
          : 'bg-[#f5f5f5] hover:bg-[#6b8e23]'
      }`}
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div className={`w-6 h-6 flex items-center justify-center transition-colors ${
        isPlaying || isHovered ? 'text-white' : 'text-black'
      }`}>
        {isPlaying ? (
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          <svg
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
          <svg
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
      <audio ref={audioRef} loop preload="auto" />
    </motion.button>
  )
}

export default MusicPlayer
