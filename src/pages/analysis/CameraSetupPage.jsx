import SiteHeader from '../../components/SiteHeader'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function CameraSetupPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Request camera permission
    const requestCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
          // Stop the stream immediately as we're just requesting permission
          stream.getTracks().forEach(track => track.stop())
          console.log('Camera permission granted')
        }
      } catch (error) {
        console.log('Camera permission denied or error:', error)
      }
    }

    requestCamera()

    // After a delay, navigate to selfie page
    const timer = setTimeout(() => {
      navigate("/analysis/selfie")
    }, 2500) // 2.5 seconds to show "SETTING UP CAMERA..."

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      {/* Main content container - perfectly centered */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '800px',
        zIndex: 1
      }}>
        {/* Rotating dotted diamonds - large sized */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          marginTop: '-300px',
          marginLeft: '-300px',
          border: '3px dotted rgba(0,0,0,0.18)',
          transform: 'rotate(45deg)',
          animation: 'cityDiamondSpin1 44s linear infinite',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          marginTop: '-250px',
          marginLeft: '-250px',
          border: '3px dotted rgba(0,0,0,0.15)',
          transform: 'rotate(45deg)',
          animation: 'cityDiamondSpin2 56s linear infinite',
        }}></div>

        {/* Camera aperture icon - perfectly centered */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/icons/camera-aperture.png" 
            alt="camera" 
            width={180} 
            height={180} 
            style={{ display: 'block' }}
          />
          <div style={{
            marginTop: 24,
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: '#111',
            textTransform: 'uppercase'
          }}>
            SETTING UP CAMERA ...
          </div>
        </div>
      </div>

      {/* Instructions section at bottom */}
      <div style={{
        position: 'fixed',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        maxWidth: '980px',
        width: '100%',
        padding: '0 28px',
        zIndex: 10
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: '#111',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#111',
            textTransform: 'uppercase'
          }}>
            <span style={{ fontSize: '8px' }}>◆</span>
            NEUTRAL EXPRESSION
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#111',
            textTransform: 'uppercase'
          }}>
            <span style={{ fontSize: '8px' }}>◆</span>
            FRONTAL POSE
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#111',
            textTransform: 'uppercase'
          }}>
            <span style={{ fontSize: '8px' }}>◆</span>
            ADEQUATE LIGHTING
          </div>
        </div>
      </div>
    </div>
  )
}

