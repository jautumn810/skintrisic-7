'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import SiteHeader from '../components/SiteHeader'
import { DiamondButton } from '../components/DiamondNav'

export default function Home() {
  const router = useRouter()
  const headingRef = useRef(null)
  const [position, setPosition] = useState('center') // 'center', 'left', 'right'
  const [clickedLeft, setClickedLeft] = useState(false)
  const [clickedRight, setClickedRight] = useState(false)

  useEffect(() => {
    console.log('🏠 Home page mounted')
    // Animate heading opacity on mount
    if (headingRef.current) {
      console.log('📝 Heading ref found, setting initial opacity')
      headingRef.current.style.opacity = '0'
      const timer = setTimeout(() => {
        if (headingRef.current) {
          console.log('✨ Fading in heading')
          headingRef.current.style.transition = 'opacity 1s ease-out'
          headingRef.current.style.opacity = '1'
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      console.warn('⚠️ Heading ref not found!')
    }
  }, [])

  useEffect(() => {
    console.log('🔄 Position state changed:', { position, clickedLeft, clickedRight })
  }, [position, clickedLeft, clickedRight])

  useEffect(() => {
    // Reset to center when both buttons have been clicked
    if (clickedLeft && clickedRight) {
      console.log('✅ Both buttons clicked! Resetting to center...')
      const timer = setTimeout(() => {
        console.log('📍 Returning to center and navigating...')
        setPosition('center')
        setClickedLeft(false)
        setClickedRight(false)
        // Navigate after returning to center
        router.push('/analysis/introduce')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [clickedLeft, clickedRight, router])

  function handleLeftClick() {
    console.log('👈 Left button clicked!', { clickedLeft, currentPosition: position })
    if (!clickedLeft) {
      console.log('➡️ Moving text RIGHT (position = right)')
      setPosition('right')
      setClickedLeft(true)
    } else {
      console.log('⚠️ Left button already clicked, ignoring')
    }
  }

  function handleRightClick() {
    console.log('👉 Right button clicked!', { clickedRight, currentPosition: position })
    if (!clickedRight) {
      console.log('⬅️ Moving text LEFT (position = left)')
      setPosition('left')
      setClickedRight(true)
    } else {
      console.log('⚠️ Right button already clicked, ignoring')
    }
  }

  const headingStyle = {
    transition: 'transform 0.5s ease-in-out',
    transform: position === 'left' ? 'translateX(-100px)' : position === 'right' ? 'translateX(100px)' : 'translateX(0)'
  }
  
  console.log('🎨 Current heading style:', headingStyle, 'Position:', position)

  return (
    <>
      <SiteHeader section="INTRO" />
      <div className="home-container">
        {/* Background diamond outlines */}
        <div className="diamond-outline" style={{ opacity: 0.3 }}></div>
        <div className="diamond-outline" style={{ width: '420px', height: '420px', opacity: 0.2 }}></div>
        <div className="diamond-outline" style={{ width: '350px', height: '350px', opacity: 0.15 }}></div>
        
        {/* Main heading with movement */}
        <div id="main-heading" className="main-title">
          <h1 
            ref={headingRef} 
            style={{ 
              ...headingStyle, 
              opacity: 0,
              fontSize: 'clamp(56px, 10vw, 90px)',
              fontWeight: 300,
              lineHeight: 0.95,
              textAlign: 'center',
              marginBottom: '20px',
              letterSpacing: '0.02em',
              color: '#111',
              margin: 0
            }}
          >
            Sophisticated<br />
            <span style={{ display: 'block' }}>skincare</span>
          </h1>
        </div>
        
        <p className="subtitle">
          Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </p>

        {/* Left diamond button */}
        <div 
          style={{ position: 'fixed', left: '50px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          onClick={(e) => {
            console.log('🖱️ Left button container clicked')
            e.stopPropagation()
          }}
        >
          <DiamondButton 
            label="DISCOVER A.I." 
            variant="white" 
            onClick={(e) => {
              console.log('🔘 DiamondButton LEFT onClick triggered')
              e.preventDefault()
              e.stopPropagation()
              handleLeftClick()
            }}
          />
        </div>

        {/* Right diamond button */}
        <div 
          style={{ position: 'fixed', right: '50px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          onClick={(e) => {
            console.log('🖱️ Right button container clicked')
            e.stopPropagation()
          }}
        >
          <DiamondButton 
            label="TAKE TEST" 
            variant="black" 
            onClick={(e) => {
              console.log('🔘 DiamondButton RIGHT onClick triggered')
              e.preventDefault()
              e.stopPropagation()
              handleRightClick()
            }}
          />
        </div>
      </div>
    </>
  )
}

