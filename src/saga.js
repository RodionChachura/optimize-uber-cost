import { call, takeLatest, put, select } from 'redux-saga/effects'

import {
  onKeyInputChange,
  setKeyInputErrorText,
  apiKeyValidated,
  lookForCost,
  rideValidated
} from './actions'
import { getEstimation } from './api/uber'
import { MOCK_LOCATIONS } from './constants/map'

export function* onKeyInputChangeSaga({ payload }) {
  try {
    yield call(getEstimation, payload, ...MOCK_LOCATIONS)
    yield put(apiKeyValidated(payload))
  } catch (_) {
    yield put(setKeyInputErrorText('Invalid API key'))
  }
}

export function* lookForCostSaga() {
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
    console.log(data)
    yield put(rideValidated())
  } catch (_) {
    yield put(setKeyInputErrorText('Invalid Ride'))
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
