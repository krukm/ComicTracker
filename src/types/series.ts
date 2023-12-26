export interface Series {
    id: string,
    series: string,
    yearBegan: number,
    issueCount: number,
    modified: string
}

export interface SeriesDataWrapper {
    results: Series[]
}