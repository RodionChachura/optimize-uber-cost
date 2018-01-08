export const MAP_OPTIONS = {
  latitude: 53.9145899,
  longitude: 27.5594437,
  zoom: 18,
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  mapStyle: 'mapbox://styles/mapbox/streets-v9'
}

export const MOCK_LOCATIONS = [53.9147807, 27.5481173, 53.8893322, 27.4151778]

export const MOCK_START_LOCATION = {
  latitude: 53.9147807,
  longitude: 27.5481173
}

export const MOCK_END_LOCATION = {
  latitude: 53.8893322,
  longitude: 27.4151778
}

export const EARTH_MEAN_RADIUS = 6378137

export const START_LOCATION_OFFSET = { x: 40, y: 40 }
