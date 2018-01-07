import { createAction } from 'redux-act'

export const setStartLocation = createAction()
export const setEndLocation = createAction()

export const to = createAction()

export const onKeyInputChange = createAction()
export const setKeyInputErrorText = createAction()

export const apiKeyValidated = createAction()
export const onUpdateApiKeyClick = createAction()

export const onMapUpdate = createAction('onMapUpdate')
export const onWindowChange = createAction('onWindowChange')
