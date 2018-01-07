import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './utils/array-extensions'

import store from './store'
import saga from './saga'
import Root from './layouts/main'
import { sagaMiddleware } from './middleware'

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>
)

export default App

sagaMiddleware.run(saga)
