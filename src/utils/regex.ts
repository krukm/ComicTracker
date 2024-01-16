export const regex = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g
export const capitalizeRegex = /(^\w{1})|(\s+\w{1})/g

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
  return string
    .replace(regex, ' ')
    .replace(capitalizeRegex, (letter) => letter.toUpperCase())
}
