class RequestError {
  constructor(status, error) {
    this.status = status
    this.error = error
  }
}

export const request = (url, options) => {
  return fetch(url, options).then(response => {
    const { status } = response
    if (status === 204) return {}
    const json = response.json()

    if (status >= 200 && status < 300) return json
    else {
      return json.then(error => {
        throw new RequestError(status, error)
      })
    }
  })
}
