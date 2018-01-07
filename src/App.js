import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import dotenv from 'dotenv'
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

dotenv.config()
sagaMiddleware.run(saga)
