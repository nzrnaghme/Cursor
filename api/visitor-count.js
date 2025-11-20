// Serverless function to get current visitor count
// Vercel serverless function format

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get count from README with cache busting
    const readmeResponse = await fetch(
      `https://raw.githubusercontent.com/nzrnaghme/FPAG-Features-Clock-Management-DSP-Blocks-DDR-and-SRL-/main/README.md`,
      { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    )
    
    if (!readmeResponse.ok) {
      throw new Error(`Failed to fetch README: ${readmeResponse.status}`)
    }

    const readmeText = await readmeResponse.text()
    const countMatch = readmeText.match(/👁️ Visitor Count: (\d+)/)
    const count = countMatch ? parseInt(countMatch[1]) : 0

    return res.status(200).json({
      success: true,
      count: count,
    })
  } catch (error) {
    console.error('Error getting visitor count:', error)
    // Return 0 as fallback instead of failing
    return res.status(200).json({
      success: true,
      count: 0,
    })
  }
}

