import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'
import middleware from './middleware'

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
