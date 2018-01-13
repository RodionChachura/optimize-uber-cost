import { call, takeLatest, put, select } from 'redux-saga/effects'

import {
  onKeyInputChange,
  apiKeyValidated,
  lookForCost,
  newEstimationReceived,
  uberEstimationRequestFailed,
  requestToUberMade,
  rideValidated
} from './actions'
import { getEstimation } from './api/uber'
import { MOCK_LOCATIONS } from './constants/map'
import { MAX_REQUEST_IN_HOUR } from './constants/uber'

export function* onKeyInputChangeSaga({ payload }) {
  try {
    yield put(requestToUberMade())
    yield call(getEstimation, payload, ...MOCK_LOCATIONS)
    yield put(apiKeyValidated(payload))
  } catch (error) {
    yield put(uberEstimationRequestFailed(error))
  }
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* getCost(successAction) {
  try {
    const { startLocation, endLocation, apiKey } = yield select()
    const data = yield call(
      getEstimation,
      apiKey,
      startLocation.latitude,
      startLocation.longitude,
      endLocation.latitude,
      endLocation.longitude
    )
    yield put(requestToUberMade())
    yield put(successAction(data))
  } catch (error) {
    yield put(uberEstimationRequestFailed(error))
  }
}

export function* lookForCostSaga() {
  yield* getCost(rideValidated)
  function* polling() {
    const { waitingTime, page } = yield select()
    if (page !== 'Chart') return

    const requestFrequency =
      Math.round(60 / (MAX_REQUEST_IN_HOUR / waitingTime)) * 1000
    yield* getCost(newEstimationReceived)
    yield call(delay, requestFrequency)
    yield* polling()
  }
  yield* polling()
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
