import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'

export default function ThankYouPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <>
      <SiteHeader section="INTRO" />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        <div className="relative flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-center text-[#1A1B1C] mb-3">
            Thank you!
          </h1>
          <p className="text-2xl sm:text-3xl font-normal text-center text-[#1A1B1C] opacity-70">
            Proceed for the next step
          </p>
        </div>
      </div>
    </>
  )
}

