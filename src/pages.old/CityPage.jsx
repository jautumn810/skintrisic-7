import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import BackButton from '../components/BackButton'

export default function CityPage() {
  const navigate = useNavigate()
  const cityInputRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (cityInputRef.current) {
      cityInputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const city = formData.get('city')

    if (city && city.trim()) {
      setIsSubmitting(true)
      try {
        sessionStorage.setItem('userCity', city.trim())
        navigate('/processing')
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
      <SiteHeader section="INTRO" />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
        <div className="absolute top-16 left-9 text-left">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
          <form className="relative z-10" onSubmit={handleSubmit}>
            <input
              ref={cityInputRef}
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="your city name"
              type="text"
              autoComplete="off"
              autoFocus
              name="city"
              id="city-input"
            />
            <button type="submit" className="sr-only">Submit</button>
          </form>
        </div>
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
          <BackButton href="/" />
        </div>
      </div>
    </>
  )
}

