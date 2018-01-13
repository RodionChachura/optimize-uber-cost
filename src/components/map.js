import _ from 'lodash'
import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

import { MAP_OPTIONS } from '../constants/map'

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
      endLocation
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
    const startCoordinates = startLocation || { latitude, longitude }
    const endCoordinates = endLocation || { latitude, longitude }

    return (
      <ReactMapGL className="map-component" {...mapProps} ref="reactMap">
        <Marker {...startCoordinates}>
          <i className="fa fa-map-marker fa-4x fa-inverse" aria-hidden="true" />
        </Marker>
        {startLocation ? (
          <Marker {...endCoordinates}>
            <i className="fa fa-map-marker fa-4x" aria-hidden="true" />
          </Marker>
        ) : null}
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
  componentDidUpdate() {
    const { onMapUpdate, startLocation, endLocation } = this.props

    if (startLocation && endLocation && this.map) {
      const locations = [startLocation, endLocation]
      const sortedByLat = _.sortBy(locations, 'latitude')
      const sortedByLong = _.sortBy(locations, 'longitude')

      const maxLat = sortedByLat[sortedByLat.length - 1].latitude
      const minLat = sortedByLat[0].latitude
      const maxLong = sortedByLong[sortedByLong.length - 1].longitude
      const minLong = sortedByLong[0].longitude
      this.map.fitBounds([[minLong, minLat], [maxLong, maxLat]], {
        padding: 80
      })
      this.map.on('moveend', () =>
        onMapUpdate({
          zoom: this.map.getZoom(),
          longitude: this.map.getCenter().lng,
          latitude: this.map.getCenter().lat
        })
      )
    }
  }

  windowSizeChanged = () => {
    this.props.onWindowChange({
      width: window.innerWidth * 0.7,
      height: window.innerHeight
    })
  }
}
