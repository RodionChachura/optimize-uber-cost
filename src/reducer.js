import { createReducer } from 'redux-act'
import * as a from './actions'
import { MAP_OPTIONS } from './constants/map'

export default createReducer(
  {
    [a.to]: (state, page) => ({ ...state, page }),
    [a.setStartLocation]: (state, startLocation) => ({
      ...state,
      startLocation
    }),
    [a.setStartLocation]: (state, endLocation) => ({ ...state, endLocation }),
    [a.setKeyInputErrorText]: (state, keyInputErrorText) => ({
      ...state,
      keyInputErrorText
    }),
    [a.apiKeyValidated]: (state, apiKey) => {
      localStorage.setItem('apiKey', apiKey)
      return { ...state, apiKey }
    },
    [a.onUpdateApiKeyClick]: state => {
      localStorage.removeItem('apiKey')
      return { ...state, apiKey: undefined }
    },
    [a.onWindowChange]: (state, windowSize) => ({ ...state, ...windowSize }),
    [a.onMapUpdate]: (state, { longitude, latitude, zoom }) => ({
      ...state,
      longitude,
      latitude,
      zoom
    })
  },
  {
    page: 'Start',
    keyInputErrorText: '',
    startLocation: undefined,
    endLocation: undefined,
    apiKey: localStorage.getItem('apiKey'),

    height: window.innerHeight,
    width: window.innerWidth,
    zoom: MAP_OPTIONS.zoom,
    latitude: MAP_OPTIONS.latitude,
    longitude: MAP_OPTIONS.longitude
  }
)
