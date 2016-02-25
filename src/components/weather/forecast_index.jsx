import React from 'react';
import ForecastIndexItem from './forecast_index_item.jsx';
import { separateForecastByDay, consolidateToDailyForecast } from '../../utilities/forecast.js';

class ForecastIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const forecastSplitByDay = separateForecastByDay(this.props.forecast);
    console.log(forecastSplitByDay[0]);
    console.log(consolidateToDailyForecast(forecastSplitByDay[0]));

    return (
      <div className="forecast-index">

      </div>
    );
  }
}

export default ForecastIndex;
