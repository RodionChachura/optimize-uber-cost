import React from 'react'
import { Provider } from 'react-redux'

import './utils/array-extensions'

import store from './store'
import saga from './sagas/'
import Root from './layouts/main'
import { sagaMiddleware } from './middleware'

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App

sagaMiddleware.run(saga)
