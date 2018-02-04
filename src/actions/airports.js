import axios from 'axios';

export const airports = (lat, long) => {
  return {
    type: 'GET_AIRPORTS',
    payload: axios.get(`https://intense-lake-55385.herokuapp.com/${lat}/${long}`)
  };
}
