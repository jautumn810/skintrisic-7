import { useEffect, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import BackButton from '../components/BackButton'
import { Link } from 'react-router-dom'

export default function SelectPage() {
  const [analysisData, setAnalysisData] = useState(null)

  useEffect(() => {
    const storedAnalysis = sessionStorage.getItem('analysisData')
    if (storedAnalysis) {
      try {
        const parsed = JSON.parse(storedAnalysis)
        setAnalysisData(parsed)
      } catch (error) {
        console.error('Error parsing analysis data:', error)
      }
    }
  }, [])

  if (!analysisData) {
    return (
      <>
        <SiteHeader section="INTRO" />
        <div className="min-h-[90vh] flex flex-col items-center justify-center">
          <p>No analysis data found. Please upload an image first.</p>
          <Link to="/result">Go to Upload</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader section="INTRO" />
      <div>
        <div className="absolute top-10 left-8 text-left mt-5">
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm mt-1 text-muted-foreground uppercase leading-[24px]">
            A.I. has estimated the following.
            <br />
            Fix estimated information if needed.
          </p>
        </div>
        <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            <div className="flex items-center justify-center col-start-2">
              <Link to="/summary">
                <button className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
                  <span className="transform -rotate-45">Demographics</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
          <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
            <Link to="/result">
              <BackButton href="/result" />
            </Link>
            <Link to="/summary">
              <button className="text-sm font-semibold">GET SUMMARY</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

