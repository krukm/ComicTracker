/**
 * Function to move date field in parethesis to beginning of the passed string.
 */
export const dateFirst = (string: string): string => {
  return string
    .split(/(?=\()/g)
    .sort()
    .join(' - ')
}

/**
 * Function to format name strings from api.
 */
export const formattedName = (string: string): string => {
  const newString = string.replace(/[^a-zA-Z ]/g, ' ')
  return newString
    .split(/(\d+|[A-Z][a-z]*)/)
    .filter((v) => v !== '')
    .join(' ')
}

/**
 * Function to get id for pagination.
 */
export const paginationId = (string: string): string => {
  const newString = string.substring(0, string.indexOf('page'))
  return newString ? newString : ''
}

/**
 * Function to extract the next page number from a paginated url.
 */
export const paginationPageNumber = (string: string): number => {
  const nextPageNumber = Number(string.split('?page=').pop())
  return nextPageNumber ? nextPageNumber : 1
}
