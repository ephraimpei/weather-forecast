import EventEmitter from 'eventemitter3';
import AppDispatcher from '../dispatcher/dispatcher.js';
import WeatherConstants from '../constants/weather_constants.js';

const CHANGE_EVENT = "change";

class WeatherStore extends EventEmitter {
  constructor () {
    super();
    this.weatherData = [];
    this.location = "";
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  set (weatherData, location) {
    this.weatherData = weatherData;
    this.location = location;

    this.emit(CHANGE_EVENT);
  }

  getWeatherData () {
    return this.weatherData.slice();
  }

  getLocation () {
    return this.location;
  }
}

const weatherStore = new WeatherStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case WeatherConstants.RECEIVE_WEATHER_DATA:
      weatherStore.set(payload.weatherData, payload.location);
      break;
  }
});

export default weatherStore;
