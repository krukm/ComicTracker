export const toUSDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export const toYearOnly = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
  })
}
