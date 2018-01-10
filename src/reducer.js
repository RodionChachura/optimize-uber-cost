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
    [a.setEndLocation]: (state, endLocation) => ({ ...state, endLocation }),
    [a.setKeyInputErrorText]: (state, keyInputErrorText) => ({
      ...state,
      keyInputErrorText
    }),
    [a.apiKeyValidated]: (state, apiKey) => {
      localStorage.setItem('apiKey', apiKey)
      return { ...state, apiKey, keyInputErrorText: '' }
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
    }),
    [a.useAsStartLocation]: state => ({
      ...state,
      startLocation: { latitude: state.latitude, longitude: state.longitude },
      rideErrorText: ''
    }),
    [a.useAsEndLocation]: state => ({
      ...state,
      endLocation: { latitude: state.latitude, longitude: state.longitude },
      rideErrorText: ''
    }),
    [a.searchStartLocation]: state => ({
      ...state,
      startLocation: undefined,
      startLocationGeoSearch: false
    }),
    [a.searchEndLocation]: state => ({
      ...state,
      endLocation: undefined
    }),
    [a.rideValidated]: state => {
      return {
        ...state,
        rideErrorText: ''
      }
    },
    [a.setRideError]: (state, rideErrorText) => ({
      ...state,
      rideErrorText
    })
  },
  {
    page: 'Start',
    keyInputErrorText: '',
    rideErrorText: '',
    startLocation: undefined,
    endLocation: undefined,

    apiKey: localStorage.getItem('apiKey'),
    startLocationGeoSearch: true,

    height: window.innerHeight,
    width: window.innerWidth * 0.7,
    zoom: MAP_OPTIONS.zoom,
    latitude: MAP_OPTIONS.latitude,
    longitude: MAP_OPTIONS.longitude
  }
)
