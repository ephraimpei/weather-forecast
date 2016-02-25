import WeatherApiUtil from "./weather_api_util.js";

class GooglePlacesApiUtil {
  getLocation (lat, lng, success) {
    const query = `latlng=${ lat },${ lng }`;
    const format = "json";
    const apikey = "key=AIzaSyBqdLAPb71C43fwP7wWqxzUzYaXynZ_LBA";
    const types = "result_type=locality";
    const url = `https://maps.googleapis.com/maps/api/geocode/${ format }?${ query }&${ types }&${ apikey }`;

    // google places API is buggy - result_type isn't honored 100%
    // from testing, last element of the data.results array is the one we want
    $.get(url).done((data) => WeatherApiUtil.getForecastData(lat, lng,
        data.results.pop().formatted_address, success));
  }
}

export default new GooglePlacesApiUtil();
