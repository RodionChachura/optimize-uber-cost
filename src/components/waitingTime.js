import React from 'react'
import Slider from 'material-ui/Slider'
import { MAX_REQUEST_IN_HOUR } from '../constants/uber'

export default ({ waitingTime, onWaitingSliderChange }) => (
  <div className="classic-margin">
    <p>Waiting time: {waitingTime} min</p>
    <Slider
      style={{ width: '100%' }}
      sliderStyle={{ marginTop: 12, marginBottom: 12 }}
      defaultValue={waitingTime}
      value={waitingTime}
      onChange={(_, v) => onWaitingSliderChange(v)}
      min={5}
      max={60}
      step={1}
    />
    <p>
      request every {Math.round(60 / (MAX_REQUEST_IN_HOUR / waitingTime))}{' '}
      seconds
    </p>
  </div>
)
