// main sass file
// import "../static/sass/main.scss";

// core modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// components
import WeatherForecastApp from './components/main/weather_forecast_app.jsx';
import Footer from './components/main/footer.jsx';

$(document).ready(function () {
  const routes = (
    <Route path="/" component={ WeatherForecastApp } >

    </Route>
  );

  render(<Router history={ browserHistory } routes={ routes } />,
   document.getElementById('content'));

  // render(<WeatherForecastApp />, document.getElementById('content'));
  render(<Footer />, document.getElementById('footer'));
});
