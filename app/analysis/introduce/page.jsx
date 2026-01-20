'use client'

import SiteHeader from '../../../components/SiteHeader'
import { DiamondButton } from '../../../components/DiamondNav'
import BlinkingInput from '../../../components/BlinkingInput'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isValidLettersOnly } from '../../../lib/validators'
import { loadUser, saveUser } from '../../../lib/storage'

export default function IntroducePage() {
  // Force console log with explicit window.console AND alert to verify code runs
  if (typeof window !== 'undefined') {
    // Use alert to verify code is executing
    console.log("🚀🚀🚀 IntroducePage component rendering NOW 🚀🚀🚀")
    console.error("TEST ERROR LOG - If you see this, console is working")
    console.warn("TEST WARN LOG - If you see this, console is working")
    // Also set document title to verify
    document.title = "INTRODUCE PAGE LOADED - Check Console!"
  }
  
  const router = useRouter()
  const [name, setName] = useState("")
  const [error, setError] = useState(null)

  if (typeof window !== 'undefined') {
    window.console.log("📋 IntroducePage state - name:", name, "error:", error)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.console.log("⏰⏰⏰ IntroducePage useEffect running ⏰⏰⏰")
    }
    const u = loadUser()
    if (u?.name) setName(u.name)
    
    // Immediate log to verify useEffect is called
    if (typeof window !== 'undefined') {
      window.console.log("✅✅✅ IntroducePage useEffect callback executed ✅✅✅")
    }
    
    // Debug logging - wait for DOM to be ready
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.console.log("=== INTRODUCE PAGE DEBUG ===")
        window.console.log("⏳ Timeout callback executed (100ms after useEffect)")
      console.log("1. Page mounted")
      
      // Check if CSS is loaded
      const sheets = Array.from(document.styleSheets)
      const globalsSheet = sheets.find(sheet => {
        try {
          return sheet.href && sheet.href.includes('globals.css')
        } catch (e) {
          return false
        }
      })
      console.log("2. globals.css stylesheet found:", !!globalsSheet)
      
      // Check CSS rules
      if (globalsSheet) {
        try {
          const rules = Array.from(globalsSheet.cssRules || globalsSheet.rules || [])
          const inputTopRule = rules.find(rule => rule.selectorText && rule.selectorText.includes('.input-top'))
          if (inputTopRule) {
            console.log("3. .input-top CSS rule found:", {
              selectorText: inputTopRule.selectorText,
              cssText: inputTopRule.cssText
            })
          } else {
            console.log("3. WARNING: .input-top CSS rule NOT found in stylesheet!")
          }
        } catch (e) {
          console.log("3. Cannot access CSS rules (CORS):", e.message)
        }
      }
      
      const inputTopEl = document.querySelector('.input-top')
      console.log("4. Input-top element found:", !!inputTopEl)
      
      if (inputTopEl) {
        const styles = window.getComputedStyle(inputTopEl)
        console.log("5. input-top computed styles:", {
          marginLeft: styles.marginLeft,
          paddingLeft: styles.paddingLeft,
          marginTop: styles.marginTop,
          position: styles.position,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          letterSpacing: styles.letterSpacing,
          display: styles.display
        })
        console.log("6. input-top element position:", {
          offsetLeft: inputTopEl.offsetLeft,
          offsetTop: inputTopEl.offsetTop,
          getBoundingClientRect: inputTopEl.getBoundingClientRect()
        })
        console.log("7. input-top element text:", inputTopEl.textContent)
      } else {
        console.log("ERROR: .input-top element not found!")
      }
      
      const inputPageEl = document.querySelector('.input-page')
      if (inputPageEl) {
        const pageStyles = window.getComputedStyle(inputPageEl)
        console.log("8. .input-page styles:", {
          paddingTop: pageStyles.paddingTop,
          paddingLeft: pageStyles.paddingLeft,
          paddingRight: pageStyles.paddingRight,
          maxWidth: pageStyles.maxWidth,
          margin: pageStyles.margin
        })
        console.log("9. .input-page position:", {
          offsetLeft: inputPageEl.offsetLeft,
          offsetTop: inputPageEl.offsetTop
        })
      }
      
      const blinkingInputEl = document.querySelector('.blinking-input-text')
      console.log("10. BlinkingInput text element found:", !!blinkingInputEl)
      if (blinkingInputEl) {
        const textStyles = window.getComputedStyle(blinkingInputEl)
        console.log("11. BlinkingInput computed styles:", {
          fontSize: textStyles.fontSize,
          fontFamily: textStyles.fontFamily,
          fontWeight: textStyles.fontWeight,
          color: textStyles.color,
          display: textStyles.display
        })
        console.log("12. BlinkingInput inline style attribute:", blinkingInputEl.getAttribute('style'))
        console.log("13. BlinkingInput element text:", blinkingInputEl.textContent)
      } else {
        console.log("ERROR: .blinking-input-text element not found!")
      }
    }, 100)
  }, [])

  function onProceed() {
    if (!isValidLettersOnly(name)) {
      setError("Enter a valid name (letters only).")
      return
    }
    setError(null)
    const prev = loadUser()
    saveUser({ name: name.trim(), location: prev?.location ?? "" })
    router.push("/analysis/city")
  }

  console.log("🔄 IntroducePage about to return JSX")

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
        <DiamondButton label="BACK" variant="white" onClick={() => router.back()} />
      </div>

      <div className="right-fixed">
        <DiamondButton label="PROCEED" variant="black" onClick={onProceed} />
      </div>
    </div>
  )
}

