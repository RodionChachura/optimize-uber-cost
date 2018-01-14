import { request } from '../utils/api'

const ESTIMATION_API = 'https://api.uber.com/v1.2/requests/estimate'

export const getEstimation = (apiKey, startLat, startLong, endLat, endLong) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      start_latitude: startLat,
      start_longitude: startLong,
      end_latitude: endLat,
      end_longitude: endLong
    })
  }
  return request(ESTIMATION_API, options)
}
