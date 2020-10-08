import { combineReducers } from 'redux';
import informationReducer from './informationReducer.js';

export default combineReducers({
  informationReducer: informationReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // SHOULD BE ADDED IN ORDER TO GET ACCESS IN THE BROWSER
});