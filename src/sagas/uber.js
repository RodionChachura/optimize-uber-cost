import { call } from 'redux-saga/effects'
import { getEstimation } from '../api.js/uber'

const TESTING_ESTIMATION_DATA = [53.9147807, 27.5481173, 53.8893322, 27.4151778]

export function* onKeyInputChangeSaga({ payload }) {
  try {
    yield call(getEstimation, payload, ...TESTING_ESTIMATION_DATA)
    localStorage.setItem('apiKey', payload)
  } catch (_) {
    console.log(_)
  }
}
