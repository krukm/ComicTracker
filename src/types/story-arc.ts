export interface StoryArc {
  id: number
  name: string
  desc?: string
  image?: string
  cv_id?: number
  resource_url: string
  modified: string
}

export interface StoryArcDataWrapper {
  results: StoryArc[]
}
