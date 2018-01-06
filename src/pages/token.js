import React from 'react'
import TextField from 'material-ui/TextField'

import { connectTo } from '../utils/generic'
import * as actions from '../actions/token'

export default connectTo(() => ({}), actions, ({ onKeyInputChange }) => (
  <div className="token page">
    <h1>Uber cost optimizer</h1>
    <TextField
      onChange={(_, value) => onKeyInputChange(value)}
      hintText="Uber API Key"
    />
  </div>
))
