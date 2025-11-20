// Serverless function to increment visitor count
// Vercel serverless function format

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN
    
    // Try to get current count first (fallback if GitHub Action fails)
    let currentCount = 0
    try {
      const readmeResponse = await fetch(
        `https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md`,
        { cache: 'no-store' }
      )
      if (readmeResponse.ok) {
        const readmeText = await readmeResponse.text()
        const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
        currentCount = countMatch ? parseInt(countMatch[1]) : 0
      }
    } catch (readmeError) {
      console.error('Error reading README:', readmeError)
    }

    // If GitHub token is available, trigger the action
    if (githubToken) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/dispatches`,
          {
            method: 'POST',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event_type: 'increment-visitor',
            }),
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.error('GitHub API error:', response.status, errorText)
          // Continue with fallback count increment
        }
      } catch (actionError) {
        console.error('Error triggering GitHub Action:', actionError)
        // Continue with fallback count increment
      }
    }

    // Return incremented count (even if GitHub Action fails, we increment locally)
    const newCount = currentCount + 1

    return res.status(200).json({
      success: true,
      count: newCount,
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    // Return a fallback count
    return res.status(200).json({
      success: true,
      count: 1,
    })
  }
}

