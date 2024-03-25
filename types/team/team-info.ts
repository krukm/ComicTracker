import { ModItem } from '../sub-types/modified-item'

export interface TeamInfo {
  id: number
  name: string
  desc?: string
  image?: string
  creators: ModItem[]
  cv_id?: number
  resource_url: string
  modified: string
}
