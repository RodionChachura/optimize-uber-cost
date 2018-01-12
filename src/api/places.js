const PLACES_API =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

export const getPlace = (latitude, longitude) => {
  PLACES_API, latitude, longitude
}
