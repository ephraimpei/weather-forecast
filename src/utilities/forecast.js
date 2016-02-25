// separate 5 day 3-hourly forecast into daily 3-hourly forecasts
const separateForecastByDay = (forecast) => {
  const now = new Date().getTime();
  let separatedForecast = new Array(5);

  for (let i = 0; i < separatedForecast.length; i++) {
    separatedForecast[i] = { 'date': null, 'forecast': [] };
  }

  let [dayIdx, prevForecastElDate] = [0, ];

  for (let j = 0; j < forecast.length; j++) {
    let forecastEl = forecast[j];

    // get UTC date from forecastEl
    const date = new Date(`${ forecastEl.dt_txt }`).getDate();

    // increment dayIdx if prev forecast date does not match current forecast date
    if (prevForecastElDate) { dayIdx += prevForecastElDate !== date ? 1 : 0; }

    // break loop if going over 5 days of forecast
    if (dayIdx > 4) { break; }

    // set date attribute if it doesn't exist
    if (!separatedForecast[dayIdx].date) { separatedForecast[dayIdx].date = date; }

    // dayIdx represents the day from which the forecast el comes from
    separatedForecast[dayIdx].forecast.push(forecastEl);

    prevForecastElDate = date;
  }

  // can index separatedForecast to get the 3-hourly forecast for that day
  // ie: separatedForecast[0].forecast gives 3-hourly forecast for day 1
  // ie: separatedForecast[1].forecast gives 3-hourly forecast for day 2
  // etc...
  return separatedForecast;
};

// consolidates a day's 3-hourly forecast into a single consolidated forecast
const consolidateToDailyForecast = (forecastEl) => {
  const dayOfTheWeek = forecastEl.date;
  const forecast = forecastEl.forecast;
};

const getWeatherMain = (forecast) => {

};

const getWeatherText = (forecast) => {

};

const getHighLowTemp = (forecast) => {

};

const getAveHumidity = (forecast) => {

};

export { separateForecastByDay, consolidateToDailyForecast };
