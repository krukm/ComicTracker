'use client'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex m-28 justify-between">
      <div className="p-4">Error: {error.message}</div>
      <button
        className="text-gray-800 absolute end-2.5 bottom-2.5 bg-white hover:bg-gray-100 border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  )
}
