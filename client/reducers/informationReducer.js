import * as types from '../constants/actionTypes';
const initialState = {
  city: 'NYC',
  lat: '40.712775',
  long: '-74.005973',
  countryCode: 'US',
  isLoggedIn: true,
  currentUser: {
    _id: 1,
    Email: 'test@test.com',
    first_name: 'Justin',
    last_name: 'Biebier',
  },
  userFavorites: [
    {
      activities_id: 19,
      address1: '162 E Broadway',
      alias: 'jajaja Mexicana',
      auth_token: 'auth_token',
      category: null,
      city: 'New York',
      country: 'USA',
      email: 'test@test.com',
      favorites_id: 49,
      first_name: 'first_name',
      image_url: null,
      last_name: 'last_name',
      name: null,
      price: 'More than you can afford',
      review_count: 4,
      user_id: 3,
      yelp_id: 'XipQLDbyTl5tsLlyzAWzug',
      yelp_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/OkWKXxOZBLJO7hRjOlIMig/o.jpg',
      zip_code: 11226,
    },
    {
      activities_id: 19,
      address1: '162 E Broadway',
      alias: 'jajaja Mexicana',
      auth_token: 'auth_token',
      category: null,
      city: 'New York',
      country: 'USA',
      email: 'test@test.com',
      favorites_id: 49,
      first_name: 'first_name',
      image_url: null,
      last_name: 'last_name',
      name: null,
      price: 'More than you can afford',
      review_count: 4,
      user_id: 3,
      yelp_id: 'XipQLDbyTl5tsLlyzAWzug',
      yelp_url:
        'https://s3-media3.fl.yelpcdn.com/bphoto/OkWKXxOZBLJO7hRjOlIMig/o.jpg',
      zip_code: 11226,
    },
  ],
  weatherDays: [],
};

const informationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CITY:
      console.log('action payload ', action.payload);
      return {
        ...state,
        city: action.payload.city,
        lat: action.payload.latitude,
        long: action.payload.longitude,
        countryCode: action.payload.countryCode,
      };
    case types.ADD_USER:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
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
