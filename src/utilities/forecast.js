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

    // get UTC date from forecastEl
    const date = new Date(`${ forecastEl.dt_txt }`);

    // skip if forecast el matches today's date
    // convert today's date to UTC for apples to apples comparison
    if (date.getDate() === today.getUTCDate()) { continue; }

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

  // can index separatedForecast to get the 3-hourly forecast for that day
  // ie: separatedForecast[0].forecast gives 3-hourly forecast for day 1
  // ie: separatedForecast[1].forecast gives 3-hourly forecast for day 2
  // etc...
  return separatedForecast;
};

// consolidates a day's 3-hourly forecast into a single consolidated forecast
const consolidateToDailyForecast = (forecastEl) => {
  let [ main, text ]= getWeatherMainAndText(forecastEl.forecast);
  let humidity = getAveHumidity(forecastEl.forecast);
  let [ low, high ] = getHighLowTemp(forecastEl.forecast);

  return {
    date: forecastEl.date.toDateString(),
    main: main,
    text: text,
    humidity: humidity,
    low: low,
    high: high
  };
};

const getWeatherMainAndText = (forecast) => {
  let mainTracker = {};
  let textTracker = {};

  forecast.forEach( (forecastEl) => {
    let main = forecastEl.weather[0].main;
    let text = forecastEl.weather[0].description;

    mainTracker[`${ main }`] = mainTracker[`${ main }`] ? mainTracker[`${ main }`] + 1 : 1;
    textTracker[`${ text }`] = textTracker[`${ text }`] ? textTracker[`${ text }`] + 1 : 1;
  });

  let dominantMain = Object.keys(mainTracker).reduce( (a, b) => {
    return mainTracker[a] > mainTracker[b] ? a : b;
  });

  let dominantText = Object.keys(textTracker).reduce( (a, b) => {
    return textTracker[a] > textTracker[b] ? a : b;
  });

  return [ dominantMain, dominantText ];
};

const getHighLowTemp = (forecast) => {
  let [ minTemp, maxTemp ] = [1000, -1000];

  forecast.forEach ((forecastEl) => {
    let temp = forecastEl.main.temp;

    if (temp < minTemp) { minTemp = temp; }
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
