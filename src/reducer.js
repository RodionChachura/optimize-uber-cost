import { createReducer } from 'redux-act'
import * as a from './actions'
import { MAP_OPTIONS } from './constants/map'

export default createReducer(
  {
    [a.to]: (state, page) => ({ ...state, page }),
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
    [a.setStartLocation]: (state, startLocation) => ({
      ...state,
      startLocation
    }),
    [a.useAsStartLocation]: state => ({
      ...state,
      startLocation: { latitude: state.latitude, longitude: state.longitude },
      rideErrorText: ''
    }),
    [a.useAsEndLocation]: state => {
      const endLocation = {
        latitude: state.latitude,
        longitude: state.longitude
      }
      localStorage.setItem('endLocation', JSON.stringify(endLocation))
      return {
        ...state,
        endLocation,
        rideErrorText: ''
      }
    },
    [a.searchStartLocation]: state => ({
      ...state,
      startLocation: undefined,
      startLocationGeoSearch: false
    }),
    [a.searchEndLocation]: state => ({
      ...state,
      endLocation: undefined
    }),
    [a.rideValidated]: (state, data) => {
      const { fare: { currency_code, value } } = data

      return {
        ...state,
        rideErrorText: '',
        currency: currency_code,
        prices: [value],
        page: 'Map'
      }
    },
    [a.setRideError]: (state, rideErrorText) => ({
      ...state,
      rideErrorText
    }),
    [a.onWaitingSliderChange]: (state, waitingTime) => {
      localStorage.setItem('waitingTime', waitingTime)
      return { ...state, waitingTime }
    },
    [a.newEstimationReceived]: (state, data) => {
      const { fare: { value } } = data
      console.log(value)
      return {
        ...state,
        prices: [...state.prices, value]
      }
    }
  },
  {
    page: 'Start',
    keyInputErrorText: '',
    rideErrorText: '',
    startLocation: undefined,
    endLocation:
      localStorage.getItem('endLocation') &&
      JSON.parse(localStorage.getItem('endLocation')),

    apiKey: localStorage.getItem('apiKey'),
    waitingTime: parseInt(localStorage.getItem('waitingTime'), 10) || 60,
    startLocationGeoSearch: true,

    height: window.innerHeight,
    width: window.innerWidth * 0.7,
    zoom: MAP_OPTIONS.zoom,
    latitude: MAP_OPTIONS.latitude,
    longitude: MAP_OPTIONS.longitude,
    currency: '',
    prices: []
  }
)
