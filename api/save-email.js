// Serverless function to save email subscriptions
// This can be deployed to Vercel, Netlify, or similar platforms

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    // Trigger GitHub Action to save email
    const response = await fetch(
      `https://api.github.com/repos/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
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
      throw new Error('Failed to trigger GitHub Action')
    }

    return res.status(200).json({
      success: true,
      message: 'Email saved successfully',
    })
  } catch (error) {
    console.error('Error saving email:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to save email',
    })
  }
}

