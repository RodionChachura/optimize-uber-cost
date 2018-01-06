import { createReducer } from 'redux-act'
import { to } from '../actions/navigation'

export default createReducer(
  {
    [to]: (state, page) => ({ ...state, page })
  },
  {
    page: localStorage.getItem('apiKey') ? 'Map' : 'Token'
  }
)
