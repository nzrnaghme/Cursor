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
          setCount(currentCount)
          return
        }

        // Increment count
        const response = await incrementVisitorCount()
        if (response.success) {
          setCount(response.count)
          sessionStorage.setItem(sessionKey, 'true')
          setHasCounted(true)
        } else {
          // Fallback: try to get count without incrementing
          const currentCount = await getVisitorCount()
          setCount(currentCount)
        }
      } catch (error) {
        console.error('Error counting visitor:', error)
        setCount(null)
      }
    }

    countVisitor()
  }, [hasCounted])

  if (count === null) {
    return null // Don't show anything while loading
  }

  return (
    <div className="text-xs text-gray-400">
      👁️ {count.toLocaleString()} visitors
    </div>
  )
}

export default VisitorCounter

