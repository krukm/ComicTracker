'use client'

import { useEffect, useState } from 'react'

interface Props {
  /**
   * The current total number of issues.
   */
  collectionSize: number
  /**
   * The current total number of series.
   */
  seriesSize: number
  /**
   * Function to pass filter state.
   * @param filterApplied - The current state of filtering.
   * @returns void
   */
  filtered: (filterApplied: boolean) => void

  /**
   * The string to filter an array.
   * @param term - The current filter value.
   * @returns void
   */
  filterString: (term: string) => void
}

export default function FilterBar(props: Props) {
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    props.filtered(filter.length > 2)
    props.filterString(filter)
  }, [filter])

  return (
    <div className="px-5 pt-2 md:px-0 max-w-lg m-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full mt-2.5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Filter ${props.collectionSize} comics collected...from ${props.seriesSize} series!`}
          required
          autoFocus
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
    </div>
  )
}
