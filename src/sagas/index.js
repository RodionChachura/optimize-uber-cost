import { takeLatest } from 'redux-saga/effects'

export default function* saga() {
  const relations = [
  ]

  for (const [action, actionSaga] of relations) {
    yield takeLatest(action.getType(), actionSaga)
  }
}
