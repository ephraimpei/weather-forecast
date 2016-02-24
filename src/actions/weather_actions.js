import AppDispatcher from '../dispatcher/dispatcher.js';
import WeatherConstants from "../constants/weather_constants.js";

export default new class {
  receiveWeatherData (weatherData, location) {
    AppDispatcher.dispatch({
      actionType: WeatherConstants.RECEIVE_WEATHER_DATA,
      weatherData: weatherData,
      location: location
    });
  }
}();
