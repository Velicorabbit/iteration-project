import * as types from '../constants/actionTypes';
const initialState = {
  city: 'NYC',
  lat: '40.712775',
  long: '-74.005973',
  countryCode: 'US',
  isLoggedIn: false,
  currentUser: 'bbrower1293@gmail.com',
  userFavorites: [],
  weatherDays: [],
};

const informationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CITY:
      console.log('action payload ', action.payload);
      return {
        city: action.payload.city,
        lat: action.payload.latitude,
        long: action.payload.longitude,
        countryCode: action.payload.countryCode,
      };
    case types.ADD_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoggedIn: true,
      };
    case types.ADD_WEATHER:
      console.log('action payload ', action.payload);
      return {
        ...state,
        weatherDays: action.payload,
      };
    case types.UPDATE_FAVORITES:
      console.log('action payload ', action.payload);
      return {
        ...state,
        userFavorites: action.payload,
      };
    default:
      return state;
  }
};

export default informationReducer;
