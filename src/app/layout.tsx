import type { Metadata } from 'next'
import { robotoMono, rubikGlitch } from './../utils/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marvel Comic Tracker',
  description: 'Log your collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <header className={`${rubikGlitch.className} bg-yellow-600`}>
          <div className="pl-3 py-1.5 text-4xl text-blue-900">
            My Comic Collection
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
