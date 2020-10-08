import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login.jsx';
import './styles.css';
import DetailedWeather from './components/DetailedWeather.jsx';
import FrontPage from './components/FrontPage.jsx';

const App = props => {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path={'/login'}>
            <Login />
          </Route>

          <Route exact path={'/favorites'}>
            <FrontPage />
          </Route>

          <Route exact path={'/'}>
            <FrontPage />
          </Route>

          <Route exact path={'/detailed-weather'}>
            <FrontPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
