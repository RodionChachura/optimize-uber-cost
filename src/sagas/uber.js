import { call } from 'redux-saga/effects'
import { getEstimation } from '../api.js/uber';

const TESTING_ESTIMATION_DATA = [53.9147807, 27.5481173, 53.8893322, 27.4151778]


export function* onKeyInputChangeSaga({ payload }) {
  
  try {
    const data =  yield  call(getEstimation, payload, ...TESTING_ESTIMATION_DATA)
    console.log(data)
  } catch(_) {
    console.log(_)
  }
}