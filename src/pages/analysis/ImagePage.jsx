import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fileToBase64, postPhaseTwo } from '../../lib/api'
import { saveAI, saveImageBase64, loadImageBase64 } from '../../lib/storage'

export default function ImageUploadPage() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  // Auto-process pending image from permissions page
  useEffect(() => {
    const pendingImage = localStorage.getItem('pendingImageFile')
    if (pendingImage) {
      localStorage.removeItem('pendingImageFile')
      // Process the pending image
      handleBase64Image(pendingImage)
    }
    
    // Load existing image preview if available
    const savedImage = loadImageBase64()
    if (savedImage) {
      setPreviewImage(savedImage)
    }
  }, [])

  async function handleBase64Image(b64) {
    setError(null)
    setLoading(true)
    setPreviewImage(b64) // Show preview
    try {
      saveImageBase64(b64)
      const json = await postPhaseTwo({ image: b64 })
      console.log('Phase 2 API response (full):', JSON.stringify(json, null, 2))
      console.log('Phase 2 API response (race data):', JSON.stringify(json?.data?.race, null, 2))
      console.log('Phase 2 API response (age data):', JSON.stringify(json?.data?.age, null, 2))
      console.log('Phase 2 API response (gender data):', JSON.stringify(json?.data?.gender, null, 2))
      saveAI(json)
      
      // Show success message
      setSuccess(true)
      setLoading(false)
      
      // Navigate after showing thank you message
      setTimeout(() => {
        navigate("/analysis/results")
      }, 2000)
    } catch (e) {
      setError(e?.message ?? "Failed to upload image.")
      setLoading(false)
    }
  }

  async function handleFile(file) {
    setError(null)
    setLoading(true)
    try {
      const b64 = await fileToBase64(file)
      setPreviewImage(b64) // Show preview
      saveImageBase64(b64)
      const json = await postPhaseTwo({ image: b64 })
      console.log('Phase 2 API response (full):', JSON.stringify(json, null, 2))
      console.log('Phase 2 API response (race data):', JSON.stringify(json?.data?.race, null, 2))
      console.log('Phase 2 API response (age data):', JSON.stringify(json?.data?.age, null, 2))
      console.log('Phase 2 API response (gender data):', JSON.stringify(json?.data?.gender, null, 2))
      saveAI(json)
      
      // Show success message
      setSuccess(true)
      setLoading(false)
      
      // Navigate after showing thank you message
      setTimeout(() => {
        navigate("/analysis/results")
      }, 2000)
    } catch (e) {
      setError(e?.message ?? "Failed to upload image.")
      setLoading(false)
    }
  }

  // Show processing or success state
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
        <div className="processing-overlay-container" style={{ 
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
          <div className="processing-diamond-outer" style={{
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
          <div className="processing-diamond-inner" style={{
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
            {success ? 'Thank you you may proceed to the next step' : 'Processing your analysis'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div style={{ paddingTop: 160, maxWidth: 980, margin: "0 auto", paddingLeft: 28, paddingRight: 28 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.06em" }}>UPLOAD YOUR IMAGE</div>

        <div style={{ marginTop: 40, display: "grid", gap: 22 }}>
          <label style={{ display: "block", padding: 22, background: "#efefef", border: "2px solid rgba(0,0,0,0.12)" }}>
            <div style={{ fontWeight: 900, letterSpacing: "0.06em" }}>ACCESS GALLERY</div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.55)" }}>Select an image to run Phase 2 analysis.</div>
            <input
              type="file"
              accept="image/*"
              style={{ marginTop: 14 }}
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
              disabled={loading}
            />
          </label>

          <div style={{ padding: 22, background: "#efefef", border: "2px solid rgba(0,0,0,0.12)" }}>
            <div style={{ fontWeight: 900, letterSpacing: "0.06em" }}>TAKE A SELFIE</div>
            <div style={{ marginTop: 8, color: "rgba(0,0,0,0.55)" }}>
              Use the camera instead of uploading an image.
            </div>
            <button
              type="button"
              onClick={() => navigate("/analysis/selfie")}
              style={{ marginTop: 14, padding: "10px 16px", background: "#111", color: "#fff", border: "none", fontWeight: 800, letterSpacing: "0.06em" }}
              disabled={loading}
            >
              OPEN CAMERA
            </button>
          </div>

          {previewImage && (
            <div style={{ padding: 22, background: "#efefef", border: "2px solid rgba(0,0,0,0.12)" }}>
              <div style={{ fontWeight: 900, letterSpacing: "0.06em", marginBottom: 14 }}>PREVIEW</div>
              <div style={{ 
                width: "100%", 
                maxWidth: 400, 
                height: 400, 
                border: "3px solid rgba(0,0,0,0.18)", 
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain"
                  }} 
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={{ marginTop: 18, color: "#b00020", fontWeight: 800 }}>{error}</div>
        )}
      </div>

      <div className="back-fixed">
        <DiamondButton 
          label="BACK" 
          variant="white" 
          onClick={() => {
            console.log("🔵 ImagePage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Navigating to permissions page: /analysis/permissions")
            try {
              navigate("/analysis/permissions")
              console.log("🔵 Navigation to permissions page successful")
            } catch (error) {
              console.error("🔵 Error navigating:", error)
            }
          }} 
          className="diamond-btn-small" 
        />
      </div>

      <div className="right-fixed">
        <DiamondButton 
          label="PROCEED" 
          variant="black" 
          onClick={() => navigate("/analysis/processing")} 
          className="diamond-btn-small"
        />
      </div>
    </div>
  )
}

