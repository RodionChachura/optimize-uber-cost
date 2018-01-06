import React from 'react'

import { connectTo } from '../utils/generic'
import * as actions from '../actions/map'

export default connectTo(() => ({}), actions, ({ onKeyInputChange }) => (
  <div className="map page">
    <h1>Map</h1>
  </div>
))
