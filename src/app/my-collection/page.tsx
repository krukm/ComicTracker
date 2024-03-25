'use client'

import { CollectionItem } from '../../../types/collection'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loading from '../loading'
import FilterBar from '../../components/Textbox/Filter'
import { toYearOnly } from '../../../utils/dates'

export default function MyCollection() {
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

  const filterSeries = (filterString: string) => {
    Object.keys(orderedCollection).map((key) => {
      if (key.toLowerCase().includes(filterString)) {
        setFilteredArray({
          ...filteredArray,
          [key]: Object.values(orderedCollection[key]),
        })
      }
    })
  }

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
    if (filtered) {
      filterSeries(filterString)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered])

  const isFiltered = (filtered: boolean) => {
    setFiltered(filtered)
  }

  const getCollectionData = async () => {
    await fetch('api/get-collection', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setCollection(data)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="ml-4">
      <FilterBar
        filtered={isFiltered}
        filterString={setFilterString}
        collectionSize={collection.length}
        seriesSize={seriesSize}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="pt-24">
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
                        (+a.issue_number || 0) - (+b.issue_number || 0) ||
                        Number(toYearOnly(a.cover_date)) -
                          Number(toYearOnly(b.cover_date))
                      )
                    })
                    .map((issue) => {
                      return (
                        <div
                          className="flex-auto px-5 py-1"
                          key={issue.issue_id}
                        >
                          <div className="flex items-baseline">
                            <div className="basis-[20%] md:basis-[6%]">
                              issue #{issue.issue_number}
                            </div>
                            <div className="basis-[15%] md:basis-[3%]">
                              ({toYearOnly(issue.cover_date)})
                            </div>
                            <div className="basis-[30%] md:basis-[8%]"></div>
                            <Link
                              href={`/api/delete-collection?issue_id=${issue.issue_id}`}
                              className="px-1 rounded-md text-red-800 bg-slate-300 border-2 border-slate-500"
                              onClick={() => location.reload()}
                            >
                              Remove
                            </Link>
                          </div>
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
