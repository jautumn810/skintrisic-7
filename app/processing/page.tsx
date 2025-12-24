'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

export default function ProcessingPage() {
  const router = useRouter()

  useEffect(() => {
    // Navigate to thank you page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/thank-you')
    }, 3000)

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
          <h1 className="text-4xl sm:text-5xl font-normal text-center text-[#1A1B1C] mb-6">
            processing submission
          </h1>
          
          {/* Three dots loading indicator - evenly spaced on separate line */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-dot-1"></div>
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-dot-2"></div>
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-dot-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

