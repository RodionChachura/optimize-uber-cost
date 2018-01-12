import { call, takeLatest, put, select } from 'redux-saga/effects'

import {
  onKeyInputChange,
  setKeyInputErrorText,
  apiKeyValidated,
  lookForCost,
  rideValidated,
  setRideError,
  newEstimationReceived
} from './actions'
import { getEstimation } from './api/uber'
import { MOCK_LOCATIONS } from './constants/map'
import { MAX_REQUEST_IN_HOUR } from './constants/uber'

export function* onKeyInputChangeSaga({ payload }) {
  try {
    yield call(getEstimation, payload, ...MOCK_LOCATIONS)
    yield put(apiKeyValidated(payload))
  } catch (_) {
    yield put(setKeyInputErrorText('Invalid API key'))
  }
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* getCost() {
  const { startLocation, endLocation, apiKey } = yield select()
  return yield call(
    getEstimation,
    apiKey,
    startLocation.latitude,
    startLocation.longitude,
    endLocation.latitude,
    endLocation.longitude
  )
}

export function* lookForCostSaga() {
  try {
    const data = yield* getCost()
    yield put(rideValidated(data))

    function* polling() {
      const { waitingTime, page } = yield select()
      if (page !== 'Chart') return

      const requestFrequency =
        Math.round(60 / (MAX_REQUEST_IN_HOUR / waitingTime)) * 1000
      const newData = yield* getCost()
      yield put(newEstimationReceived(newData))
      yield call(delay, requestFrequency)
      yield* polling()
    }
    yield* polling()
  } catch ({ error }) {
    yield put(setRideError(error))
  }
}

export default function* saga() {
  const relations = [
    [onKeyInputChange, onKeyInputChangeSaga],
    [lookForCost, lookForCostSaga]
  ]

  for (const [action, actionSaga] of relations) {
    yield takeLatest(action.getType(), actionSaga)
  }
}
