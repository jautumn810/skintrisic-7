'use client'

import SiteHeader from '../../../components/SiteHeader'
import { DiamondButton } from '../../../components/DiamondNav'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { postPhaseTwo } from '../../../lib/api'
import { saveAI, saveImageBase64 } from '../../../lib/storage'

export default function SelfiePage() {
  const router = useRouter()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let stream = null

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (e) {
        setError(e?.message ?? "Camera permission denied or unavailable.")
      }
    }

    start()

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop())
    }
  }, [])

  async function captureAndAnalyze() {
    if (!videoRef.current || !canvasRef.current) return
    setError(null)
    setLoading(true)
    setSuccess(false)

    const startTime = Date.now()

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const w = video.videoWidth || 640
      const h = video.videoHeight || 480
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas not supported.")
      ctx.drawImage(video, 0, 0, w, h)

      const b64 = canvas.toDataURL("image/png")
      saveImageBase64(b64)

      const json = await postPhaseTwo({ image: b64 })
      saveAI(json)
      
      const elapsed = Date.now() - startTime
      const minDisplay = 600
      if (elapsed < minDisplay) {
        await new Promise(resolve => setTimeout(resolve, minDisplay - elapsed))
      }
      
      setSuccess(true)
      setLoading(false)
      
      setTimeout(() => {
        router.push("/analysis/demographics")
      }, 1500)
    } catch (e) {
      setError(e?.message ?? "Failed to capture selfie.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader section="INTRO" />

      <div style={{ paddingTop: 160, maxWidth: 980, margin: "0 auto", paddingLeft: 28, paddingRight: 28 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "0.06em" }}>TAKE A SELFIE</div>

        <div style={{ marginTop: 22, background: "#efefef", padding: 18, border: "2px solid rgba(0,0,0,0.12)" }}>
          <video ref={videoRef} playsInline style={{ width: "100%", maxHeight: 520, background: "#111" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <button
          type="button"
          onClick={captureAndAnalyze}
          disabled={loading || success || !!error}
          style={{ marginTop: 16, padding: "12px 18px", background: "#111", color: "#fff", border: "none", fontWeight: 900, letterSpacing: "0.06em" }}
        >
          {loading ? "CAPTURING..." : success ? "CAPTURED" : "CAPTURE & ANALYZE"}
        </button>

        {error && (
          <div style={{ marginTop: 16, color: "#b00020", fontWeight: 800 }}>{error}</div>
        )}

        {loading && (
          <div style={{ marginTop: 16, fontWeight: 800, letterSpacing: "0.06em" }}>
            Processing submission<span className="loading-dots">...</span>
          </div>
        )}

        {success && (
          <div style={{ marginTop: 16, fontWeight: 800, letterSpacing: "0.06em" }}>
            Thank you for your submission.
          </div>
        )}
      </div>

      <div className="back-fixed">
        <DiamondButton label="BACK" variant="white" onClick={() => router.back()} />
      </div>
    </div>
  )
}

