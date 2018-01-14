class RequestError {
  constructor(status, error) {
    this.status = status
    this.error = error
  }
}

export const request = (url, options) => {
  return fetch(url, options)
    .then(response => {
      console.log(response)
      const { status } = response
      const json = response.json()
      if (status >= 200 && status < 300) return json
      else {
        return json.then(error => {
          throw new RequestError(status, error)
        })
      }
    })
    .catch(err => {
      throw new RequestError(429, { message: 'Too many requests' })
    })
}

export const calcSecondsLeft = requestsHistory =>
  requestsHistory.length !== 0
    ? Math.round((requestsHistory[0] + 60 * 60 * 1000 - Date.now()) / 1000)
    : 0
