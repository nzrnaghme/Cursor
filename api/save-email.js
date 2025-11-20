// Serverless function to save email subscriptions
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

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid email address' 
    })
  }

  try {
    // Check if GitHub token is configured
    const githubToken = process.env.GITHUB_TOKEN
    
    if (!githubToken) {
      console.error('GITHUB_TOKEN environment variable is not set')
      // Fallback: Save to a simple file or use alternative service
      return res.status(200).json({
        success: false,
        message: 'Backend not configured. Please set GITHUB_TOKEN environment variable.',
      })
    }

    // Trigger GitHub Action to save email
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
          event_type: 'save-email',
          client_payload: {
            email: email,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GitHub API error:', response.status, errorText)
      throw new Error(`Failed to trigger GitHub Action: ${response.status}`)
    }

    return res.status(200).json({
      success: true,
      message: 'Email saved successfully',
    })
  } catch (error) {
    console.error('Error saving email:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to save email. Please try again later.',
    })
  }
}

