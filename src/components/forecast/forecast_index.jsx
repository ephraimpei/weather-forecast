import React from 'react';
import ForecastIndexItem from './forecast_index_item.jsx';
import { separateForecastByDay, consolidateToDailyForecast } from '../../utilities/forecast.js';
import weatherCompLookup from '../../utilities/weather_component_lookup.jsx';

class ForecastIndex extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // console.log(this.props.forecast);

    const forecastSplitByDay = separateForecastByDay(this.props.forecast);

    // console.log(forecastSplitByDay);

    const length = forecastSplitByDay.length;

    const forecastIndexItems = forecastSplitByDay.map( (forecast, idx) => {
      if (forecast.forecast.length === 0) { return; }

      let consolidatedForecast = consolidateToDailyForecast(forecast);
      let gridSizes = "col-lg-2 col-md-2 col-sm-6 col-xs-12 ";

      gridSizes += idx === 0 ? "col-lg-offset-1 col-md-offset-1 col-sm-offset-0 col-xs-offset-0" : "";
      gridSizes += idx === length - 1 ? "col-lg-offset-0 col-md-offset-0 col-sm-offset-3 col-xs-offset-0" : "";

      return (
        <ForecastIndexItem key={ idx }
        forecast={ consolidatedForecast }
        gridSizes={ gridSizes }
        iconLookup={ weatherCompLookup }/>
      );
    });

    return (
      <div className="forecast-index container">
        <div className="row">
          { forecastIndexItems }
        </div>
      </div>
    );
  }
}

export default ForecastIndex;
