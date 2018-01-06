import { takeLatest } from 'redux-saga/effects'

import { onKeyInputChange } from '../actions/token'
import { onKeyInputChangeSaga } from './uber'

export default function* saga() {
  const relations = [
    [onKeyInputChange, onKeyInputChangeSaga]
  ]

  for (const [action, actionSaga] of relations) {
    yield takeLatest(action.getType(), actionSaga)
  }
}
