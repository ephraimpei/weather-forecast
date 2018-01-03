import WeatherActions from '../actions/weather_actions.js';

class WeatherApiUtil {
  getForecastData (lat, lng, location) {
    const receiveWeatherData = (data) => WeatherActions.receiveWeatherData(data.list, location);

    const query = `forecast?lat=${ lat }&lon=${ lng }`;
    const apikey = "appid=585e670f55ee9b114fa2f1f2731177d9";
    const units = "units=imperial";
    const url = `https://api.openweathermap.org/data/2.5/${ query }&${ apikey }&${ units }`;

    $.get(url).done(receiveWeatherData);
  }
}

export default new WeatherApiUtil();
