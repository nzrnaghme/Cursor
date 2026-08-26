import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MUSIC_PREF_KEY = 'portfolio-music-enabled'

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

    audio.addEventListener('error', handleError)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !isAvailable) return

    try {
      if (isPlaying) {
        audio.pause()
        localStorage.setItem(MUSIC_PREF_KEY, 'false')
      } else {
        await audio.play()
        localStorage.setItem(MUSIC_PREF_KEY, 'true')
      }
    } catch {
      // Autoplay blocked — user must interact first
    }
  }

  if (!isAvailable) return null

  return (
    <motion.button
      type="button"
      className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b8e23] ${
        isPlaying ? 'bg-[#6b8e23] text-white' : 'bg-[#f5f5f5] text-black hover:bg-[#6b8e23] hover:text-white'
      }`}
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause optional background music' : 'Play optional background music'}
      aria-pressed={isPlaying}
      title="Optional background music"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xs font-bold" aria-hidden>
        {isPlaying ? '❚❚' : '♪'}
      </span>
      <audio ref={audioRef} loop preload="none" />
    </motion.button>
  )
}

export default MusicPlayer
