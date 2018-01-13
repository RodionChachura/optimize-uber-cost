import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Map from '../components/map'
import WaitingTime from '../components/waitingTime'

import { connectTo } from '../utils/generic'
import * as actions from '../actions'

export default connectTo(
  state => state,
  actions,
  ({
    onKeyInputChange,
    setStartLocation,
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
    onWindowChange,

    searchStartLocation,
    searchEndLocation,

    useAsStartLocation,
    useAsEndLocation,
    startLocationGeoSearch,
    lookForCost,
    rideErrorText,
    waitingTime,
    onWaitingSliderChange
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
      endLocation
    }

    if (!startLocation && startLocationGeoSearch) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setStartLocation({ latitude, longitude })
      )
    }
    return (
      <div className="start page">
        <div className="one-half">
          {/* <h1>Uber cost optimizer</h1> */}
          {apiKey ? (
            <RaisedButton
              primary
              onClick={onUpdateApiKeyClick}
              label="Update API key"
              className="margin-button"
            />
          ) : (
            <TextField
              onChange={(_, value) => onKeyInputChange(value)}
              hintText="Uber API Key"
              errorText={keyInputErrorText}
              className="margin-input"
            />
          )}
          {startLocation ? (
            <RaisedButton
              secondary
              onClick={searchStartLocation}
              label="Change Start Location"
              className="margin-button"
            />
          ) : (
            <RaisedButton
              primary
              onClick={useAsStartLocation}
              label="Use As Start Location"
              className="margin-button"
            />
          )}
          {startLocation && endLocation ? (
            <RaisedButton
              secondary
              onClick={searchEndLocation}
              label="Change End Location"
              className="margin-button"
            />
          ) : startLocation ? (
            <RaisedButton
              primary
              onClick={useAsEndLocation}
              label="Use As End Location"
              className="margin-button"
            />
          ) : null}
          {startLocation && endLocation ? (
            <WaitingTime {...{ waitingTime, onWaitingSliderChange }} />
          ) : null}
          {startLocation && endLocation && apiKey && !rideErrorText ? (
            <RaisedButton
              onClick={lookForCost}
              label="Look for cost"
              className="margin-button"
            />
          ) : startLocation && endLocation && apiKey && rideErrorText ? (
            <p className="error">{rideErrorText}</p>
          ) : null}
        </div>
        <Map {...mapProps} />
      </div>
    )
  }
)
