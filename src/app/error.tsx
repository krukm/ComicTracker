'use client'

import Button from '@/components/Button/Button'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex m-28">
      <div className="p-4 text-red-700">Error: {error.message}</div>
      <Button
        className="text-blue-900 bg-white hover:bg-yellow-600 border-gray-400 focus:ring-4 focus:outline-yellow-700 focus:ring-blue-900 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  )
}
