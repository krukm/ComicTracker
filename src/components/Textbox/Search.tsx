'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Button/Button'
import { useLocalStorage } from '../../../utils/hooks/use-local-storage'
import Link from 'next/link'

export default function SearchBar() {
  const router = useRouter()
  const [term, setTerm] = useState('')
  const [searchType, setSearchType] = useState('character')
  const [history, setHistory] = useLocalStorage('serachHistory', [])

  const handleSubmit = () => {
    let route = ''
    savedSearches()

    searchType === 'character'
      ? (route = `/character-result/${term}`)
      : searchType === 'series'
        ? (route = `/series/${term}`)
        : searchType === 'story arc'
          ? (route = `/arc-list/${term}`)
          : (route = `/team-list/${term}`)

    router.push(route)
    router.refresh()
  }

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const savedSearches = () => {
    const searchHistoryArray = JSON.parse(
      localStorage.getItem('searchHistory') || '[]',
    )
    searchHistoryArray.push(`${searchType}::${term}`)
    setHistory([...history, searchHistoryArray])
  }

  return (
    <div className="px-5 md:px-0 max-w-lg m-auto pt-10 md:pt-48">
      <label className="text-1xl md:text-3xl">
        {`Search for a ${searchType}:`}
      </label>
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
          className="block w-full mt-2.5 p-2 ps-10 outline-none text-lg md:text-2xl text-gray-900 border border-gray-300 rounded-lg bg-white shadow-lg shadow-slate-500"
          placeholder={`${searchType}...`}
          required
          autoFocus
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          value={term}
        />
        <Button
          className="text-gray-900 absolute end-2.5 bottom-1.5 bg-white hover:bg-yellow-500 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-4 py-2"
          type="button"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </div>
      <div>
        <div className="flex p-2">
          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 accent-blue-900 hover:cursor-pointer"
              type="radio"
              id="character"
              value="character"
              checked={searchType === 'character'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label
              className="mt-px inline-block pl-[0.15rem]"
              htmlFor="character"
            >
              character
            </label>
          </div>
          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 accent-blue-900 hover:cursor-pointer"
              type="radio"
              id="series"
              value="series"
              checked={searchType === 'series'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label className="mt-px inline-block pl-[0.15rem]" htmlFor="series">
              series
            </label>
          </div>
          <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 accent-blue-900 hover:cursor-pointer"
              type="radio"
              id="arc"
              value="story arc"
              checked={searchType === 'story arc'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label className="mt-px inline-block pl-[0.15rem]" htmlFor="arc">
              story arc
            </label>
          </div>
          <div className="mb-[0.125rem] inline-block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 accent-blue-900 hover:cursor-pointer"
              type="radio"
              id="team"
              value="team"
              checked={searchType === 'team'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label className="mt-px inline-block pl-[0.15rem]" htmlFor="team">
              team
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-end">
          <div className="page-subheading">Recent searches:</div>
          <Button
            className="list-item"
            onClick={() => {
              localStorage.clear()
              location.reload()
            }}
          >
            Clear
          </Button>
        </div>
        <div className="mt-3 pt-3 border-solid border-t-2">
          {history.map((searchItem: string, index: number) => {
            const type = searchItem.toString().split('::')[0]
            const term = searchItem.toString().split('::')[1]
            let redirect = ''

            type === 'series'
              ? (redirect = `/series/${term}`)
              : type === 'character'
                ? (redirect = `/character-result/${term}`)
                : type === 'story arc'
                  ? (redirect = `/arc-list/${term}`)
                  : type === 'team'
                    ? (redirect = `/team-list/${term}`)
                    : ''

            return (
              <div key={index} className="list-item mb-1">
                <Link href={redirect}>
                  {term} -- from {type}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
