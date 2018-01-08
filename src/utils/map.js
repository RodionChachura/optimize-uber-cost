import { EARTH_MEAN_RADIUS } from '../constants/map'

export const addVectorToPointOnMap = ({ latitude, longitude }, { x, y }) => ({
  latitude:
    latitude +
    x / EARTH_MEAN_RADIUS * 180 / Math.PI / Math.cos(longitude * Math.PI / 180),
  longitude: longitude + y / EARTH_MEAN_RADIUS * 180 / Math.PI
})
