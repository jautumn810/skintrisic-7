'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'

export default function CityPage() {
  const router = useRouter()
  const cityInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (cityInputRef.current) {
      cityInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const city = formData.get('city') as string

    if (city && city.trim()) {
      setIsSubmitting(true)
      try {
        // Store city in sessionStorage
        sessionStorage.setItem('userCity', city.trim())
        // Navigate to result page
        router.push('/result')
      } catch (error) {
        console.error('Error submitting city:', error)
        alert('An error occurred. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        {/* Dotted geometric pattern background - faint overlapping squares/diamonds */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px),
              repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: 'center',
          }}
        />
        
        {/* TO START ANALYSIS text */}
        <div className="absolute top-16 left-9 text-left z-10">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>

        {/* Main input area */}
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full z-10">
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
          <form
            className="relative z-10"
            id="city-form"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center">
              <input
                ref={cityInputRef}
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10 placeholder:text-[#1A1B1C] placeholder:opacity-60"
                placeholder="your city name"
                type="text"
                autoComplete="off"
                autoFocus
                name="city"
                id="city-input"
              />
            </div>
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
        </div>

        {/* Right side circular buttons - stacked vertically along right edge */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {/* S button - top */}
          <button 
            type="button"
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg hover:opacity-90 transition-opacity duration-300 shadow-sm"
            aria-label="S button"
          >
            S
          </button>
          {/* Scissors button - middle */}
          <button 
            type="button"
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-300 shadow-sm"
            aria-label="Scissors button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"></path>
              <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"></path>
              <path d="M4 22h16"></path>
              <path d="M10 6.5a6.5 6.5 0 0 1 4 0"></path>
              <path d="M14 6.5a6.5 6.5 0 0 1 4 0"></path>
              <path d="M12 6v16"></path>
            </svg>
          </button>
          {/* X button - bottom */}
          <button 
            type="button"
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xl hover:opacity-90 transition-opacity duration-300 shadow-sm"
            aria-label="Close button"
          >
            ×
          </button>
        </div>

        {/* Bottom navigation */}
        <div className="absolute bottom-8 md:bottom-8 w-full flex justify-between md:px-9 px-13 z-10">
          <BackButton href="/testing" />
        </div>
      </div>
    </>
  )
}

