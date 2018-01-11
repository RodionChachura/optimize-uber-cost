import { createAction } from 'redux-act'

export const setStartLocation = createAction()
export const setEndLocation = createAction()

export const to = createAction()

export const onKeyInputChange = createAction()
export const setKeyInputErrorText = createAction()

export const apiKeyValidated = createAction()
export const onUpdateApiKeyClick = createAction()

export const onMapUpdate = createAction()
export const onWindowChange = createAction()

export const searchStartLocation = createAction()
export const searchEndLocation = createAction()

export const useAsStartLocation = createAction()
export const useAsEndLocation = createAction()

export const lookForCost = createAction()
export const setRideError = createAction()
export const rideValidated = createAction()

export const onWaitingSliderChange = createAction()

export const newEstimationReceived = createAction()
