export interface CharacterResult {
  id: number
  name: string
  modified: string
}

export interface CharacterResultDataWrapper {
  results: CharacterResult[]
}
