import type { Metadata } from 'next'
import { scriptFont } from './../utils/fonts'
import NavBar from '@/components/Navbar/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Comic Tracker',
  description: 'Log your collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={scriptFont.className}>
        <NavBar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
