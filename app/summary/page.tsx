'use client'

import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Link from 'next/link'

export default function SummaryPage() {
  return (
    <>
      <Header />
      <main>
        <div>
          <div>
            <p>No analysis data found. Please upload an image first.</p>
            <Link href="/result">
              <button>Go to Upload Page or take a Picture with your device</button>
            </Link>
          </div>
          <div>
            <BackButton href="/select" />
            <Link href="/">
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    HOME
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    HOME
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
      </main>
    </>
  )
}

