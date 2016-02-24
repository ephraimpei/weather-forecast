import WeatherActions from '../actions/weather_actions.js';

class WeatherApiUtil {
  getForecastData (lat, lng) {
    const receiveLocation = (data) => {
      debugger;
      WeatherActions.receiveWeatherData(data);
    };

    const query = `forecast?lat=${ lat }&lon=${ lng }`;
    const apikey = "appid=585e670f55ee9b114fa2f1f2731177d9";
    const url = `http://api.openweathermap.org/data/2.5/${ query }&${ apikey }`;

    $.get(url).done(receiveLocation);
  }
}

export default new WeatherApiUtil();
