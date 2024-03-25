import { ModItem } from '../sub-types/modified-item'

export interface CharacterInfo {
  id: number
  name: string
  alias?: string[]
  desc?: string
  image?: string
  creators: ModItem[]
  teams: ModItem[]
  cv_id?: number
  resource_url: string
  modified: string
}
