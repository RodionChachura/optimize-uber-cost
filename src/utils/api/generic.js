/* global fetch:true */
import 'whatwg-fetch'


export const headers = () => ({
  'Content-Type': 'application/json'
})

export const makePostOptions = data => ({
  method: 'POST',
  mode: 'cors',
  headers: headers(),
  body: JSON.stringify(data)
})

export const getOptions = () => ({
  method: 'GET',
  mode: 'cors',
  headers: headers()
})

export const deleteOptions = () => ({
  method: 'DELETE',
  mode: 'cors',
  headers: headers()
})

const request = (url, options) => {
  return fetch(url, options).then(response => {
    const { status } = response
    if (status === 204) return {}
    const json = response.json()
    if (status >= 200 && status < 300) return json
    else if (status === 401) throw new Error(401)
    else {
      return json.then(err => {
        throw err
      })
    }
  })
}

export const mockUrl = name => `${MOCK_BACKEND}${name}.json`

export const get = url => request(url, getOptions())
export const post = (url, data) => request(url, makePostOptions(data))
export const del = (url, id) => request(url + id, deleteOptions())

