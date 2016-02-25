const hourlyForecastByDay = (day, weatherData) => {
  switch (day) {
    case 0: return weatherData.slice(0,8);
    case 1: return weatherData.slice(8,16);
    case 2: return weatherData.slice(16,24);
    case 3: return weatherData.slice(24,32);
    case 4: return weatherData.slice(32,40);
  }
};

const dailyForecastByDay = (day, weatherData) => {
  const hourlyForecast = hourlyForecastByDay(day, weatherData)[4];
};
