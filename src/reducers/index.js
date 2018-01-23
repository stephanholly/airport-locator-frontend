import { combineReducers } from 'redux';
import location from './location.js'
import airports from './airports.js'

const rootReducer = combineReducers({
  location,
  airports
});
export default rootReducer;
