import { useEffect, useRef } from 'react'

interface AdProps {
  slot: string
  format: 'horizontal' | 'vertical'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function Ad({ slot, format, className = '' }: AdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adLoaded = useRef(false)

  useEffect(() => {
    // Clean up previous ad if it exists
    if (adLoaded.current && adRef.current) {
      const adElement = adRef.current.querySelector('ins')
      if (adElement) {
        adElement.remove()
      }
    }

    // Reset the loaded flag
    adLoaded.current = false

    // Load new ad
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
        adLoaded.current = true
      }
    } catch (error) {
      console.error('Error loading ad:', error)
    }

    // Cleanup function
    return () => {
      if (adRef.current) {
        const adElement = adRef.current.querySelector('ins')
        if (adElement) {
          adElement.remove()
        }
      }
    }
  }, [slot, format]) // Re-run effect when slot or format changes

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`}
      data-slot={slot}
      data-format={format}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="YOUR-AD-CLIENT-ID"
        data-ad-slot={slot}
        data-ad-format={format === 'horizontal' ? 'auto' : 'vertical'}
        data-full-width-responsive="true"
      />
    </div>
  )
} 