'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateFrom() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleSubmit = () => {
    router.push(`/series/${name}`)
  }

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="max-w-lg m-auto pt-48">
      <label className="text-3xl">Search for a series by name:</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full mt-2.5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comic series..."
          required
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={name}
        />
        <button
          className="text-gray-800 absolute end-2.5 bottom-2.5 bg-white hover:bg-gray-100 border-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  )
}
