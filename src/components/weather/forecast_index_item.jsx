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
    const day = this.props.forecast.date.split(" ")[0];
    const date = this.props.forecast.date.split(" ").slice(1).join(" ");

    return (
      <div className={ this.props.gridSizes }>
        <div className={ klass }>
          <div className="panel-heading">
            <h3 className="panel-title">{ day }</h3>
            <h3 className="panel-title">{ date }</h3>
          </div>

          <div className="panel-body">
            <div>{ this.props.forecast.text }</div>
            <div>{ high }</div>
            <div>{ low }</div>
            <div>{ humidity }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastIndexItem;
