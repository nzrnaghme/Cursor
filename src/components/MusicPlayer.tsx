import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = '/relaxing-piano.mp3'
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'none'

    const handleError = () => setIsAvailable(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleVisibilityChange = () => {
      if (document.hidden) audio.pause()
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      audio.pause()
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !isAvailable) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch {
      setIsPlaying(false)
    }
  }

  if (!isAvailable) return null

  return (
    <motion.button
      type="button"
      className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        isPlaying
          ? 'border-[#a9c66c]/60 bg-[#526d1d] text-white'
          : 'border-white/25 bg-white/10 text-white hover:border-[#a9c66c]/60 hover:bg-white/15'
      }`}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause optional background music' : 'Play optional background music'}
      aria-pressed={isPlaying}
      title="Optional background music"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l10-2v13" />
          <path d="M9 8l10-2" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      )}
      <audio ref={audioRef} loop preload="none" />
    </motion.button>
  )
}

export default MusicPlayer
