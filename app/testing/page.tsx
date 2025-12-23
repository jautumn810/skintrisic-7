'use client'

import { FormEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Image from 'next/image'

export default function TestingPage() {
  const router = useRouter()
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    if (name && name.trim()) {
      sessionStorage.setItem('userName', name.trim())
      router.push('/result')
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
        <div className="absolute top-16 left-9 text-left">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
          <form
            className="relative z-10"
            id="name-form"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center"></div>
            <input
              ref={nameInputRef}
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              type="text"
              autoComplete="off"
              autoFocus
              name="name"
              id="name-input"
            />
            <button type="submit" className="sr-only">
              Submit
            </button>
          </form>
          <Image
            alt="Diamond Large"
            loading="lazy"
            width={762}
            height={762}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
            style={{ color: 'transparent' }}
            src="/Diamond-light-large.png"
          />
          <Image
            alt="Diamond Medium"
            loading="lazy"
            width={682}
            height={682}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
            style={{ color: 'transparent' }}
            src="/Diamond-medium-medium.png"
          />
          <Image
            alt="Diamond Small"
            loading="lazy"
            width={602}
            height={602}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest"
            style={{ color: 'transparent' }}
            src="/Diamond-dark-small.png"
          />
        </div>
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
          <BackButton href="/" />
        </div>
      </div>
    </>
  )
}

