import * as types from "../constants/actionTypes";

export const addCity = (data) => ({
  type: types.ADD_CITY,
  payload: data,
});

export const addUser = (data) => ({
  type: types.ADD_USER,
  payload: data,
});

export const addWeather = (data) => ({
  type: types.ADD_WEATHER,
  payload: data,
});

export const updateFavorites = (data) => ({
  type: types.UPDATE_FAVORITES,
  payload: data,
});
