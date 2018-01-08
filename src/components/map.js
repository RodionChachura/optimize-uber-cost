import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import {
  MAP_OPTIONS,
  MOCK_START_LOCATION,
  START_LOCATION_OFFSET
} from '../constants/map'
import { addVectorToPointOnMap } from '../utils/map'

export default class Map extends React.Component {
  render() {
    const {
      width,
      height,
      zoom,
      latitude,
      longitude,

      onMapUpdate,

      startLocation,
      endLocation,

      setStartLocation,
      setEndLocation
    } = this.props
    const mapProps = {
      ...MAP_OPTIONS,
      width,
      height,
      zoom,
      latitude,
      longitude,
      onViewportChange: onMapUpdate
    }
    const startCoordinates = startLocation || MOCK_START_LOCATION
    const endCoordinates =
      endLocation ||
      addVectorToPointOnMap(startCoordinates, START_LOCATION_OFFSET)
    return (
      <ReactMapGL className="map-component" {...mapProps} ref="reactMap">
        <Marker {...startCoordinates} offsetLeft={-20} offsetTop={-10}>
          <i className="fa fa-map-marker fa-4x fa-inverse" aria-hidden="true" />
        </Marker>
        <Marker {...endCoordinates} offsetLeft={-20} offsetTop={-10}>
          <i className="fa fa-map-marker fa-4x" aria-hidden="true" />
        </Marker>
      </ReactMapGL>
    )
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowSizeChanged)
    this.map = this.refs.reactMap.getMap()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowSizeChanged)
  }

  windowSizeChanged = () => {
    this.props.onWindowChange({
      width: window.innerWidth * 0.7,
      height: window.innerHeight
    })
  }
}
