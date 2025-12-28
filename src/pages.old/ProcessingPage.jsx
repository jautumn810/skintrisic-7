import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'

export default function ProcessingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/thank-you')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <>
      <SiteHeader section="INTRO" />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        <div className="relative flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl sm:text-5xl font-normal text-center text-[#1A1B1C] mb-6">
            processing submission
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#1A1B1C] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

