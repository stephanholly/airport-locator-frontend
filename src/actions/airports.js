import axios from 'axios';

export const airports = (lat, long) => {
  return {
    type: 'GET_AIRPORTS',
    payload: axios.get(`http://localhost:3001/${lat}/${long}`)
  };
}
