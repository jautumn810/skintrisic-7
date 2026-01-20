import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import BlinkingInput from '../../components/BlinkingInput'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isValidLettersOnly } from '../../lib/validators'
import { loadUser, saveUser } from '../../lib/storage'
import { postPhaseOne } from '../../lib/api'

export default function CityPage() {
  console.log('✅ CityPage component rendering');
  const navigate = useNavigate()
  const [city, setCity] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Removed auto-loading from localStorage - user should enter fresh each time

  async function onProceed() {
    if (!isValidLettersOnly(city)) {
      setError("Enter a valid city (letters only).")
      return
    }

    const u = loadUser()
    const name = (u?.name ?? "").trim()
    const location = city.trim()

    if (!isValidLettersOnly(name)) {
      setError("Name is missing/invalid. Go back and enter your name.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      saveUser({ name, location })
      await postPhaseOne({ name, location })
      
      // Show success message
      setSuccess(true)
      setLoading(false)
      
      // Navigate after showing thank you message
      setTimeout(() => {
        navigate("/analysis/permissions")
      }, 2000)
    } catch (e) {
      setError(e?.message ?? "Failed to submit Phase 1 API.")
      setLoading(false)
    }
  }

  if (loading || success) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative'
      }}>
        <SiteHeader section="INTRO" />
        <div style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '500px',
          height: '500px',
          zIndex: 1
        }}>
          {/* Rotating dotted diamonds - medium sized */}
          <div style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            top: '50%',
            left: '50%',
            marginTop: '-210px',
            marginLeft: '-210px',
            border: '3px dotted rgba(0,0,0,0.3)',
            transform: 'rotate(45deg)',
            animation: 'cityDiamondSpin1 44s linear infinite',
          }}></div>
          <div style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            top: '50%',
            left: '50%',
            marginTop: '-175px',
            marginLeft: '-175px',
            border: '3px dotted rgba(0,0,0,0.25)',
            transform: 'rotate(45deg)',
            animation: 'cityDiamondSpin2 56s linear infinite',
          }}></div>
          
          {/* Processing/Success text - perfectly centered */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textAlign: 'center',
            color: '#111',
            maxWidth: '400px',
            padding: '0 20px',
            lineHeight: '1.4'
          }}>
            {success ? (
              'Thank you. You may proceed to the next step'
            ) : (
              <>
                Processing submission
                <span className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="input-page city-page">
      <SiteHeader section="INTRO" />
      <div className="input-top city-input-top">TO START ANALYSIS</div>

      <BlinkingInput
        value={city}
        onChange={(v) => { setCity(v); if (error) setError(null); }}
        placeholder="your city name"
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
            console.log("🔵 CityPage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Navigating to introduce page: /analysis/introduce")
            try {
              navigate("/analysis/introduce")
              console.log("🔵 Navigation to introduce page successful")
            } catch (error) {
              console.error("🔵 Error navigating:", error)
            }
          }} 
        />
      </div>

      <div className="right-fixed">
        <DiamondButton label="PROCEED" variant="black" onClick={() => { if (!loading) onProceed(); }} />
      </div>
    </div>
  )
}

