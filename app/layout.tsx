import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Skinstric',
  description: 'Your AI Skin Analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="__className_5f0add antialiased text-[#1A1B1C]">
        {children}
      </body>
    </html>
  )
}

