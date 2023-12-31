'use client'

import { CollectionItem } from '@/types/collection'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import FilterBar from '@/components/Textbox/Filter'

export default function Page() {
  const [collection, setCollection] = useState<CollectionItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filtered, setFiltered] = useState(false)
  const [filterString, setFilterString] = useState<string>('')
  const [seriesSize, setSeriesSize] = useState<number>(0)
  const [orderedCollection, setOrderedCollection] = useState<{
    [key: string]: CollectionItem[]
  }>({})
  const [filteredArray, setFilteredArray] = useState<{
    [key: string]: CollectionItem[]
  }>({})


  useEffect(() => {
    getCollectionData()
  }, [])

  useEffect(() => {
    const seriesGroups: { [key: string]: CollectionItem[] } = {}
    collection.forEach((issue) => {
      const { series_name } = issue
      if (!seriesGroups[series_name]) {
        seriesGroups[series_name] = []
      }
      seriesGroups[series_name].push(issue)
    })
    setSeriesSize(Object.keys(seriesGroups).length)
    setOrderedCollection(seriesGroups)
  }, [collection])

  useEffect(() => {
    if(filtered) {
        filterSeries(filterString)
    }
  }, [filtered])

  const isFiltered = (filtered: boolean) => {
    setFiltered(filtered)
  }

  const filterSeries = (filterString: string) => {
    Object.keys(orderedCollection)
            .map((key) => {
                if(key.toLowerCase().includes(filterString)) {
                    setFilteredArray({...filteredArray, [key] : Object.values(orderedCollection[key])})
                }
            })
  }

  const getCollectionData = async () => {
    await fetch('api/get-collection')
      .then((res) => res.json())
      .then((data) => {
        setCollection(data.data.rows)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="ml-4">
      <FilterBar filtered={isFiltered} filterString={setFilterString} collectionSize={collection.length} seriesSize={seriesSize} />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {Object.entries(filtered ? filteredArray : orderedCollection)
            .sort()
            .map(([key, value], index) => {
              return (
                <div key={index}>
                  <Link
                    href={`/series/${key}`}
                    className="flex flex-wrap items-start pl-2 pt-4 text-3xl"
                  >
                    {key}
                  </Link>
                  {value
                    .sort((a, b) => {
                      return (
                        (+a.issue_number || 0) - (+b.issue_number || 0) || 0
                      )
                    })
                    .map((issue) => {
                      return (
                        <div
                          className="flex-auto px-5 py-1"
                          key={issue.issue_id}
                        >
                          <Link href={`/issue/${issue.issue_id}`}>
                            {issue.issue_name
                              .split(/(?=\#)/g)
                              .sort()
                              .join('\t')}
                          </Link>
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
