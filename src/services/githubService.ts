// Service to interact with GitHub API for saving emails and updating visitor count
// Note: This requires a backend service or GitHub Actions workflow

export interface SaveEmailResponse {
  success: boolean
  message: string
}

export interface VisitorCountResponse {
  success: boolean
  count: number
}

// Save email to subscribers.txt file
// Note: Requires backend API endpoint (see SETUP_BACKEND.md)
export const saveEmailToGit = async (email: string): Promise<SaveEmailResponse> => {
  try {
    // Try to use API endpoint (if deployed to Vercel/Netlify)
    // For local development, this will fail gracefully
    const apiUrl = (import.meta.env?.VITE_API_URL as string) || '/api/save-email'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      // If API is not set up, return a helpful message
      if (response.status === 404) {
        return {
          success: false,
          message: 'API endpoint not configured. See SETUP_BACKEND.md for setup instructions.',
        }
      }
      throw new Error('Failed to save email')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error saving email:', error)
    // In development, show a helpful message
    if (import.meta.env?.DEV) {
      return {
        success: false,
        message: 'Backend API not configured. See SETUP_BACKEND.md for setup.',
      }
    }
    return {
      success: false,
      message: 'Failed to save email. Please try again later.',
    }
  }
}

// Get and increment visitor count
// Note: Requires backend API endpoint (see SETUP_BACKEND.md)
export const incrementVisitorCount = async (): Promise<VisitorCountResponse> => {
  try {
    const apiUrl = (import.meta.env?.VITE_API_URL as string) || '/api/increment-visitor'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      // If API is not set up, try to get count from README directly
      if (response.status === 404) {
        const count = await getVisitorCount()
        return { success: true, count }
      }
      throw new Error('Failed to update visitor count')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating visitor count:', error)
    // Fallback: try to get count without incrementing
    const count = await getVisitorCount()
    return { success: true, count }
  }
}

// Get current visitor count (without incrementing)
export const getVisitorCount = async (): Promise<number> => {
  try {
    const apiUrl = (import.meta.env?.VITE_API_URL as string) || '/api/visitor-count'
    
    const response = await fetch(apiUrl, {
      method: 'GET',
    })

    if (!response.ok) {
      // Fallback: try to read from GitHub directly (public repo)
      try {
        const readmeResponse = await fetch(
          'https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md'
        )
        const readmeText = await readmeResponse.text()
        const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
        return countMatch ? parseInt(countMatch[1]) : 0
      } catch {
        return 0
      }
    }

    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.error('Error getting visitor count:', error)
    // Final fallback: try GitHub directly
    try {
      const readmeResponse = await fetch(
        'https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md'
      )
      const readmeText = await readmeResponse.text()
      const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
      return countMatch ? parseInt(countMatch[1]) : 0
    } catch {
      return 0
    }
  }
}

