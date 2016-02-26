import React from 'react';

class ForecastIndexItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const klass = "forecast-index-item panel panel-primary ";
    const high = `High: ${ this.props.forecast.high }°F`;
    const low = `Low: ${ this.props.forecast.low }°F`;
    const humidity = `Humidity: ${ this.props.forecast.humidity }%`;
    const day = this.props.forecast.date.toDateString().split(" ")[0];
    const date = this.props.forecast.date.toDateString().split(" ").slice(1).join(" ");
    const gridSizes = `index-item-grid-wrapper ${ this.props.gridSizes }`;
    const mainWeather = this.props.forecast.main;

    return (
      <div className={ gridSizes }>
        <div className={ klass }>
          <div className="panel-heading">
            <h3 className="panel-title">{ day }</h3>
            <h3 className="panel-title">{ date }</h3>
          </div>

          <div className="panel-body">
            <div className="weather-icon-wrapper">
              { this.props.iconLookup[ mainWeather ] }
            </div>

            <div className="weather-info-wrapper">
              <h4 className="weather-info-item">{ mainWeather }</h4>
              <div className="weather-info-item">{ high }</div>
              <div className="weather-info-item">{ low }</div>
              <div className="weather-info-item">{ humidity }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastIndexItem;
