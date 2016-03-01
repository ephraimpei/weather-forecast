// separate 5 day 3-hourly forecast into daily 3-hourly forecasts
const separateForecastByDay = (forecast) => {
  let separatedForecast = new Array(5);

  for (let i = 0; i < separatedForecast.length; i++) {
    separatedForecast[i] = { 'date': null, 'forecast': [] };
  }

  let [dayIdx, prevForecastElDate] = [0, ];

  const today = new Date();

  for (let j = 0; j < forecast.length; j++) {
    let forecastEl = forecast[j];

    // .replace(/-/g, '/') added to resolve ES5 vs ISO-8601 specification gaps
    // fixes issue with date showing up as invalid in iOS
    const date = new Date(`${ forecastEl.dt_txt.replace(/-/g, '/') }`);

    // skip if forecast el matches today's date
    if (date.getDate() === today.getDate()) { continue; }

    // increment dayIdx if prev forecast date does not match current forecast date
    if (prevForecastElDate) { dayIdx += prevForecastElDate.getDate() !== date.getDate() ? 1 : 0; }

    // break loop if going over 5 days of forecast
    if (dayIdx > 4) { break; }

    // set date attribute if it doesn't exist
    if (!separatedForecast[dayIdx].date) { separatedForecast[dayIdx].date = date; }

    // dayIdx represents the day from which the forecast el comes from
    separatedForecast[dayIdx].forecast.push(forecastEl);

    prevForecastElDate = date;
  }

  // check if last element of separatedForecast has forecast data elements.  If no, remove it.
  // this is likely caused by OpenWeatherMap's API not providing enough data for a 5 day forecast.
  if (separatedForecast.slice(-1)[0].forecast.length === 0) { separatedForecast.splice(-1); }

  // can index separatedForecast to get the 3-hourly forecast for that day
  // ie: separatedForecast[0].forecast gives 3-hourly forecast for day 1
  // ie: separatedForecast[1].forecast gives 3-hourly forecast for day 2
  // etc...
  return separatedForecast;
};

// consolidates a day's 3-hourly forecast into a single consolidated forecast
const consolidateToDailyForecast = (forecastEl) => {
  let main = getWeatherMain(forecastEl.forecast);
  let humidity = getAveHumidity(forecastEl.forecast);
  let [ low, high ] = getHighLowTemp(forecastEl.forecast);
  let ave = Math.round((((high + low) / 2) * 100) / 100);

  return {
    date: forecastEl.date,
    main: main,
    humidity: humidity,
    low: low,
    high: high,
    ave: ave
  };
};

const getWeatherMain = (forecast) => {
  let mainTracker = {};

  forecast.forEach( (forecastEl) => {
    let main = forecastEl.weather[0].main;

    mainTracker[`${ main }`] = mainTracker[`${ main }`] ? mainTracker[`${ main }`] + 1 : 1;
  });

  let dominantMain = Object.keys.length === 1 ? Object.keys(mainTracker)[0] :
    Object.keys(mainTracker).reduce( (a, b) => {
      return mainTracker[a] > mainTracker[b] ? a : b;
    });

  return dominantMain;
};

const getHighLowTemp = (forecast) => {
  let minTemp, maxTemp;

  forecast.forEach ((forecastEl, idx) => {
    let temp = forecastEl.main.temp;

    if (idx === 0) { [ minTemp, maxTemp ] = [ temp, temp ];}
    else if (temp < minTemp) { minTemp = temp; }
    else if (temp > maxTemp) { maxTemp = temp; }
  });

  return [ minTemp, maxTemp ];
};

const getAveHumidity = (forecast) => {
  return Math.round(
    forecast.reduce(( (acc, curr) => acc + curr.main.humidity ), 0) /
    forecast.length);
};

export { separateForecastByDay, consolidateToDailyForecast };
