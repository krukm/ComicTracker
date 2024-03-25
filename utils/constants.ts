const BASE_64_CREDENTIALS = btoa(
  `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
)

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${BASE_64_CREDENTIALS}`,
}
