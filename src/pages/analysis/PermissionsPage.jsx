import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { fileToBase64, postPhaseTwo } from '../../lib/api'
import { saveAI, saveImageBase64 } from '../../lib/storage'

export default function PermissionsPage() {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const fileInputRef = useRef(null)

  const handleCameraClick = () => {
    setShowCameraModal(true)
  }

  const handleAllowCamera = async () => {
    setShowCameraModal(false)
    // Navigate to camera setup page first
    navigate("/analysis/camera-setup")
  }

  const handleDenyCamera = () => {
    setShowCameraModal(false)
  }

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setLoading(true)
    
    try {
      // Show preview
      const b64 = await fileToBase64(file)
      setPreviewImage(b64)
      saveImageBase64(b64)
      
      // Show alert when image appears in preview
      alert("Image analyzed successfully")
      
      // Navigate to image page which will handle the upload and analysis
      // Store the file data temporarily so image page can process it
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('pendingImageFile', b64)
      }
      
      // Navigate to image upload page which handles processing and auto-routes to demographics
      navigate("/analysis/image")
    } catch (error) {
      console.error('Error reading file:', error)
      setLoading(false)
      alert(`Failed to read image: ${error.message}. Please try again.`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div className="ai-wrap">
        <div className="ai-top-row">
          <div className="ai-start-title">TO START ANALYSIS</div>
          <div className="ai-preview">
            <div className="ai-preview-label">Preview</div>
            <div className="ai-preview-box">
              {previewImage && (
                <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="ai-blocks-container">
          <div className="ai-block" onClick={handleCameraClick} style={{ cursor: 'pointer' }}>
            {/* Rotating dotted diamonds */}
            <div className="ai-rotating-diamond ai-diamond-outer" style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              top: '50%',
              left: '50%',
              marginTop: '-180px',
              marginLeft: '-180px',
              border: '3px dotted rgba(0,0,0,0.18)',
              transform: 'rotate(45deg)',
              animation: 'cityDiamondSpin1 44s linear infinite',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            <div className="ai-rotating-diamond ai-diamond-inner" style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              top: '50%',
              left: '50%',
              marginTop: '-150px',
              marginLeft: '-150px',
              border: '3px dotted rgba(0,0,0,0.15)',
              transform: 'rotate(45deg)',
              animation: 'cityDiamondSpin2 56s linear infinite',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            <div className="ai-block-inner">
              <img src="/icons/camera-aperture.png" alt="camera" width={180} height={180} className="ai-icon" />
              <div className="ai-label-top">ALLOW A.I.</div>
              <div className="ai-label-bottom">TO SCAN YOUR FACE</div>
            </div>
          </div>

          <div className="ai-block" onClick={handleGalleryClick} style={{ cursor: 'pointer' }}>
            {/* Rotating dotted diamonds */}
            <div className="ai-rotating-diamond ai-diamond-outer" style={{
              position: 'absolute',
              width: '360px',
              height: '360px',
              top: '50%',
              left: '50%',
              marginTop: '-180px',
              marginLeft: '-180px',
              border: '3px dotted rgba(0,0,0,0.18)',
              transform: 'rotate(45deg)',
              animation: 'cityDiamondSpin1 44s linear infinite',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            <div className="ai-rotating-diamond ai-diamond-inner" style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              top: '50%',
              left: '50%',
              marginTop: '-150px',
              marginLeft: '-150px',
              border: '3px dotted rgba(0,0,0,0.15)',
              transform: 'rotate(45deg)',
              animation: 'cityDiamondSpin2 56s linear infinite',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            <div className="ai-block-inner">
              <img src="/icons/icon-gallery.svg" alt="gallery" width={180} height={180} className="ai-icon" />
              <div className="ai-label-top">ALLOW A.I.</div>
              <div className="ai-label-bottom">ACCESS GALLERY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-fixed">
        <DiamondButton 
          label="BACK" 
          variant="white" 
          onClick={() => {
            console.log("🔵 PermissionsPage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Navigating to city page: /analysis/city")
            try {
              navigate("/analysis/city")
              console.log("🔵 Navigation to city page successful")
            } catch (error) {
              console.error("🔵 Error navigating:", error)
            }
          }} 
          className="diamond-btn-small" 
        />
      </div>

      <div className="right-fixed">
        <DiamondButton label="PROCEED" variant="black" onClick={() => navigate("/analysis/image")} className="diamond-btn-small" />
      </div>

      {/* Camera Permission Modal */}
      {showCameraModal && (
        <div className="camera-modal-overlay" onClick={handleDenyCamera}>
          <div className="camera-modal" onClick={(e) => e.stopPropagation()}>
            <div className="camera-modal-content">
              <div className="camera-modal-text">
                <span className="camera-modal-red-dot"></span>
                ALLOW A.I. TO ACCESS YOUR CAMERA
              </div>
              <div className="camera-modal-buttons">
                <button className="camera-modal-button camera-modal-deny" onClick={handleDenyCamera}>
                  DENY
                </button>
                <button className="camera-modal-button camera-modal-allow" onClick={handleAllowCamera}>
                  ALLOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

