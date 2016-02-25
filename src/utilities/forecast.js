// separate 5 day 3-hourly forecast into daily 3-hourly forecasts
const separateForecastByDay = (forecast) => {
  const now = new Date().getTime();
  let separatedForecast = new Array(5);

  for (let i = 0; i < separatedForecast.length; i++) {
    separatedForecast[i] = { 'date': null, 'forecast': [] };
  }

  forecast.forEach( (forecastEl) => {
    // convert UTC to local time for each forecast el
    const date = new Date(`${ forecastEl.dt_txt } UTC`).getDate();

    // get idx associated to which day forecast el belongs to
    // ie: day 1, idx = 0
    const idx = determineForecastIdx(date, now);

    if (!separatedForecast[idx].date) { separatedForecast[idx].date = date; }

    separatedForecast[idx].forecast.push(forecastEl);
  });

  // can index separatedForecast to get the 3-hourly forecast for that day
  // ie: separatedForecast[0].forecast gives 3-hourly forecast for day 1
  return separatedForecast;
};

const determineForecastIdx = (date, now) => {
  // compare local date of forecast element with local date of day 1 (tmr), day 2, etc...
  // return index associated to the day of the forecast el
  // id: day 1, return idx = 0
  if (date === new Date(now + 86400000).getDate()) { return 0; }
  else if (date === new Date(now + 86400000 * 2).getDate()) { return 1; }
  else if (date === new Date(now + 86400000 * 3).getDate()) { return 2; }
  else if (date === new Date(now + 86400000 * 4).getDate()) { return 3; }
  else if (date === new Date(now + 86400000 * 5).getDate()) { return 4; }
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
