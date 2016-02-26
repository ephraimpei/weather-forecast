import React from 'react';
import NavBar from '../nav/navbar.jsx';
import Pills from './pills.jsx';
import ForecastIndex from '../forecast/forecast_index.jsx';
import weatherStore from "../../stores/weather_store.js";
import GooglePlacesApiUtil from "../../apiutil/google_places_api_util.js";

class WeatherForecastApp extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.state = { forecast: {}, location: "", loading: false };
  }

  componentDidMount () {
    weatherStore.addChangeListener(this.onChange);

    this.getCurrentPosition();
  }

  componentWillUnmount () {
    weatherStore.removeChangeListener(this.onChange);
  }

  getCurrentPosition () {
    this.setState({ loading: true });

    navigator.geolocation.getCurrentPosition( (position) => {
      GooglePlacesApiUtil.getLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  onChange () {
    this.setState({
      forecast: weatherStore.getForecast(),
      location: weatherStore.getLocation(),
      loading: false
    });
  }

  startLoading () {
    this.setState({ loading: true });
  }

  render () {
    let forecastIndex;

    let location = this.state.loading ? (
      <span>Finding current location <i className="fa fa-refresh fa-spin"></i></span>
    ) : this.state.location;

    if (Object.keys(this.state.forecast).length !== 0) {
      forecastIndex = (
        <ForecastIndex forecast={ this.state.forecast }
          location={ location }/>
      );
    }

    console.log(this.state.forecast);
    return (
        <div className="main-app">
          <NavBar location={ location } loading={ this.state.loading }/>

          <div className="container">
            <Pills />

            <div className="tab-content">
              <div className="tab-pane active" id="forecast">{ forecastIndex }</div>
              <div className="tab-pane" id="forecast_viz">Forecast Viz</div>
              <div className="tab-pane" id="day1_viz">Day 1 Viz</div>
              <div className="tab-pane" id="day2_viz">Day 2 Viz</div>
              <div className="tab-pane" id="day3_viz">Day 3 Viz</div>
              <div className="tab-pane" id="day4_viz">Day 4 Viz</div>
              <div className="tab-pane" id="day5_viz">Day 5 Viz</div>
            </div>
          </div>
        </div>
     );
  }
}

export default WeatherForecastApp;
