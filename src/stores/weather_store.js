import EventEmitter from 'eventemitter3';
import AppDispatcher from '../dispatcher/dispatcher.js';
import WeatherConstants from '../constants/weather_constants.js';

const CHANGE_EVENT = "change";

class WeatherStore extends EventEmitter {
  constructor () {
    super();
    this.weatherData = {};
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  set (weatherData) {
    this.weatherData = weatherData;

    this.emit(CHANGE_EVENT);
  }
}

const weatherStore = new WeatherStore();

AppDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case WeatherConstants.RECEIVE_WEATHER_DATA:
      weatherStore.set(payload.weatherData);
      break;
  }
});

export default weatherStore;
