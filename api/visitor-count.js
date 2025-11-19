// Serverless function to get current visitor count
// This can be deployed to Vercel, Netlify, or similar platforms

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get count from README
    const readmeResponse = await fetch(
      `https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md`
    )
    const readmeText = await readmeResponse.text()
    const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
    const count = countMatch ? parseInt(countMatch[1]) : 0

    return res.status(200).json({
      success: true,
      count: count,
    })
  } catch (error) {
    console.error('Error getting visitor count:', error)
    return res.status(200).json({
      success: true,
      count: 0,
    })
  }
}

