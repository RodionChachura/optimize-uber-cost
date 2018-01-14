import { createReducer } from 'redux-act'
import * as a from './actions'
import { MAP_OPTIONS } from './constants/map'
import { MAX_REQUEST_IN_HOUR } from './constants/uber'
import { calcSecondsLeft } from './utils/api'

const requestsHistory = localStorage.getItem('requestsHistory')
  ? JSON.parse(localStorage.getItem('requestsHistory'))
  : []

const DEFAULT_STATE = {
  page: calcSecondsLeft(requestsHistory) < 1 ? 'Start' : 'Info',
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
  prices: [],
  requestsHistory,
  activeInfoTab: 'about'
}

export default createReducer(
  {
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
      latitude: state.startLocation.latitude,
      longitude: state.startLocation.longitude,
      zoom: MAP_OPTIONS.zoom,
      startLocationGeoSearch: false
    }),
    [a.searchEndLocation]: state => ({
      ...state,
      latitude: state.endLocation.latitude,
      longitude: state.endLocation.longitude,
      zoom: MAP_OPTIONS.zoom,
      endLocation: undefined
    }),
    [a.rideValidated]: (state, data) => {
      const { fare: { currency_code, value } } = data
      return {
        ...state,
        rideErrorText: '',
        currency: currency_code,
        prices: [value],
        page: 'Chart'
      }
    },
    [a.onWaitingSliderChange]: (state, waitingTime) => {
      localStorage.setItem('waitingTime', waitingTime)
      return { ...state, waitingTime }
    },
    [a.newEstimationReceived]: (state, data) => {
      const { fare: { value } } = data
      const prices = [...state.prices, value]
      if (Notification.permission === 'granted') {
        const priceBecomeBetter = Math.min(...state.prices) > value
        if (priceBecomeBetter) {
          const notification = new Notification(
            `Better price: ${value} ${state.currency}`
          )
          setTimeout(notification.close.bind(notification), 5000)
        }
      }
      return {
        ...state,
        prices
      }
    },
    [a.toStart]: state => ({
      ...state,
      page: 'Start'
    }),
    [a.uberEstimationRequestFailed]: (state, { error, status }) => {
      if (status === 401) {
        localStorage.removeItem('apiKey')
        return {
          ...state,
          page: 'Start',
          keyInputErrorText: 'Invalid API key'
        }
      } else if (status === 422) {
        return {
          ...state,
          page: 'Start',
          rideErrorText: error.message
        }
      } else if (status === 429) {
        return {
          ...state,
          page: 'Info',
          activeInfoTab: 'about'
        }
      }
    },
    [a.requestToUberMade]: state => {
      let requestsHistory = [...state.requestsHistory, Date.now()]
      if (requestsHistory.length > MAX_REQUEST_IN_HOUR) {
        requestsHistory = requestsHistory.slice(
          requestsHistory.length - MAX_REQUEST_IN_HOUR
        )
      }
      localStorage.setItem('requestsHistory', JSON.stringify(requestsHistory))
      return {
        ...state,
        requestsHistory
      }
    },
    [a.onChangeInfoTab]: (state, activeInfoTab) => ({
      ...state,
      activeInfoTab
    }),
    [a.showHowToGetKey]: state => ({
      ...state,
      page: 'Info',
      activeInfoTab: 'apiKey'
    })
  },
  DEFAULT_STATE
)
