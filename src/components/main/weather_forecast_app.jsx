import React from 'react';
import NavBar from '../nav/navbar.jsx';
import ForecastIndex from '../weather/forecast_index.jsx';
import weatherStore from "../../stores/weather_store.js";

class WeatherForecastApp extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { weatherData: {}, location: "" };
  }

  componentDidMount () {
    weatherStore.addChangeListener(this.onChange);
  }

  componentWillUnmount () {
    weatherStore.removeChangeListener(this.onChange);
  }

  onChange () {
    this.setState({
      weatherData: weatherStore.getWeatherData(),
      location: weatherStore.getLocation()
    });
  }

  render () {
    debugger;
    return (
        <div className="main-app">
          <NavBar />
        </div>
     );
  }
}

export default WeatherForecastApp;
