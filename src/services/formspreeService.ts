// Alternative service using Formspree (no backend required)
// To use this instead of GitHub API:
// 1. Sign up at https://formspree.io (free tier: 50 submissions/month)
// 2. Get your form ID
// 3. Replace the saveEmailToGit call in Contact.tsx with saveEmailToFormspree

const FORMPREE_FORM_ID = 'YOUR_FORM_ID_HERE' // Replace with your Formspree form ID

export interface SaveEmailResponse {
  success: boolean
  message: string
}

export const saveEmailToFormspree = async (email: string): Promise<SaveEmailResponse> => {
  try {
    const response = await fetch(`https://formspree.io/f/${FORMPREE_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        _subject: 'Newsletter Subscription',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to save email')
    }

    return {
      success: true,
      message: 'Thank you for subscribing!',
    }
  } catch (error) {
    console.error('Error saving email:', error)
    return {
      success: false,
      message: 'Failed to save email. Please try again later.',
    }
  }
}

