// Serverless function to increment visitor count
// This can be deployed to Vercel, Netlify, or similar platforms

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Trigger GitHub Action to increment visitor count
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
          event_type: 'increment-visitor',
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to trigger GitHub Action: ${errorText}`)
    }

    // Get updated count from README (simplified - in production, you'd want to cache this)
    const readmeResponse = await fetch(
      `https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md`
    )
    const readmeText = await readmeResponse.text()
    const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
    const count = countMatch ? parseInt(countMatch[1]) + 1 : 1

    return res.status(200).json({
      success: true,
      count: count,
    })
  } catch (error) {
    console.error('Error incrementing visitor count:', error)
    return res.status(500).json({
      success: false,
      count: 0,
    })
  }
}

