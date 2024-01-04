import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 h-1/2">
        <div className="text-center text-4xl">404</div>
        <div className="text-center pt-4">
          Sorry, could not find that page...
        </div>
        <div className="text-center text-blue-900 pt-8">
          <Link href={'/'}>Home</Link>
        </div>
      </div>
    </div>
  )
}
