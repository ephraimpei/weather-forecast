import React from 'react';
import ForecastIndexItem from './forecast_index_item.jsx';
import { separateForecastByDay,
  getHourlyForecastByDay,
  getDailyForecastByDay } from '../../utilities/forecast.js';

class ForecastIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const forecastSplitByDay = separateForecastByDay(this.props.forecast);
    // console.log(forecastSplitByDay);
    const forecastIndexItems = [0,1,2,3,4].map( (n) => {
      // return <ForecastIndexItem key={ n } forecast={} />;

    });

    return (
      <div className="forecast-index">
        { forecastIndexItems }
      </div>
    );
  }
}

export default ForecastIndex;
