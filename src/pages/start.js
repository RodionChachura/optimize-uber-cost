import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { connectTo } from '../utils/generic'
import * as actions from '../actions'

export default connectTo(
  state => state,
  actions,
  ({
    onKeyInputChange,
    setStartLocation,
    setEndLocation,
    startLocation,
    endLocation,
    keyInputErrorText,
    apiKey,
    onUpdateApiKeyClick
  }) => {
    // if (!startLocation) {
    //   navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => setStartLocation({ latitude, longitude }))
    // }

    return (
      <div className="start page">
        <h1>Uber cost optimizer</h1>
        {apiKey ? (
          <RaisedButton primary onClick={onUpdateApiKeyClick}>
            Update API key
          </RaisedButton>
        ) : (
          <TextField
            onChange={(_, value) => onKeyInputChange(value)}
            hintText="Uber API Key"
            errorText={keyInputErrorText}
          />
        )}
      </div>
    )
  }
)
