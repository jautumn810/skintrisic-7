import SiteHeader from '../../components/SiteHeader'
import { DiamondButton } from '../../components/DiamondNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { postPhaseTwo } from '../../lib/api'
import { saveAI, saveImageBase64 } from '../../lib/storage'

export default function SelfiePage() {
  console.log("🔵 SelfiePage component rendering")
  
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  
  console.log("🔵 SelfiePage state:", { loading, success, captureConfirmed: capturedImage !== null })

  useEffect(() => {
    let stream = null
    let videoElement = videoRef.current

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
        videoElement = videoRef.current
        if (videoElement) {
          videoElement.srcObject = stream
          // Wait for video metadata to load before playing
          videoElement.onloadedmetadata = () => {
            if (videoElement) {
              videoElement.play().catch(err => {
                // Silently handle play errors (browser autoplay policies)
                console.log('Video play prevented by browser:', err)
              })
            }
          }
          // Also try to play immediately in case metadata is already loaded
          if (videoElement.readyState >= 2) {
            videoElement.play().catch(err => {
              console.log('Video play prevented:', err)
            })
          }
        }
      } catch (e) {
        // Only show critical errors
        if (e.name !== 'NotAllowedError' && e.name !== 'NotFoundError') {
          console.error('Camera error:', e)
        }
        setError(e?.message ?? "Camera permission denied or unavailable.")
      }
    }

    start()

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop())
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        videoElement.srcObject = null
      }
    }
  }, [])

  const [captureConfirmed, setCaptureConfirmed] = useState(false)

  async function captureAndAnalyze() {
    console.log("🟣 captureAndAnalyze function called!")
    console.log("🟣 captureConfirmed:", captureConfirmed)
    console.log("🟣 capturedImage exists:", !!capturedImage)
    console.log("🟣 capturedImage length:", capturedImage?.length)
    console.log("🟣 videoRef.current:", !!videoRef.current)
    console.log("🟣 canvasRef.current:", !!canvasRef.current)
    console.log("🟣 loading:", loading)
    console.log("🟣 success:", success)
    
    // If capture is confirmed and we have an image, skip video/canvas check and go straight to analysis
    if (captureConfirmed && capturedImage) {
      console.log("🟣 Capture confirmed and image exists, skipping to analysis section...")
      // Skip directly to analysis section - don't check video/canvas or try to capture again
    } else if (!captureConfirmed) {
      // If capture not confirmed yet, we need video/canvas to capture
      if (!videoRef.current || !canvasRef.current) {
        console.log("🟣 Early return: video or canvas not ready and capture not confirmed")
        // Only return early if we're trying to capture but don't have video/canvas ready
        return
      }
      
      // If capture not confirmed yet, just capture the image
      console.log("🟣 Capturing image (first click)...")
      setError(null)
      
      try {
        const video = videoRef.current
        const canvas = canvasRef.current
        
        // Check if video is ready
        if (!video.videoWidth || !video.videoHeight) {
          console.error("🟣 Video stream not ready")
          throw new Error("Video stream not ready. Please wait for camera to initialize.")
        }
        
        const w = video.videoWidth
        const h = video.videoHeight
        console.log('🟣 Video dimensions:', w, 'x', h)
        
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          console.error("🟣 Canvas context not available")
          throw new Error("Canvas not supported.")
        }
        
        console.log("🟣 Drawing image to canvas...")
        ctx.drawImage(video, 0, 0, w, h)

        const dataURL = canvas.toDataURL("image/png")
        console.log('🟣 Captured image data URL length:', dataURL?.length)
        console.log('🟣 Data URL prefix:', dataURL?.substring(0, 50))
        
        if (!dataURL || typeof dataURL !== 'string' || dataURL.length < 100) {
          console.error("🟣 Invalid image data")
          throw new Error("Failed to capture image from canvas. Image data is invalid.")
        }
        
        // Save and display the captured image
        console.log("🟣 Saving image to storage...")
        saveImageBase64(dataURL)
        console.log("🟣 Setting capturedImage state...")
        setCapturedImage(dataURL)
        console.log("🟣 Setting captureConfirmed to true...")
        setCaptureConfirmed(true)
        
        // Stop the video stream to show the captured image
        if (videoRef.current?.srcObject) {
          console.log("🟣 Stopping video stream...")
          const stream = videoRef.current.srcObject
          stream.getTracks().forEach(track => track.stop())
        }
        
        // Show confirmation message
        console.log("🟣 Showing capture confirmation alert...")
        alert("Selfie captured successfully! Click 'ANALYZE CAPTURED IMAGE' to analyze.")
        console.log("🟣 Capture completed successfully")
      } catch (e) {
        console.error('🟣 Capture error:', e)
        setError(e?.message ?? "Failed to capture selfie.")
      }
      return
    }
    
    // If capture is confirmed, proceed with analysis
    console.log("🟣 Analyzing captured image (second click)...")
    console.log("🟣 Setting error to null and loading to true...")
    setError(null)
    setLoading(true)
    console.log("🟣 Loading state set to:", true)

    try {
      if (!capturedImage) {
        console.error("🟣 No captured image found!")
        throw new Error("No captured image found. Please capture again.")
      }
      
      console.log('🟣 Sending image to API...')
      console.log('🟣 Image data URL length:', capturedImage.length)
      console.log('🟣 Image data URL preview:', capturedImage.substring(0, 100))
      
      // Send the full data URL - the API expects this format (same as fileToBase64 returns)
      console.log("🟣 Calling postPhaseTwo with image...")
      const json = await postPhaseTwo({ image: capturedImage })
      console.log('🟣 Phase 2 API response received:', json)
      console.log('🟣 API response keys:', Object.keys(json || {}))
      console.log('🟣 API response message:', json?.message)
      console.log('🟣 API response data:', json?.data)
      
      console.log("🟣 Saving AI data to storage...")
      saveAI(json)
      console.log("🟣 AI data saved")
      
      // Show success message
      console.log("🟣 Setting success to true and loading to false...")
      setSuccess(true)
      setLoading(false)
      console.log("🟣 State updated - success:", true, "loading:", false)
      
      // Navigate after showing thank you message
      console.log("🟣 Setting timeout to navigate in 2 seconds...")
      setTimeout(() => {
        console.log("🟣 Timeout fired, navigating to /analysis/results...")
        navigate("/analysis/results")
        console.log("🟣 Navigation called")
      }, 2000)
    } catch (e) {
      console.error('🟣 Analysis error:', e)
      console.error('🟣 Error name:', e?.name)
      console.error('🟣 Error message:', e?.message)
      console.error('🟣 Error stack:', e?.stack)
      setError(e?.message ?? "Failed to analyze selfie.")
      setLoading(false)
      console.log("🟣 Error handled, loading set to false")
    }
  }

  // Show processing or success overlay on top of the page
  const showProcessingOverlay = loading || success

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div style={{ paddingTop: 160, maxWidth: 980, margin: "0 auto", paddingLeft: 28, paddingRight: 28 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.06em" }}>TAKE A SELFIE</div>

        <div style={{ marginTop: 22, background: "#efefef", padding: 18, border: "2px solid rgba(0,0,0,0.12)" }}>
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured selfie" 
              style={{ width: "100%", maxHeight: 520, objectFit: "contain", background: "#111" }} 
            />
          ) : (
            <video ref={videoRef} playsInline style={{ width: "100%", maxHeight: 520, background: "#111" }} />
          )}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            console.log("🟠 BUTTON CLICKED!")
            console.log("🟠 Event:", e)
            console.log("🟠 Button state:", { captureConfirmed, loading, success, hasCapturedImage: !!capturedImage })
            console.log("🟠 Button disabled:", loading || success)
            console.log("🟠 Calling captureAndAnalyze...")
            captureAndAnalyze()
            console.log("🟠 captureAndAnalyze call completed")
          }}
          disabled={loading || success}
          style={{ marginTop: 16, padding: "12px 18px", background: "#111", color: "#fff", border: "none", fontWeight: 900, letterSpacing: "0.06em", cursor: (loading || success) ? "not-allowed" : "pointer" }}
        >
          {captureConfirmed ? "ANALYZE CAPTURED IMAGE" : "CAPTURE & ANALYZE"}
        </button>
        
        {captureConfirmed && (
          <button
            type="button"
            onClick={() => {
              setCapturedImage(null)
              setCaptureConfirmed(false)
              // Restart camera
              navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
                .then(stream => {
                  if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.play()
                  }
                })
                .catch(e => setError("Failed to restart camera: " + e.message))
            }}
            style={{ marginTop: 12, padding: "12px 18px", background: "#fff", color: "#111", border: "2px solid #111", fontWeight: 900, letterSpacing: "0.06em", cursor: "pointer" }}
          >
            RETRY CAPTURE
          </button>
        )}

        {error && (
          <div style={{ marginTop: 16, color: "#b00020", fontWeight: 800 }}>{error}</div>
        )}
      </div>

      <div 
        className="back-fixed" 
        style={{ zIndex: 2000 }}
        onClick={(e) => {
          console.log("🟡 back-fixed div clicked!", e)
        }}
      >
        <DiamondButton 
          label="BACK" 
          variant="white"
          disabled={false}
          onClick={(e) => {
            console.log("🔵 SelfiePage BACK button clicked")
            console.log("🔵 Current location:", window.location.pathname)
            console.log("🔵 Current state:", { loading, success, captureConfirmed: capturedImage !== null })
            console.log("🔵 Video ref current:", !!videoRef.current)
            console.log("🔵 Video srcObject:", !!videoRef.current?.srcObject)
            console.log("🔵 Navigate function exists:", typeof navigate === 'function')
            console.log("🔵 History length:", window.history.length)
            
            try {
              // Stop any video stream before going back
              if (videoRef.current?.srcObject) {
                console.log("🔵 Stopping video stream...")
                const stream = videoRef.current.srcObject
                stream.getTracks().forEach(track => {
                  console.log("🔵 Stopping track:", track.kind)
                  track.stop()
                })
                videoRef.current.srcObject = null
                console.log("🔵 Video stream stopped")
              } else {
                console.log("🔵 No video stream to stop")
              }
              
              // Navigate directly to permissions page instead of going back
              // This avoids the loop with CameraSetupPage which auto-navigates forward
              console.log("🔵 Navigating to permissions page: /analysis/permissions")
              navigate("/analysis/permissions", { replace: true })
              console.log("🔵 Navigation to permissions page successful")
            } catch (error) {
              console.error("🔵 Error in back button handler:", error)
            }
          }}
        />
      </div>

      {/* Processing/Success overlay */}
      {showProcessingOverlay && (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000,
          pointerEvents: 'none' // Allow clicks to pass through to back button
        }}>
          <div className="processing-overlay-container" style={{ 
            position: 'relative',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '500px',
            height: '500px',
            zIndex: 1,
            pointerEvents: 'auto' // Re-enable pointer events for the content area
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
      )}
    </div>
  )
}

