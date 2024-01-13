export interface ListTeam {
  id: number
  name: string
  modified: string
}

export interface ListTeamDataWrapper {
  results: ListTeam[]
}
