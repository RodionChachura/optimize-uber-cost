import { call, takeLatest, put } from 'redux-saga/effects'

import {
  onKeyInputChange,
  setKeyInputErrorText,
  apiKeyValidated
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

export default function* saga() {
  const relations = [[onKeyInputChange, onKeyInputChangeSaga]]

  for (const [action, actionSaga] of relations) {
    yield takeLatest(action.getType(), actionSaga)
  }
}
