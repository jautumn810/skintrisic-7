import { useRef, useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import BackButton from '../components/BackButton'
import { Link } from 'react-router-dom'

export default function ResultPage() {
  const [imagePreview, setImagePreview] = useState(null)
  const imageInputRef = useRef(null)
  const navigate = useNavigate()

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setImagePreview(result)
        const previewDiv = document.querySelector('.preview-image-box')
        if (previewDiv) {
          previewDiv.style.backgroundImage = `url(${result})`
          previewDiv.style.backgroundSize = 'cover'
          previewDiv.style.backgroundPosition = 'center'
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  return (
    <>
      <SiteHeader section="INTRO" />
      <div style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white', position: 'relative', paddingTop: '64px', justifyContent: 'center' }}>
        <div className="absolute top-2 left-9 md:left-8 text-left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30">
          <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            <img alt="Diamond Large" className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200" src="/ResDiamond-large.png" />
            <img alt="Camera Icon" className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer" src="/camera-icon.png" onClick={() => imageInputRef.current?.click()} />
            <p className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px] text-xs md:text-sm font-normal mt-1 leading-[24px]">ALLOW A.I.<br/>TO SCAN YOUR FACE</p>
          </div>
          <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center">
            <img alt="Gallery Icon" className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer" src="/gallery-icon.png" onClick={() => imageInputRef.current?.click()} />
            <p className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px] text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">ALLOW A.I.<br/>ACCESS GALLERY</p>
          </div>
          <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8">
            <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden preview-image-box"></div>
          </div>
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
        <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0">
          <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
            <Link to="/testing"><BackButton href="/testing" /></Link>
            {imagePreview && <Link to="/select" id="proceed-link"><button>PROCEED</button></Link>}
          </div>
        </div>
      </div>
    </>
  )
}

