import { createReducer } from 'redux-act'
import * as a from './actions'

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
    }
  },
  {
    page: 'Start',
    keyInputErrorText: '',
    startLocation: undefined,
    endLocation: undefined,
    apiKey: localStorage.getItem('apiKey')
  }
)
