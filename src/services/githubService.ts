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
      // Try to get error message from response
      let errorMessage = 'Failed to save email'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        // If response is not JSON, use status-based message
        if (response.status === 404) {
          errorMessage = 'API endpoint not found. Please ensure backend is deployed.'
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again later.'
        }
      }
      
      return {
        success: false,
        message: errorMessage,
      }
    }

    const data = await response.json()
    
    // Check if the response indicates failure
    if (!data.success) {
      return {
        success: false,
        message: data.message || 'Failed to save email. Please try again later.',
      }
    }
    
    return data
  } catch (error) {
    console.error('Error saving email:', error)
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      }
    }
    
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
        console.warn('API endpoint not found, falling back to direct README read')
        const count = await getVisitorCount()
        return { success: true, count }
      }
      // For other errors, still try to get the count
      console.warn('API error, falling back to direct README read')
      const count = await getVisitorCount()
      return { success: true, count }
    }

    const data = await response.json()
    
    // Even if API returns success: false, try to return a count
    if (!data.success && data.count !== undefined) {
      return { success: true, count: data.count }
    }
    
    return data
  } catch (error) {
    console.error('Error updating visitor count:', error)
    // Fallback: try to get count without incrementing
    try {
      const count = await getVisitorCount()
      return { success: true, count }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError)
      // Last resort: return 0
      return { success: true, count: 0 }
    }
  }
}

// Get current visitor count (without incrementing)
export const getVisitorCount = async (): Promise<number> => {
  try {
    const apiUrl = (import.meta.env?.VITE_API_URL as string) || '/api/visitor-count'
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      // Add cache busting to ensure fresh data
      cache: 'no-store',
    })

    if (!response.ok) {
      // Fallback: try to read from GitHub directly (public repo)
      console.warn('API failed, trying direct GitHub read')
      return await getVisitorCountFromGitHub()
    }

    const data = await response.json()
    return data.count || 0
  } catch (error) {
    console.error('Error getting visitor count:', error)
    // Final fallback: try GitHub directly
    return await getVisitorCountFromGitHub()
  }
}

// Helper function to get count directly from GitHub
const getVisitorCountFromGitHub = async (): Promise<number> => {
  try {
    const readmeResponse = await fetch(
      'https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md',
      { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    )
    
    if (!readmeResponse.ok) {
      console.error('Failed to fetch README:', readmeResponse.status)
      return 0
    }
    
    const readmeText = await readmeResponse.text()
    const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
    return countMatch ? parseInt(countMatch[1]) : 0
  } catch (error) {
    console.error('Error reading from GitHub:', error)
    return 0
  }
}

