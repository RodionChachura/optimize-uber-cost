import { call, takeLatest, put } from 'redux-saga/effects'

import {
  onKeyInputChange,
  setKeyInputErrorText,
  apiKeyValidated
} from './actions'
import { getEstimation } from './api/uber'

const TESTING_ESTIMATION_DATA = [53.9147807, 27.5481173, 53.8893322, 27.4151778]

export function* onKeyInputChangeSaga({ payload }) {
  try {
    yield call(getEstimation, payload, ...TESTING_ESTIMATION_DATA)
    yield put(apiKeyValidated(payload))
  } catch (_) {
    yield put(setKeyInputErrorText('Invalid API key'))
  }
}

export default function* saga() {
  const relations = [[onKeyInputChange, onKeyInputChangeSaga]]

  for (const [action, actionSaga] of relations) {
    yield takeLatest(action.getType(), actionSaga)
  }
}
