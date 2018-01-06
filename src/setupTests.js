import fetch from 'jest-fetch-mock'
import extendArray from './utils/array-extensions'
// copy-pasted from
// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
// needed for running Jest unittests (nodeJS doesn't have localStorage)
class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key]
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()
global.fetch = fetch
global.window = {}
