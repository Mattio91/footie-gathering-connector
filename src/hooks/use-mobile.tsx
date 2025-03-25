
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if device is actually a mobile device
    const checkMobile = () => {
      // First check actual device width
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT
      
      // Then also check for touch capability to better detect real mobile devices
      const isTouchDevice = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 ||
                           (navigator as any).msMaxTouchPoints > 0
      
      // User agent check as fallback
      const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Set as mobile if width is mobile OR it's a touch device with mobile user agent
      setIsMobile(isMobileWidth || (isTouchDevice && userAgentMobile))
    }
    
    // Run initially
    checkMobile()
    
    // Add event listeners
    window.addEventListener('resize', checkMobile)
    window.addEventListener('orientationchange', checkMobile)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  return !!isMobile
}
