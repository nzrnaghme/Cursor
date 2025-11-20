import { useState, useEffect } from 'react'
import { incrementVisitorCount, getVisitorCount } from '../services/githubService'

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null)
  const [hasCounted, setHasCounted] = useState(false)

  useEffect(() => {
    // Only count once per session
    if (hasCounted) return

    const countVisitor = async () => {
      try {
        // Check if we've already counted this visit (using sessionStorage)
        const sessionKey = 'visitor_counted'
        if (sessionStorage.getItem(sessionKey)) {
          // Get count without incrementing
          const currentCount = await getVisitorCount()
          setCount(currentCount || 0)
          return
        }

        // Increment count
        const response = await incrementVisitorCount()
        if (response.success && response.count !== null && response.count !== undefined) {
          setCount(response.count)
          sessionStorage.setItem(sessionKey, 'true')
          setHasCounted(true)
        } else {
          // Fallback: try to get count without incrementing
          const currentCount = await getVisitorCount()
          setCount(currentCount || 0)
          // Still mark as counted to avoid repeated attempts
          sessionStorage.setItem(sessionKey, 'true')
          setHasCounted(true)
        }
      } catch (error) {
        console.error('Error counting visitor:', error)
        // Set to 0 instead of null so it still displays
        setCount(0)
        // Mark as counted to avoid repeated failed attempts
        const sessionKey = 'visitor_counted'
        sessionStorage.setItem(sessionKey, 'true')
        setHasCounted(true)
      }
    }

    countVisitor()
  }, [hasCounted])

  // Show 0 if count is null (loading state)
  const displayCount = count ?? 0

  return (
    <div className="text-xs text-gray-400">
      👁️ {displayCount.toLocaleString()} visitors
    </div>
  )
}

export default VisitorCounter

