'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Link from 'next/link'
import Image from 'next/image'

export default function ResultPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const cameraIconRef = useRef<HTMLDivElement>(null)
  const galleryIconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const imageInput = imageInputRef.current
    const cameraIcon = cameraIconRef.current
    const galleryIcon = galleryIconRef.current

    const handleImageUpload = (file: File) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setImagePreview(result)
        }
        reader.readAsDataURL(file)
      }
    }

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        handleImageUpload(target.files[0])
      }
    }

    const handleCameraClick = () => {
      imageInput?.click()
    }

    const handleGalleryClick = () => {
      imageInput?.click()
    }

    if (imageInput) {
      imageInput.addEventListener('change', handleFileChange)
    }

    if (cameraIcon) {
      cameraIcon.addEventListener('click', handleCameraClick)
    }

    if (galleryIcon) {
      galleryIcon.addEventListener('click', handleGalleryClick)
    }

    return () => {
      if (imageInput) {
        imageInput.removeEventListener('change', handleFileChange)
      }
      if (cameraIcon) {
        cameraIcon.removeEventListener('click', handleCameraClick)
      }
      if (galleryIcon) {
        galleryIcon.removeEventListener('click', handleGalleryClick)
      }
    }
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
        <div className="absolute top-2 left-9 md:left-8 text-left">
          <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
          <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            <Image
              alt="Diamond Large"
              loading="lazy"
              width={482}
              height={482}
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
              style={{ color: 'transparent' }}
              src="/ResDiamond-large.png"
            />
            <Image
              alt="DiamondMedium"
              loading="lazy"
              width={444}
              height={444}
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-190"
              style={{ color: 'transparent' }}
              src="/ResDiamond-medium.png"
            />
            <Image
              alt="DiamondSmall"
              loading="lazy"
              width={405}
              height={405}
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
              style={{ color: 'transparent' }}
              src="/ResDiamond-small.png"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                ref={cameraIconRef}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              >
                <Image
                  alt="Camera Icon"
                  loading="lazy"
                  width={136}
                  height={136}
                  className="w-full h-full"
                  style={{ color: 'transparent' }}
                  src="/camera-icon.png"
                />
              </div>
              <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
                <Image
                  alt="Scan Line"
                  loading="lazy"
                  width={66}
                  height={59}
                  className="absolute hidden md:block md:right-[143px] md:top-[20px]"
                  style={{ color: 'transparent' }}
                  src="/ResScanLine.png"
                />
              </div>
            </div>
          </div>
          <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            <Image
              alt="Diamond Large"
              loading="lazy"
              width={484}
              height={484}
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
              style={{ color: 'transparent' }}
              src="/ResDiamond-large.png"
            />
            <Image
              alt="DiamondMedium"
              loading="lazy"
              width={448}
              height={448}
              className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower rotate-195"
              style={{ color: 'transparent' }}
              src="/ResDiamond-medium.png"
            />
            <Image
              alt="DiamondSmall"
              loading="lazy"
              width={408}
              height={408}
              className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
              style={{ color: 'transparent' }}
              src="/ResDiamond-small.png"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                ref={galleryIconRef}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              >
                <Image
                  alt="Photo Upload Icon"
                  loading="lazy"
                  width={136}
                  height={136}
                  className="w-full h-full"
                  style={{ color: 'transparent' }}
                  src="/gallery-icon.png"
                />
              </div>
              <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
                <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </p>
                <Image
                  alt="Gallery Line"
                  loading="lazy"
                  width={66}
                  height={59}
                  className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                  style={{ color: 'transparent' }}
                  src="/ResGalleryLine.png"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
            <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
            <div
              className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"
              style={{
                backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="image-input"
          />
        </div>
        <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
          <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
            <BackButton href="/testing" />
            {imagePreview && (
              <Link href="/select" id="proceed-link">
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}

