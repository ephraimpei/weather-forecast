// core modules
import React from 'react';
import { render } from 'react-dom';

// components
import WeatherForecastApp from './components/main/weather_forecast_app.jsx';
import Footer from './components/main/footer.jsx';

$(document).ready(function () {
  render(<WeatherForecastApp />, document.getElementById('content'));
  render(<Footer />, document.getElementById('footer'));
});
