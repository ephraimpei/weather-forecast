import React from 'react';
import Welcome from './welcome.jsx';
import NavBar from '../nav/navbar.jsx';
import ForecastMain from '../forecast/forecast_main.jsx';
import weatherStore from "../../stores/weather_store.js";
import GooglePlacesApiUtil from "../../apiutil/google_places_api_util.js";

class WeatherForecastApp extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.state = { forecast: {}, location: "", loading: false, welcome: true };
  }

  componentDidMount () {
    weatherStore.addChangeListener(this.onChange);
  }

  componentWillUnmount () {
    weatherStore.removeChangeListener(this.onChange);
  }

  getCurrentPosition (e) {
    e.preventDefault();

    this.setState({ loading: true });

    navigator.geolocation.getCurrentPosition( (position) => {
      GooglePlacesApiUtil.getLocation(position.coords.latitude, position.coords.longitude);
    });
  }

  onChange () {
    let successMsg = document.getElementById("forecast-success");

    successMsg.classList.remove("fade");

    setTimeout( () => successMsg.classList.add("fade"), 2000);

    this.setState({
      forecast: weatherStore.getForecast(),
      location: weatherStore.getLocation(),
      loading: false,
      welcome: false
    });
  }

  startLoading () {
    this.setState({ loading: true });
  }

  render () {
    // let forecastIndex = <ForecastIndex forecast={ this.state.forecast } location={ location }/>;

    // let render = this.state.welcome ? <Welcome getCurrentPosition={ this.getCurrentPosition }
    //   loading={ this.state.loading }/> : <ForecastMain forecastIndex={ forecastIndex } />;

    let welcomeOrForecast = this.state.welcome ? <Welcome getCurrentPosition={ this.getCurrentPosition }
      loading={ this.state.loading }/> : <ForecastMain forecast={ this.state.forecast } />;

    let location = this.state.loading ? (
      <span>Getting location <i className="fa fa-refresh fa-spin"></i></span>
    ) : this.state.location;
    
    return (
        <div className="main-app">
          <NavBar location={ location }
            getCurrentPosition={ this.getCurrentPosition }
            startLoading={ this.startLoading }
            loading={ this.state.loading }/>

          { welcomeOrForecast }
        </div>
     );
  }
}

export default WeatherForecastApp;
