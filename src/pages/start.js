import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Map from '../components/map'

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
    onUpdateApiKeyClick,

    width,
    height,
    zoom,
    latitude,
    longitude,

    onMapUpdate,
    onWindowChange
  }) => {
    const mapProps = {
      width,
      height,
      zoom,
      latitude,
      longitude,

      onMapUpdate,
      onWindowChange,

      startLocation,
      endLocation,

      setStartLocation,
      setEndLocation
    }

    if (!startLocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setStartLocation({ latitude, longitude })
      )
    }
    console.log(startLocation)

    return (
      <div className="start page">
        <div className="one-half">
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
        <Map {...mapProps} />
      </div>
    )
  }
)
