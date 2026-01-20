import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import BlinkingInput from '../../components/BlinkingInput'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isValidLettersOnly } from '../../lib/validators'
import { loadUser, saveUser } from '../../lib/storage'

export default function IntroducePage() {
  console.log("🚀🚀🚀 IntroducePage component rendering NOW 🚀🚀🚀")
  
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("⏰ IntroducePage useEffect running")
    // Don't auto-load name - let user enter fresh each time
    // const u = loadUser()
    // if (u?.name) setName(u.name)
    
    setTimeout(() => {
      console.log("=== INTRODUCE PAGE DEBUG ===")
      const inputTopEl = document.querySelector('.input-top')
      console.log("1. Input-top element found:", !!inputTopEl)
      
      if (inputTopEl) {
        const styles = window.getComputedStyle(inputTopEl)
        const parentEl = inputTopEl.parentElement
        const parentStyles = parentEl ? window.getComputedStyle(parentEl) : null
        console.log("2. input-top computed styles:", {
          marginLeft: styles.marginLeft,
          paddingLeft: styles.paddingLeft,
          marginTop: styles.marginTop,
          position: styles.position,
          fontSize: styles.fontSize
        })
        console.log("2a. Parent .input-page styles:", parentStyles ? {
          paddingLeft: parentStyles.paddingLeft,
          paddingRight: parentStyles.paddingRight,
          paddingTop: parentStyles.paddingTop
        } : "Parent not found")
        console.log("3. input-top position:", inputTopEl.getBoundingClientRect())
        console.log("3a. input-top offsetLeft:", inputTopEl.offsetLeft)
      }
      
      const blinkingInputEl = document.querySelector('.blinking-input-text, span[style*="fontSize"]')
      console.log("4. BlinkingInput element found:", !!blinkingInputEl)
      if (blinkingInputEl) {
        const textStyles = window.getComputedStyle(blinkingInputEl)
        console.log("5. BlinkingInput computed styles:", {
          fontSize: textStyles.fontSize,
          color: textStyles.color
        })
        console.log("6. BlinkingInput inline style:", blinkingInputEl.getAttribute('style'))
      }
    }, 100)
  }, [])

  // Removed auto-loading from localStorage - user should enter fresh each time

  function onProceed() {
    if (!isValidLettersOnly(name)) {
      setError("Enter a valid name (letters only).")
      return
    }
    setError(null)
    const prev = loadUser()
    saveUser({ name: name.trim(), location: prev?.location ?? "" })
    navigate("/analysis/city")
  }

  return (
    <div className="input-page">
      <SiteHeader section="INTRO" />
      <div className="input-top">TO START ANALYSIS</div>

      <BlinkingInput
        value={name}
        onChange={(v) => { setName(v); if (error) setError(null); }}
        placeholder="Introduce Yourself"
      />

      <div className="underline" />

      {error && (
        <div style={{ maxWidth: 980, margin: "14px auto 0", padding: "0 28px", color: "#b00020", fontWeight: 800 }}>
          {error}
        </div>
      )}

      <div className="back-fixed">
        <DiamondButton 
          label="BACK" 
          variant="white" 
          onClick={() => {
            console.log("🔵 IntroducePage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Navigating to home page: /")
            try {
              navigate("/")
              console.log("🔵 Navigation to home successful")
            } catch (error) {
              console.error("🔵 Error navigating:", error)
            }
          }} 
        />
      </div>

      <div className="right-fixed">
        <DiamondButton label="PROCEED" variant="black" onClick={onProceed} />
      </div>
    </div>
  )
}

