import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import WeatherView from './WeatherView.jsx';
import NewsView from './NewsView.jsx';
import ActivitiesView from './ActivitiesView.jsx';
import FavoritesPage from './FavoritesPage.jsx';
import DetailedWeather from './DetailedWeather.jsx';

const mapDispatchToProps = (dispatch) => ({
  addCity(data) {
    dispatch(actions.addCity(data));
  },
});

const mapStateToProps = ({
  informationReducer: { lat, long, countryCode, city },
}) => ({ lat, long, countryCode, city });

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [city, setCity] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchValue) return alert('Please type in a city');
    setCity(sendLocation(searchValue));
    event.preventDefault();
  };

  const sendLocation = (location) => {
    fetch(`/location/${location}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCity(searchValue);
        props.addCity({
          ...data,
          city: searchValue,
        });
      })
      .then((data) => {
        setCity(searchValue);
        props.addCity({
          ...data,
          city: searchValue,
        });
      })
      .catch((err) => console.log('Location fetch ERROR: ', err));
    return location;
  };

  return (
    <div>
      <div className="hero-container">
        <div className="top-container">
          <div className="nav-container">
            <Link to={'/'}>
              <button className="nav">Home</button>
            </Link>
            <Link to={'/favorites'}>
              <button className="nav">Favorites</button>
            </Link>
            <Link to={'/login'} className="loginButton">
              <button className="nav">Login</button>
              {/* <Login /> */}
            </Link>
          </div>
          <WeatherView className="weather-view" city={props.city} />
        </div>
        <div className="search-wrapper">
          <h1>
            <center>Find the best your city has to offer</center>
          </h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="search-input"
              type="text"
              value={searchValue}
              onChange={handleChange}
            />
            <input className="search-btn" type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className="main-content">
        <Switch>
          <Route path={'/favorites'}>
            <FavoritesPage />
          </Route>

          <Route exact path={'/'}>
            <ActivitiesView city={props.city} />
            <NewsView city={props.city} />
          </Route>

          <Route path={'/detailed-weather'}>
            <DetailedWeather />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
