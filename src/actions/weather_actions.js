import AppDispatcher from '../dispatcher/dispatcher.js';
import WeatherConstants from "../constants/weather_constants.js";

export default new class {
  receiveWeatherData (forecast, location) {
    AppDispatcher.dispatch({
      actionType: WeatherConstants.RECEIVE_WEATHER_DATA,
      forecast: forecast,
      location: location
    });
  }
}();
