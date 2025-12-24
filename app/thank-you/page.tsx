'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Link from 'next/link'

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    // Navigate to result page after 5 seconds automatically, or user can click proceed
    const timer = setTimeout(() => {
      router.push('/result')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        {/* Dotted geometric pattern background - rotating */}
        <div 
          className="absolute inset-0 opacity-[0.15] animate-pattern-rotate"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px),
              repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(160, 164, 171, 0.3) 15px, rgba(160, 164, 171, 0.3) 16px)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: 'center',
            transformOrigin: 'center center',
          }}
        />
        
        {/* Main content */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-center text-[#1A1B1C] mb-3">
            Thank you!
          </h1>
          <p className="text-2xl sm:text-3xl font-normal text-center text-[#1A1B1C] opacity-70">
            Proceed for the next step
          </p>
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
          <BackButton href="/processing" />
          <Link href="/result" id="proceed-link">
            <div>
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                  PROCEED
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">
                  PROCEED
                </span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

