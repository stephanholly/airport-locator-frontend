export const location = (latlong) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: latlong
  }
}
