export interface ArcResult {
  id: number
  name: string
  modified: string
}

export interface ArcResultDataWrapper {
  results: ArcResult[]
}
