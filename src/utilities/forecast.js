const separateForecastByDay = (forecast) => {
  const todayUTCDate = new Date().getUTCDate();
  let separatedForecast = new Array(5);

  for (let i = 0; i < separatedForecast.length; i++) {
    separatedForecast[i] = [];
  }

  // 86400000 ms in a day
  forecast.forEach( (forecastEl) => {
    const UTCDate = new Date(forecastEl.dt * 1000).getUTCDate();
    
    // compare UTC date of forecast element with UTC date of day 1 (tmr), day 2, etc...
    if (UTCDate === new Date(new Date().getTime()).getUTCDate()) {
      separatedForecast[0].push(forecastEl);
    } else if (UTCDate === new Date(new Date().getTime() + 86400000 ).getUTCDate()) {
      separatedForecast[1].push(forecastEl);
    } else if (UTCDate === new Date(new Date().getTime() + 86400000 * 2).getUTCDate()) {
      separatedForecast[2].push(forecastEl);
    } else if (UTCDate === new Date(new Date().getTime() + 86400000 * 3).getUTCDate()) {
      separatedForecast[3].push(forecastEl);
    } else if (UTCDate === new Date(new Date().getTime() + 86400000 * 4).getUTCDate()) {
      separatedForecast[4].push(forecastEl);
    }
  });

  return separatedForecast;
};

const getDailyForecastByDay = (day, forecast) => {

};

export { separateForecastByDay, getDailyForecastByDay };
