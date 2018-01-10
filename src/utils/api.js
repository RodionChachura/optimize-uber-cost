export const request = (url, options) => {
  return fetch(url, options).then(response => {
    const { status } = response
    if (status === 204) return {}
    const json = response.json()
    console.log(status)
    if (status >= 200 && status < 300) return json
    else if (status === 401) throw new Error(401)
    else {
      return json.then(err => {
        throw err
      })
    }
  })
}
