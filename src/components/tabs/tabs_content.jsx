import React from 'react';

class TabsContent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="tab-content">
        <div className="tab-pane active" id="forecast">{ this.props.forecastIndex }</div>
        <div className="tab-pane" id="forecast_viz">Forecast Viz</div>
        <div className="tab-pane" id="day1_viz">Day 1 Viz</div>
        <div className="tab-pane" id="day2_viz">Day 2 Viz</div>
        <div className="tab-pane" id="day3_viz">Day 3 Viz</div>
        <div className="tab-pane" id="day4_viz">Day 4 Viz</div>
        <div className="tab-pane" id="day5_viz">Day 5 Viz</div>
      </div>
    );
  }
}

export default TabsContent;
