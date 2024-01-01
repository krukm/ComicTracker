'use client'

import { Collection } from '@/types/collection'
import { useEffect, useState } from 'react'

export default function Page() {
  const [collection, setCollection] = useState<Collection>()
  const [loading, setLoading] = useState(true)

  const getCollectionData = async () => {
    await fetch('api/get-collection')
      .then((res) => res.json())
      .then((data) => {
        setCollection(data.data.rows)
        console.log(data.data.rows)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getCollectionData()
  }, [])

  return (
    <div>
      {loading ? (
        <div>Getting collection data from the database...</div>
      ) : collection && collection.collection.length > 0 ? (
        <div>
          {collection.collection.map((issue) => {
            return (
              <div key={issue.issue_id}>
                <div>{issue.series_name}</div>
                <div>
                  <label>{issue.issue_name}</label>
                  <input
                    type="checkbox"
                    className="appearance-none checked:text-red-600 checked:border-transparent"
                  />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}
