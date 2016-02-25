import React from 'react';
import NavBar from '../nav/navbar.jsx';
import ForecastIndex from '../weather/forecast_index.jsx';
import weatherStore from "../../stores/weather_store.js";

class WeatherForecastApp extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { forecast: {}, location: "" };
  }

  componentDidMount () {
    weatherStore.addChangeListener(this.onChange);
  }

  componentWillUnmount () {
    weatherStore.removeChangeListener(this.onChange);
  }

  onChange () {
    this.setState({
      forecast: weatherStore.getForecast(),
      location: weatherStore.getLocation()
    });
  }

  render () {
    let forecastIndex;

    if (Object.keys(this.state.forecast).length !== 0) {
      forecastIndex = (
        <ForecastIndex forecast={ this.state.forecast }
          location={ this.state.location }/>
      );
    }

    return (
        <div className="main-app">
          <NavBar />
          { forecastIndex }
        </div>
     );
  }
}

export default WeatherForecastApp;
